window.TeachersView = Backbone.View.extend({
  events: {},
  initialize: function() {},

  render: function() {
    $(this.el).html(this.template());


    modem('GET', 'teachers', function(data) {
      $('#teachersBadge').text(data.length);
      var s='';
      for(i=0;i<data.length;i++){
        s+= '<button id="'
          + data[i].doc._id
          + '"  name="' + data[i].doc._id
          +'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
          +' class="btn btn-lg btn-block" >'
          +' <img src="../img/professor1.png"  style="height:25px;" > '
          + data[i].doc.nome + '</button>';
      }
        
      $('#teachersContent').html(s);
        
        
        var conteudo='';
            conteudo+= '<img src="../img/docentes.png"  style="height:250px;">';
            conteudo+= '<br><label>'+data[0].doc.estado+' </label><br>';
            conteudo+= '<label>'+data[0].doc.telefone+'</label><br>';
            
        // falta ir buscar à BD as escolas onde o professor leciona e turmas
        
        $('#teachersPreview').html(conteudo);
            
                
    }, function(error) {
      console.log('Error getting teachers list!');
    });

    return this;
  }
  
});
