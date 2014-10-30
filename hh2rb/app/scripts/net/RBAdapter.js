define('net/RBAdapter',
    [
        'jquery',
        'underscore',
        'net/FileUploader'
    ],
    function($, _, FileUploader) {

        var config = {
                host: 'https://nitka.recruiterbox.com',

                services: {
                    api_prefix: '/api/v1/',
                    list_postfix: '?limit=0',

                    openings: 'openings',
                    jobs: 'published_jobs',
                    labels: 'labels',
                    candidates: 'candidates',
                    custom_fields: '',

                    upload_doc: 'https://nitka.recruiterbox.com/api/v1/docs/'
                },

                upload_doc_form_field: 'doc'
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
                    chrome.cookies.get({ url: config.host, name: name }, function(cookie) {
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
                    url: config.host + config.services.api_prefix + path
                });
            },

            pushJSON: function(path, data) {
                return this.ajax({
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    url: config.host + config.services.api_prefix + path + '/'
                });
            },

            pushCandidate: function(payload) {
                return this.pushJSON('candidates', payload);
            },

            getList: function(type) {
                return this.getJSON(type);
            },

            getOpenings: function() {
                return this.getList(config.services.openings);
            },

            getJobs: function() {
                return this.getList(config.services.jobs);
            },

            getLabels: function() {
                return this.getList(config.services.labels);
            },

            getCustomFields: function() {
                return this.getList(config.services.custom_fields);
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
            },

            uploadFile: function(file) {
                return this.getCookie('csrftoken').then(function(token) {
                    var ajaxOptions = {
                            withCredentials: true,
                            headers: { 'X-CSRFToken': token.value }
                        },

                        field = config.upload_doc_form_field;

                    return FileUploader.uploadFile(file, config.services.upload_doc, ajaxOptions, field);
                });
            },

            createDoc: function(file) {
                return this.uploadFile(file).then(function(file) {
                    return file.resource_uri;
                });
            }
        }
    });