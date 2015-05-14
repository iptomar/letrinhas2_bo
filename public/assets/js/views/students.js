window.StudentsView = Backbone.View.extend({
  events: {
     "click #btnStudentsNew":"newAluno",
   },
    
newAluno: function(e) {
  console.log("criar aluno");
    e.preventDefault();
    app.navigate('/students/new', {
    trigger: true
    }); 
  },
    
  initialize: function() {},
    
    
  

  render: function() {
    $(this.el).html(this.template());

  
    modem('GET', 'students', function(data) {
      $('#studentsBadge').text(data.length);
      var s='';
      for(i=0;i<data.length;i++){
        s+= '<button id="'
          + data[i].doc._id
          + '"  name="' + data[i].doc._id
          +'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
          +' class="btn btn-lg btn-block" >'
        +'<img src="data:'+data[i].doc._attachments['aluno.png'].content_type+';base64,'+data[i].doc._attachments['aluno.png'].data+'"  style="height:25px;">'
        + data[i].doc.nome + '</button>';
      }

      $('#studentsContent').html(s);

      var url='';

        console.log(data[0].doc.nome);
        console.log(data[0].doc._attachments);

     

        //= URL.createObjectURL(data[0].doc._attachments.data);
        //console.log(url);
        console.log(data[0]);
        var conteudo='';
        conteudo+= '<img src="data:'+data[0].doc._attachments['aluno.png'].content_type+';base64,'+data[0].doc._attachments['aluno.png'].data+'"  style="height:250px;">';
            
            conteudo+= '<br><label>'+data[0].doc.nome+' </label><br>';
            conteudo+= '<label>'+data[0].doc.numero+'</label><br>';

        

        $('#studentsPreview').html(conteudo);


        
        
    }, function(error) {
      console.log('Error getting students list!');
    });

    return this;
  },
  
 
    
    
});
