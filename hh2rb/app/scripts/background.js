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
        'net/RBAdapter'
    ],
    function($, Handlebars, _, RBAdapter) {
        'use strict';

        chrome.browserAction.setBadgeText({ text: 'OK' });

        RBAdapter.getLabels().then(function(data) {
            console.log(data);
        });
    });
