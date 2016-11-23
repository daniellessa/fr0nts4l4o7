// Karma configuration
// Generated on 2016-06-22

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/satellizer/satellizer.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/interact/interact.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
      'bower_components/angular-aside/dist/js/angular-aside.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-bootstrap-simple-chat/src/scripts/index.js',
      'bower_components/ng-bs-animated-button/ng-bs-animated-button.js',
      'bower_components/angular-better-placeholders/src/angular-better-placeholders.js',
      'bower_components/angular-material-icons/angular-material-icons.min.js',
      'bower_components/underscore/underscore.js',
      'bower_components/qrcode-generator/js/qrcode.js',
      'bower_components/qrcode-generator/js/qrcode_UTF8.js',
      'bower_components/angular-qrcode/angular-qrcode.js',
      'bower_components/qrcode.js/lib/qrcode.js',
      'bower_components/qrcode/lib/qrcode.js',
      'bower_components/angular-qr/src/angular-qr.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-dialog-service/dist/dialogs.js',
      'bower_components/angular-dialog-service/dist/dialogs-default-translations.js',
      'bower_components/bootstrap-ui-datetime-picker/dist/datetime-picker.js',
      'bower_components/angucomplete/angucomplete.js',
      'bower_components/ng-table/dist/ng-table.js',
      'bower_components/angular-input-masks/angular-input-masks-standalone.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-material-data-table/dist/md-data-table.js',
      'bower_components/momentjs/moment.js',
      'bower_components/angular-material-datetimepicker/js/angular-material-datetimepicker.min.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/aws-sdk/dist/aws-sdk.js',
      'bower_components/angular-simple-logger/dist/angular-simple-logger.js',
      'bower_components/markerclustererplus/src/markerclusterer.js',
      'bower_components/google-maps-utility-library-v3-markerwithlabel/dist/markerwithlabel.js',
      'bower_components/google-maps-utility-library-v3-infobox/dist/infobox.js',
      'bower_components/google-maps-utility-library-v3-keydragzoom/dist/keydragzoom.js',
      'bower_components/js-rich-marker/src/richmarker.js',
      'bower_components/angular-google-maps/dist/angular-google-maps.js',
      'bower_components/angular-google-places-autocomplete/src/autocomplete.js',
      'bower_components/angular-google-places-autocomplete/dist/autocomplete.min.js',
      'bower_components/ngmap/build/scripts/ng-map.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
