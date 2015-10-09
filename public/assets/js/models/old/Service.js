var Service = Backbone.Model.extend({
  initialize: function(options) {
    this.serviceid = options.serviceid;
    this.type = options.servicetype;

    if (this.type != 'services' && this.type != 'hosting') {
      this.type = 'servers/' + this.type;
    }

  },
  fetch: function(after_fetch) {
    var self = this;
    modem('GET', this.type + '/' + this.serviceid + '/info',
      function(json) {
        var data = json.data;
        self.set("groupname", data.groupname);//
        self.set("regdate", data.registrationdate);//
        self.set("nextduedate", data.nextduedate);
        self.set("billingcycle", data.billingcycle);
        self.set("domain", data.domain);
        self.set("username", data.username);//
        self.set("serverhostname", data.serverhostname);//
        self.set("amount", data.amount);
        self.set("name", data.name);//
        self.set("id", data.identifier);
        self.set("status", data.status);
        self.set("mainip", data.mainip);
        self.set("ips", data.ips);
        self.set("extras", data.extras);
        self.set("pid", data.productid || data.pid);

        after_fetch();
      },
      function(xhr, ajaxOptions, thrownError) {
        var json = JSON.parse(xhr.responseText);
        error_launch(json.message);
      }
    );
  }
});
