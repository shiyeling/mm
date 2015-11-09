Router.configure({
  layoutTemplate : 'simpleLayout'
});
Router.route('/', function() {
  this.layout('simpleLayout', {
    data : function() {
      return {};
    }
  })
  this.render('landingPage');
});

Router.route("home", {
  data : function() {
    return {
      "d" : "just test"
    };
  }
});

Router.route("login", function() {
  console.log("Login route ran.");
  this.render('loginScreen');
});

Meteor.startup(function() {
  console.log("Meteor start up");
  i18n.setDefaultLanguage("zh-CN");
  var lang = navigator.language;
  if (lang == "en-US" || lang == "zh-CN") {
    i18n.setLanguage(lang);
  }
});