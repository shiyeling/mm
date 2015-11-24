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
                guideScreens : [ 'matchSetup', 'basicInfo' ],
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
        console.debug('Looking for organizing. Returning ' + guideScreen.get());
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
    },
    'click .finish-match-setup' : function(e, t) {
        var formInput = $('form.match-setup-form').serializeArray();
        // do some validation;
        $('.input-match-name').addClass('has-error');
        console.log(formInput);
    }
});

Template.matchSetup.onCreated(function() {
    console.log("Pri/Pub selection created with data: " + JSON.stringify(this.data));
});

Template.matchSetup.onDestroyed(function() {
    console.log("Pri/Pub selection destroyed with data: " + JSON.stringify(this.data));
});
Template.matchSetup.events({
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

Template.matchSetup.onRendered(function() {
    var options = {
        format : 'MM-DD-YYYY'
    };
    this.$('.datetimepicker').datetimepicker(options);
    customizeCheckbox();
    $(".switch").bootstrapSwitch();
});
Template.basicInfo.onRendered(function() {
    var options = {
        format : 'MM-DD-YYYY'
    };

    this.$('.datetimepicker').datetimepicker(options);
    var t = $('div.fg-match-date');
    var input = t.$('input');
    var addon = t.$('span.input-group-addon');
    input.focus(function() {
        addon.css('background-color', '#ff9900');
        addon.css('border-color', '#ff9900');
    });

    input.blur(function() {
        addon.css('background-color', '#efefef');
        addon.css('border-color', '#ccc');
    });
});

Template.basicInfo.onRendered(function() {
    var options = {
        format : 'MM-DD-YYYY'
    };

    this.$('.datetimepicker').datetimepicker(options);
    var t = $('div.fg-match-date');
    var input = t.$('input');
    var addon = t.$('span.input-group-addon');
    input.focus(function() {
        addon.css('background-color', '#ff9900');
        addon.css('border-color', '#ff9900');
    });

    input.blur(function() {
        addon.css('background-color', '#efefef');
        addon.css('border-color', '#ccc');
    });
});
Template.basicInfo.onCreated(function() {
    console.log("Basic Info screen created with data: " + JSON.stringify(this.data));
});

Template.basicInfo.onDestroyed(function() {
    console.log("Basic Info screen destroyed with data: " + JSON.stringify(this.data));
});