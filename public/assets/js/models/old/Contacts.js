var Contact = Backbone.Model.extend({});

window.ContactView = Backbone.View.extend({
  tagName: "tr",
      template: _.template('<td><%= email %></td><td><%= firstname %></td> <td> <div class="row"><div class="col-md-8"><a data-id="<%= id %>" class="btn_contact_edit btn btn-block btn-xs btn-info"><span data-i18n="domains.edit"></span></a></div> <div class="col-md-4"><a data-id="<%= id %>" class="btn_contact_delete btn btn-block btn-xs btn-danger"><span data-i18n="domains.delete"></span></a></div></div></td>'),
     
      render: function(eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
      }
});

window.ContactsView = Backbone.View.extend({
  initialize: function() {
  },
  template: _.template('<div class="row"><div class="col-md-12"> <table class="table table-striped"> <thead><tr>  <th> <span class="icon-email_corporate icon16b"> </span> <span data-i18n="generic.genericemail"></span></th>  <th><span class="icon-user icon16b"></span> <span data-i18n="home.clientname"></span></th> <th><span class="icon-managed icon16b"></span> <span data-i18n="generic.genericpremissions"></span></th>  </tr></thead>  <tbody></tbody>  </table> </div></div>'),
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));

    _.each(this.model.models, function(contact) {
      $(this.el).find(".table tbody").append(new ContactView({
        model: contact
      }).render().el);
    }, this);
    return this;
  }

});


var Contacts = Backbone.Collection.extend({
  model: Contact,
  fetch: function(after_fetch) {
    var self = this;
    modem('GET', 'user/contacts',
      function(json) {
        for (i = 0; i < json.contacts.length; i++) {
          self.models.push(new Contact(json.contacts[i]));
        }
        after_fetch();
      },
      function() {
      }
    );
  }
});
