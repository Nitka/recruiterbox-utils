require.config({
    baseUrl: 'scripts/',
    waitSeconds: 30,
    paths: {
        'jquery': 'lib/jquery/dist/jquery',
        //'jqueryUI': 'lib/jquery-ui',
        'handlebars': 'lib/handlebars/handlebars.amd',
        'underscore': 'lib/underscore/underscore'
    },
    shim: {
        'jquery': { exports: 'jQuery' },
        //'jqueryUI': ['jquery'],
        'underscore': { exports: '_' }
    }
});

define('background',
    [
        'jquery',
        'handlebars',
        'underscore',
        'net/RBAdapter',
        'net/HHAdapter',
        'HHCandidatePageParser'
    ],
    function($, Handlebars, _, RBAdapter, HHAdapter, HHCandidatePageParser) {
        'use strict';

        var markFulfilment = function(name, ob) {
                var result = {};
                result[name] = ob;

                return result;
            },

            formRBData = function() {
                var openings = RBAdapter.getOpenings().then(markFulfilment.bind(null, 'openings')),
                    labels = RBAdapter.getLabels().then(markFulfilment.bind(null, 'labels'));

                return Promise.all([openings, labels]).then(function(values) {
                    var hash = {};

                    values.map(function(value) {
                        var key = Object.keys(value)[0];
                        hash[key] = value[key].objects;
                    });

                    return hash;
                });
            },

            fetchHHData = function() {
                return new Promise(function(resolve, reject) {
                    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { type: "getDOM" }, function(response) {
                            var candidate;

                            if (response) {
                                try {
                                    candidate = HHCandidatePageParser.getCandidate(response);
                                    resolve(candidate);
                                } catch (e) {
                                    reject(e);
                                }
                            } else {
                                reject();
                            }
                        });
                    });
                });
            };

        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            var requestType = request ? request.type : null;

            console.info(request);

            switch (requestType) {
            case 'getRBData':
                formRBData().then(sendResponse);
                break;
            case 'getHHData':
                fetchHHData().then(sendResponse);
                break;
            default:
                log.warn('Unknown requestType: ' + requestType);
                break;
            }

            return true;
        });
    });
