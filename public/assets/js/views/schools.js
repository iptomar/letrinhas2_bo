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
    
editEscola: function (obj) {
    //Variavel a enviar, para depois poder buscar os dados da escola a editar
    window.localStorage.setItem("EscolaEditar", obj.name);
    app.navigate('/schools/edit', {
      trigger: true
    });
  },    
    
  initialize: function() {},

   render: function() {
    $(this.el).html(this.template());

        
    modem('GET', 'schools', function(data) {
      $('#schoolsBadge').text(data.length);
      var s='';
      var first=true;
      for(i=0;i<data.length;i++){
         s+= '<button id="'
          + data[i].doc._id
          + '"  name="' +data[i].doc._id+'"  type="button" style="height:50px; background-color: #53BDDC; color: #ffffff;"'
          +' class="btn btn-lg btn-block schoolSelec" >'+'<img src="data:'
            +data[i].doc._attachments['escola.png'].content_type
            +';base64,'
            +data[i].doc._attachments['escola.png'].data
            +'"  style="height:25px;">'+ data[i].doc.nome + '</button>';
            if(first){
              $('#schoolsPreview').html(self.encheEscPreview(data[i].doc));
              first=false;
            }
    } 
/*   $('#schoolsContent').html(s);
        self.getTurma(data[0].doc.turma);
        document.getElementById(data[0].doc._id).focus();

*/
       //Criar Eventos
      var myEl = document.getElementsByClassName('schoolSelec');
      for(j=0;j<myEl.length;j++){
        myEl[j].addEventListener('click', function() {
                      self.mudaEscola(this);
                    }, false);
      };
      myEl = document.getElementById('btnSchoolsEdit');
      myEl.addEventListener('click', function() {
                    self.editEscola(this);
                  }, false);
    }, function(error) {
      console.log('Error getting schools list!');
    });

      return this;

  },
                                          
mudaEscola: function(obj){
    var self=this;
    //vai buscar os dados da escola:
    modem('GET','schools/'+obj.id, function(json){
      $('#schoolsPreview').html(self.encheEscPreview(json));
      var myEl = document.getElementById('btnSchoolsEdit');
      myEl.addEventListener('click', function() {
                    self.editEscola(this);
                  }, false);
     // self.getTurma(json.turma);

    },
    function(error) {
      console.log('Error getting schools list!');
    });      
    }, 
   
  encheEscPreview: function(documnt){
    var self=this;
    var html='';
    html+= '<img src="http://localhost:5984/dev_escola/'+documnt._id+'/escola.png"  style="height:220px;">';
    html+= '<br><div align=left class="col-md-9"><span>Nome: <label id="EscolaNome">'+documnt.nome+'</label></span>';
    html+= '<br><span>Morada da Escola: <label>'+documnt.morada+' </label></span>';
    html+= '<br><span >Turmas: <label id="turmas">Sem Turma...</label></span></div>';
    //Botão para Editar
    html+='<div align=right class="col-md-2"><br><br><br>'
        +'<button id="btnSchoolsEdit" class="btn btn-warning" style="font-size:10px">'
        +'<span class="glyphicon glyphicon-pencil" style="color:#ffff00;"></span>'
        +' Editar dados'
        +'</button>';

    return html;  
}
});

