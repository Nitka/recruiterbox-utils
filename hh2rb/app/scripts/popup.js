require.config({
    baseUrl: 'scripts/',
    waitSeconds: 30,
    paths: {
        'jquery': 'lib/jquery/dist/jquery',
        //'jqueryUI': 'lib/jquery-ui',
        'underscore': 'lib/underscore/underscore',
        'handlebars.runtime': 'lib/handlebars/handlebars.runtime.amd',
        'handlebars-form-helpers': 'lib/handlebars-form-helpers/dist/handlebars.form-helpers.min'
    },
    shim: {
        'jquery': { exports: 'jQuery' },
        //'jqueryUI': ['jquery'],
        'underscore': { exports: '_' }
    }
});

define('popup',
    [
        'jquery',
        'underscore',
        'templates'
    ],
    function($, _, templates) {
        'use strict';

        var Popup = {

                rootElementSelector: '#popup',

                saveButtonSelector: 'button[name=save]',

                template: templates.popup,

                data: null,

                init: function(data) {
                    this.data = data || stub;
                    this.render();
                    this.subscribe();
                },

                fetchData: function() {
                    this.fetchRBData();
                    this.fetchHHData();
                },

                fetchRBData: function() {
                    var convertToSelect = function(item) {
                            return {
                                text: item.name,
                                value: item.id
                            }
                        },

                        self = this;

                    chrome.runtime.sendMessage({ type: 'getRBData' }, function(response) {
                        self.data.openings = response.openings.map(convertToSelect);
                        self.data.labels = response.labels.map(convertToSelect);

                        self.data.opening = self.data.openings[0].value; // TODO: fix for []

                        self.render();
                    });
                },

                fetchHHData: function() {
                    var self = this;

                    chrome.runtime.sendMessage({ type: 'getHHData' }, function(response) {
                        self.data.firstName = response.first_name;
                        self.data.lastName = response.last_name;
                        self.data.email = response.email;
                        self.data.skype = response.skype;
                        self.data.city = response.city;
                        self.data.vacancyId = response.vacancyId;
                        self.data.resumeURL = response.resumeURL;

                        self.render();
                    });
                },

                render: function() {
                    $(this.rootElementSelector).html(this.template(this.data));
                },

                subscribe: function() {
                    $(this.saveButtonSelector).on('click', this.sendDataToBackground.bind(this));
                },

                sendDataToBackground: function() {
                    console.log(this.data);
                }
            },

            stub = {
                openings: [{ text: 'test', value: 1 }, { text: 'test 2', value: 2 }],
                opening: 1,
                firstName: 'Test',
                lastName: 'Testov',
                email: 'testov.test@gmail.com',
                skype: 'test.testov',
                tags: ['hh.ru'].join(',')
            };

        Popup.init();
        Popup.fetchData();
    });

