Package.describe({
  name : 'organizer',
  version : '0.0.1',
  // Brief, one-line summary of the package.
  summary : 'Match organizer templates',
  // URL to the Git repository containing the source code for this package.
  git : '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation : 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use([ 'templating', 'iron:router' ], 'client');
  api.addFiles([ 'organizer.html', 'organizer.css'], 'client');
  api.addFiles('organizer.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('organizer');
});