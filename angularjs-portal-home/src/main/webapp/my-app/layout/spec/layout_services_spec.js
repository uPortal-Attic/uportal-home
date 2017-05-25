'use strict';
/* eslint-env node, phantomjs, jasmine */
/* global inject */

define([
  'angular-mocks', 'my-app',
], function() {
  describe('layoutService', function() {
    var service;
    var layoutDoc;
    var layoutV1;
    var layoutV43;

    // load the marketplace controller
    beforeEach(function() {
      module('my-app');
    });

    beforeEach(inject(function(layoutService) {
      service = layoutService;
      layoutDoc = {
        'layout': [],
      };
      layoutV1 = {
        'layout': {
          'folders': [],
        },
      };
      layoutV43 = {
        'layout': {
          'navigation': {
            'tabs': [],
          },
        },
      };
    }));

    it('should not throw any errors', function() {
      service.formatLayoutForCache(layoutDoc);
      service.formatLayoutForCache(layoutV1);
      service.formatLayoutForCache(layoutV43);
      expect(true).toBe(true);
    });
  });
});
