window.SchoolsView = Backbone.View.extend({
  events: {
     "click #btnSchoolNew":"newEscola",
   },
    
newEscola: function(e) {
    e.preventDefault();
    app.navigate('/schools/new', {
    trigger: true
    }); 
  },    
    
  initialize: function() {},

   render: function() {
    $(this.el).html(this.template());

        
    modem('GET', 'schools', function(data) {
      $('#schoolsBadge').text(data.length);
      var s='';
      for(i=0;i<data.length;i++){
        s+= '<button id="'
          + data[i].doc._id
          + '"  name="' + data[i].doc._id
          +'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
          +' class="btn btn-lg btn-block" >'
          +' <img src="http://localhost:5984/dev_escolas/'+data[i].doc._id+'/escola.png"  style="height:25px;" > '
          + data[i].doc.nome + '</button>';
      }

      $('#schoolsContent').html(s);

      var url='';

        console.log(data[0].doc.nome);
        console.log(data[0].doc._attachments);
        

        var conteudo='';
            conteudo+= '<img src="http://localhost:5984/dev_alunos/'+data[0].doc._id+'/escola.png"  style="height:250px;">';
            conteudo+= '<br><label>'+data[0].doc.nome+' </label><br>';
            conteudo+= '<label>'+data[0].doc.morada+'</label><br>';
           // conteudo+= '<label>'+data[0].doc.turmas+'</label><br>';
        

        $('#schoolsPreview').html(conteudo);


        
        
    }, function(error) {
      console.log('Error getting schools list!');
    });

    return this;
  },
  
 
    
    
});

