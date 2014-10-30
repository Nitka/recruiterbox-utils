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
        };

        return {

            buildFileUploadPayload: function(uri, fileName, type) {
                return this.buildFileFromUri(uri, fileName, type).then(function(file) {
                    var form = new FormData();

                    form.append('doc', file);

                    return form;
                });
            },

            buildFileFromUri: function(uri, fileName, type) {
                return $.get(uri).then(function(response) {
                    var blob = new Blob([response], { type: blobTypes[type] });

                    return new File([blob], fileName);
                });
            },

            uploadFileByURL: function(url, type, fileName, endpoint, ajaxOptions) {
                var uploadRequest;

                if (blobTypes[type]) {
                    uploadRequest = this.buildFileUploadPayload(url, fileName, type).then(function(payload) {
                        var options = $.extend({
                            type: 'POST',
                            processData: false,
                            contentType: false,
                            data: payload,
                            url: endpoint
                        }, ajaxOptions);

                        return $.ajax(options);
                    });
                } else {
                    console.error('FileUploader::uploadFileByURL unknown file type', type);
                }

                return uploadRequest;
            }
        };
    });
