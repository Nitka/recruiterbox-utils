define('helpers/handlebars',
    [
        'handlebars.runtime',
        'handlebars-form-helpers'
    ],
    function(Handlebars, HandlebarsFormHelpers) {
        'use strict';

        HandlebarsFormHelpers.register(Handlebars.default);

        return Handlebars.default;
    });
