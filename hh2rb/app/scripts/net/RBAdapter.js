define('net/RBAdapter',
    [
        'jquery'
    ],
    function($) {

        var host = 'https://nitka.recruiterbox.com',

            services = {
                api_prefix: '/api/v1/',
                list_postfix: '?limit=0',

                openings: 'openings',
                jobs: 'published_jobs',
                labels: 'labels',
                custom_fields: ''
            };

        return {

            getCookie: function(name) {
                return new Promise(function(resolve) {
                    chrome.cookies.get({ url: host, name: name }, function(cookie) {
                        resolve(cookie);
                    });
                });
            },

            ajax: function(options) {
                var token = this.getCookie('csrftoken'),

                    defaultOptions = {
                        withCredentials: true,
                        headers: { 'X-CSRFToken': token }
                    },

                    ajaxOptions = $.extend(defaultOptions, options);

                return $.ajax(ajaxOptions);
            },

            getJSON: function(path) {
                return this.ajax({
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    url: host + services.api_prefix + path
                });
            },

            getList: function(type) {
                return this.getJSON(type);
            },

            getOpenings: function() {
                return this.getList(services.openings);
            },

            getJobs: function() {
                return this.getList(services.jobs);
            },

            getLabels: function() {
                return this.getList(services.labels);
            },

            getCustomFields: function() {
                return this.getList(services.custom_fields);
            }
        }
    });