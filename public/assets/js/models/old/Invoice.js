var InvoiceItem = Backbone.Model.extend({});

var Invoice = Backbone.Model.extend({
  initialize: function(options) {
    this.invoiceid = options.invoiceid;
  },
  fetch: function(after_fetch) {
    var self = this;

    modem('GET', 'billing/invoice/' + this.invoiceid,
      function(json) {
        var inv = json.invoice;
        var aux = [];
        for (var i = 0; i < inv.items.length; i++) {
          aux.push(new InvoiceItem(inv.items[i]));
        }

        self.set("items", new InvoiceItems(aux, {
          invoiceid: inv.identifier
        }));

        self.set("invoiceid", inv.identifier);
        self.set("date", inv.date);
        self.set("duedate", inv.duedate);
        self.set("datepaid", inv.datepaid);
        self.set("subtotal", inv.total);
        self.set("total", inv.totaliva);
        self.set("status", inv.status);
        self.set("paymentmethod", inv.paymentmethod); //TODO

        after_fetch();
      },
      function(xhr, ajaxOptions, thrownError) {
        var json = JSON.parse(xhr.responseText);
        //console.log(json);
      }
    );
  }
});
