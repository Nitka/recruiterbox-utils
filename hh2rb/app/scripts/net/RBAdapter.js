define('net/RBAdapter',
    [
        'jquery',
        'underscore'
    ],
    function($, _) {

        var host = 'https://nitka.recruiterbox.com',

            services = {
                api_prefix: '/api/v1/',
                list_postfix: '?limit=0',

                openings: 'openings',
                jobs: 'published_jobs',
                labels: 'labels',
                candidates: 'candidates',
                custom_fields: ''
            },

            candidateDefaults = {
                accessible_to: [],
                all_docs: [],
                candidate_messages: [],
                candidate_source: '',
                description: '',
                docs: [],
                email: '',
                first_name: '',
                index: 0,
                internal_messages: [],
                interviews: [],
                labels: [],
                last_name: '',
                logs: [],
                name: '',
                phone: '',
                todos: '',
                view_url: '#candidates/'
            },

            requiredProperties = { candidate: ['first_name'] };

        return {

            getCookie: function(name) {
                return new Promise(function(resolve) {
                    chrome.cookies.get({ url: host, name: name }, function(cookie) {
                        resolve(cookie);
                    });
                });
            },

            ajax: function(options) {
                return this.getCookie('csrftoken').then(function(token) {
                    var defaultOptions = {
                            withCredentials: true,
                            headers: { 'X-CSRFToken': token.value }
                        },

                        ajaxOptions = $.extend(defaultOptions, options);

                    return $.ajax(ajaxOptions);
                });
            },

            getJSON: function(path) {
                return this.ajax({
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    url: host + services.api_prefix + path
                });
            },

            pushJSON: function(path, data) {
                return this.ajax({
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    url: host + services.api_prefix + path + '/'
                });
            },

            pushCandidate: function(payload) {
                return this.pushJSON('candidates', payload);
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
            },

            createLabel: function(text) {
                return { name: text };
            },

            createCandidate: function(options) {
                var defaults = candidateDefaults,
                    candidate = $.extend(defaults, options),
                    self = this;

                return this.validateFields('candidate', candidate).then(function() {
                    return self.pushCandidate(candidate);
                });
            },

            validateFields: function(modelType, model) {
                var fieldsToValidate = requiredProperties[modelType];

                return new Promise(function(resolve, reject) {
                    var missedFields = fieldsToValidate.filter(function(field) {
                        return _.isEmpty(model[field]);
                    });

                    if (_.isEmpty(missedFields)) {
                        resolve(true);
                    } else {
                        reject(missedFields);
                    }
                });
            }
        }
    });