/**
 * Module FileUploader
 */
define('net/FileUploader',
    [
        'jquery'
    ],
    function($) {
        'use strict';
        var blobTypes = {
                msword: 'application/msword; charset=utf-8'
            },

            config = {
                default_file_name: 'file'
            };

        return {

            buildFileUploadPayload: function(file, fieldName) {
                var form = new FormData();

                form.append(fieldName, file);

                return form;
            },

            buildFileFromUri: function(uri, fileName, type) {
                return $.get(uri).then(function(response) {
                    var blob = new Blob([response], { type: blobTypes[type] });

                    return new File([blob], fileName || config.default_file_name);
                });
            },

            uploadFile: function(file, url, ajaxOptions, formFieldName) {
                var payload = this.buildFileUploadPayload(file, formFieldName),

                    options = $.extend({
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        data: payload,
                        url: url
                    }, ajaxOptions);

                return $.ajax(options);
            }
        };
    });
