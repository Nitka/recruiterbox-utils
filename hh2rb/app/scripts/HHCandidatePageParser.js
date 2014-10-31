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
            baseURL: 'http://hh.ru',

            first_last_names_delimiter: ' ',

            name_selector: '.resume__personal__name[itemprop="name"]',
            contacts_selector: '.resume__contacts',
            contacts_info_selector: '.resume__inlinelist',
            contacts_info_item: '.resume__inlinelist__item',
            contacts_preferred: '.resume__contacts__preferred',
            contacts_email_selector: '[itemprop="email"]',
            contacts_phone_info_selector: '.resume__contacts__phone',
            contacts_phone_number_selector: '[itemprop="telephone"]',
            contacts_skype_selector: '.resume__contacts__personalsite.m-siteicon_skype',
            address_selector: '[itemprop="address"]',
            address_city_selector: '[itemprop="addressLocality"]',
            resume_file_info_selector: '.list-params__item_download-msword a'
        };

        return {

            getName: function(html) {
                return $(config.name_selector, html).text();
            },

            getFirstName: function(name) {
                return name.split(config.first_last_names_delimiter)[1];
            },

            getLastName: function(name) {
                return name.split(config.first_last_names_delimiter)[0];
            },

            getEmail: function(html) {
                return $(config.contacts_selector, html)
                    .find(config.contacts_preferred)
                    .find(config.contacts_email_selector)
                    .text();
            },

            getCity: function(html) {
                return $(config.contacts_info_selector, html)
                    .find(config.contacts_info_item + config.address_selector)
                    .find(config.address_city_selector)
                    .text();
            },

            getPhoneNumber: function(html) {
                return $(config.contacts_selector, html)
                    .find(config.contacts_phone_info_selector)
                    .find(config.contacts_phone_number_selector)
                    .text()
                    .trim()
                    .replace(/ /g, '')
            },

            getSkypeName: function(html) {
                return $(config.contacts_info_selector, html)
                    .find(config.contacts_info_item)
                    .find(config.contacts_skype_selector)
                    .text();
            },

            getVacancyId: function() {
                var queryParams = utils.getQueryParams();

                return queryParams.vacancyId;
            },

            getResumeURL: function(html) {
                var path = $(config.resume_file_info_selector, html).attr('href');

                return path ? config.baseURL + path : null;
            },

            getCandidate: function(page) {
                var name = this.getName(page);

                return {
                    first_name: this.getFirstName(name),
                    last_name: this.getLastName(name),
                    email: this.getEmail(page),
                    skype: this.getSkypeName(page),
                    city: this.getCity(page),
                    vacancyId: this.getVacancyId(page),
                    resumeURL: this.getResumeURL(page)
                }
            }
        };
    });
