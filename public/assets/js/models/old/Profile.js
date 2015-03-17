 var Profile = Backbone.Model.extend({
  initialize: function() {
  },
  fetch: function(after_fetch, after_fetch2) {
    var self = this;

    modem('GET', 'user/info',
      function(json) {
        self.set("firstname", json.data.firstname);
        self.set("lastname", json.data.lastname);
        self.set("id", json.data.id);
        self.set("contact", json.data.phone);
        self.set("email", json.data.email);
        self.set("address", json.data.address);
        self.set("postal", json.data.postal);
        self.set("country", json.data.country);
        self.set("city", json.data.city);
        self.set("phone", json.data.phone);
        self.set("language", json.data.language);
        self.set("vat", json.data.vat);
        self.set("hash", json.data.hash);
        self.set("creditthreshold", json.data.creditthreshold);
        self.set("companyname", json.data.company);
        self.set("credit", json.data.credit);
        self.set("productsnumactive", json.data.productsnumactive);
        self.set("productsnumactivehosting", json.data.productsnumactivehosting);
        self.set("numactivedomains", json.data.numactivedomains);
        self.set("numoverdueinvoices", json.data.numoverdueinvoices);
        self.set("productsnumactiveservers", json.data.productsnumactiveservers);
        self.set("productsnumactivereseller", json.data.productsnumactivereseller);
        self.set("productsnumactiveother", json.data.productsnumactiveother);
        self.set("numpaidinvoices", json.data.numpaidinvoices);
        self.set("groupid", json.data.groupid);
        self.set("contacts", json.data.contacts);
        self.set("permissions", json.data.permissions);
        self.set("lastlogin", json.data.lastlogin);

        after_fetch();
      },
      function(xhr, ajaxOptions, thrownError) {
        window.profile == null;
        window.sessionStorage.clear();

        var json = JSON.parse(xhr.responseText);
        //console.log(json);

        if(after_fetch2) after_fetch2();
      }
    );
  }
});
