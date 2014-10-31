/**
 * Module HHCandidatePageParser
 *
 * HTML-parser for pages on urls like this:
 * http://hh.ru/resume/{candidate-hash}?fromResponsesPage=true&vacancyId={vacancy-id}&resumeId={resume-id}&...
 */
define('HHCandidatePageParser',
    [
        'jquery',
        'underscore',
        'helpers/utils'
    ],
    function($, _, utils) {
        'use strict';

        var config = {
            baseURL: 'http://hh.ru'
        };

        return {

            getName: function(html) {
                return $('.resume__personal__name[itemprop="name"]', html).text();
            },

            getFirstName: function(name) {
                return name.split(' ')[1];
            },

            getLastName: function(name) {
                return name.split(' ')[0];
            },

            getEmail: function(page) {
                return $('.resume__contacts').find('.resume__contacts__preferred').find('[itemprop="email"]').text();
            },

            getCity: function() {
                return $('.resume__inlinelist').find('.resume__inlinelist__item[itemprop="address"]').find('[itemprop="addressLocality"]').text();
            },

            getPhoneNumber: function() {
                return $('.resume__contacts').find('.resume__contacts__phone').find('[itemprop="telephone"]').text().trim();
            },

            getSkypeName: function() {
                return $('.resume__inlinelist').find('.resume__inlinelist__item').find('.resume__contacts__personalsite.m-siteicon_skype').text();
            },

            getVacancyId: function() {
                var queryParams = utils.getQueryParams();

                return queryParams.vacancyId;
            },

            getResumeURL: function() {
                var path = $('.list-params__item_download-msword a').attr('href');

                return path ? config.baseURL + path : null;
            },

            getCandidate: function(page) {
                var name = this.getName(page);

                return {
                    first_name: this.getFirstName(name),
                    last_name: this.getLastName(name),
                    email: this.getEmail(page),
                    skype: this.getSkypeName(),
                    city: this.getCity(page),
                    vacancyId: this.getVacancyId(),
                    resumeURL: this.getResumeURL()
                }
            }
        };
    });
