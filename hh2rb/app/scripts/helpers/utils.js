/**
 * Module utils
 */
define('helpers/utils',
    [
        'underscore'
    ],
    function(_) {
        'use strict';

        return {

            getQueryParams: function() {
                var locationSearchParams = window.location.search.substr(1).split('&'),
                    params = {};

                if (_.isArray(locationSearchParams)) {
                    locationSearchParams.forEach(function(param) {
                        var paramInfo = param.split('=', 2),
                            name = paramInfo[0],
                            value = paramInfo[1];

                        params[name] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : '';
                    });
                }

                return params;
            }
        };
    });
