window.ItemView = Backbone.View.extend({
  tagName: "tr",
  template: _.template('<h4><span ><%= type %>: </span><span class="fbold"><%= amount %></span> € </h4><h6 style="line-height:18px"> <span><%= description %> <span></h6>'),
//<td><%= type %></td><td><%= id %></td><td><%= description %></td><td><%= amount %> €</td>')
   
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

window.ItemsView = Backbone.View.extend({
  initialize: function() {
  },
  template: _.template('<div id="items"> </div>'),
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));

    _.each(this.model.models, function(contact) {
      $(this.el).find("#items").append(new ItemView({
        model: contact
      }).render().el);
    }, this);
    return this;
  }

});


var InvoiceItems = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.models = models;
    this.invoiceid = options.invoiceid;
  },
  sync: function(method, model, options) {},
  model: InvoiceItem
});
