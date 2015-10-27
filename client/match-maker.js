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