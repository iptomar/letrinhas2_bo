window.TestsView = Backbone.View.extend({
  events: {
    "click #btnTestNew":"newTest",

  },

  newTest:function(){
    console.log("Queres novo teste?? ");

    //deverá aparecer um Modal para escolher o tipo de teste a criar.
    //Teste:


  },

  initialize: function() {},

  render: function() {
    $(this.el).html(this.template());


    modem('GET', 'tests', function(data) {
      $('#testBadge').text(data.length);
      var s='';
      for(i=0;i<data.length;i++){
        s+= '<button id="'
          + data[i].doc._id
          + '"  name="' + data[i].doc._id
          +'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
          +' class="btn btn-lg btn-block" >'
          +' <img src="../img/testLista.png"  style="height:25px;" > '
          + data[i].doc.titulo + ' - DD.MM.AAAA </button>';
      }
      $('#testsContent').html(s);

    }, function(error) {
      console.log('Error getting tests list!');
    });

    return this;
  }
});
