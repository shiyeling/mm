// Write your package code here!

Router.route('organizer', {
  data : function() {
    return {
      type : this.params.query.t
    };
  },
  onRun : function() {
    console.log("organizer route ran.");
    this.data.type = this.params.query.t;
    if (this.next)
      this.next();
  }
});

Template.organizer.onCreated(function() {
  console.log("organizer created!");
})