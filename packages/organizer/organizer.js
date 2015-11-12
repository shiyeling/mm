// Write your package code here!
var guideScreen = new ReactiveVar();
Router.route('organizer', {
  data : function() {
    var configId = this.params.query.mcid;
    if (configId) {
      // TODO load config from db and use it as template data
      return {
        configId : configId
      }
    }
    var t = this.params.query.t;
    if (t) {
      return {
        type : this.params.query.t,
        guideScreens : [ 'ppSelection', 'basicInfo' ],
        configId : null
      }
    }
    return {
      configId : null
    };
  },

  onRun : function() {
    console.log("organizer route ran.");
    if (this.next)
      this.next();
  }
});

Template.organizer.onCreated(function() {
  console.log("organizer created with data: " + JSON.stringify(this.data));
  this.data.guideScreenIndex = 0;
  guideScreen.set(this.data.guideScreens[this.data.guideScreenIndex])
});

Template.organizer.helpers({
  guideSreen : function() {
    console.debug('Looking for organizing. Retruning ' + guideScreen.get());
    return guideScreen.get();
  },
  matchConfig : function() {
    return this;
  }
});

Template.organizer.events({
  'nextScreen .guide-screen-container' : function(e, t) {
    console.log("Captured a nextScreen event.");
    this.guideScreenIndex += 1;
    guideScreen.set(this.guideScreens[this.guideScreenIndex])
  }
});

Template.ppSelection.onCreated(function() {
  console.log("Pri/Pub selection created with data: " + JSON.stringify(this.data));
});

Template.ppSelection.onDestroyed(function() {
  console.log("Pri/Pub selection destroyed with data: " + JSON.stringify(this.data));
});
Template.ppSelection.events({
  'click .match-config-private ' : function(e, t) {
    this.isPrivate = true;
    console.log("Creating private match config" + JSON.stringify(this));
    $('.match-config-private').trigger("nextScreen");
  },
  'click .match-config-public ' : function(e, t) {
    this.isPrivate = false;
    console.log("Creating public match config" + JSON.stringify(this));
    $('.match-config-public').trigger("nextScreen");
  }
});

Template.basicInfo.onCreated(function() {
  console.log("Basic Info screen created with data: " + JSON.stringify(this.data));
});

Template.basicInfo.onDestroyed(function() {
  console.log("Basic Info screen destroyed with data: " + JSON.stringify(this.data));
});