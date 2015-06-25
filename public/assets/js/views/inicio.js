window.Inicio = Backbone.View.extend({
  events: {
    "click #irSite":"goWebService",

  },

  goWebService:function(e){
    e.preventDefault();
    app.navigate("/login", {
      trigger: true
    });
    return null;
  },
  initialize: function() {},

  render: function() {
    var self=this;


    $(this.el).html(this.template());

    return this;
  }
});
