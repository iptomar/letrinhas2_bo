
window.manView = Backbone.View.extend({
  events:{
    "click #manSair": "Logout",
  },
  initialize: function () {
  },

  Logout:function(e){
    e.preventDefault();
    window.history.back();

  },
  render: function () {
    $(this.el).html(this.template());
    return this;
  }

});
