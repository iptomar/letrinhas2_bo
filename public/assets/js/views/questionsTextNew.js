window.QuestionsTextNew = Backbone.View.extend({
  events: {},
  initialize: function() {},

  render: function() {
    var self=this;

    $(this.el).html(this.template());

    console.log("batemas");


    return this;
  }
});
