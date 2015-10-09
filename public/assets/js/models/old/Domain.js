var Domain = Backbone.Model.extend({
  initialize: function (options) {
    this.domain = options.domain;
  },
  fetch: function (after_fetch) {
    var self = this;

    modem('GET', 'domains/' + this.domain + '/info',
      function (json) {
        self.set("expirydate", json.data.expires);
        self.set("nextduedate", json.data.expires);
        self.set("status", json.data.status);
        self.set("domainname", json.data.domain);
        self.set("regdate", json.data.created);
        self.set("id", json.data.id);
        self.set("recurringamount", json.data.price);
        self.set("years", json.data.years);
        /*
         if (json.stats) {
         self.set("stats", json.stats);
         }

         if (json.redirect) {
         self.set("redirect", json.redirect);
         self.set("redirect_title", json.redirect_title);
         }*/
        if (json.data.ns) {
          self.set("ns1", json.data.ns[0]);
          self.set("ns2", json.data.ns[1]);
          self.set("ns3", json.data.ns[2]);
          self.set("ns4", json.data.ns[3]);
        } else {
          self.set("ns1", '');
          self.set("ns2", '');
          self.set("ns3", '');
          self.set("ns4", '');
        }

        after_fetch();
      },
      function (xhr, ajaxOptions, thrownError) {
        var json = JSON.parse(xhr.responseText);
        error_launch(json.message);
      }
    );
  }
});
