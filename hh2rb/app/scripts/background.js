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
        'net/HHAdapter'
    ],
    function($, Handlebars, _, RBAdapter, HHAdapter) {
        'use strict';

        chrome.browserAction.setBadgeText({ text: 'OK' });

        var arrays = ['labels', 'openings'];

        arrays.map(function(type) {
            RBAdapter.getList(type).then(function(data) {
                console.log(type, data.objects);
            });
        });

        window.RBAdapter = RBAdapter;
        window.HHAdapter = HHAdapter;
    });
