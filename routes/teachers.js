require('colors');

//var nano = require('nano')('http://ince.pt:5984');
//var nano = require('nano')(process.env.COUCHDB);
var nano = require('nano')('http://185.15.22.235:5984');
//var db = nano.use('professores');
var db = nano.use('dev_professores');
var db2 = nano.use('dev_escolas');


exports.upDate = function(req, res){
  console.log('teachers upDate'.cyan);
  var estado=false;
  if(req.body.estado=="Ativo"){
      estado=true;
  }

  //começo do upDate...
  db.get(req.body.email, function(err, body) {
   if (err) {
     console.log("(L-20) - Não foi possivel aceder a "+req.body.email+'\n'
                +"erro: "+err);
     res.redirect('/#user');
   }

   db.update = function(obj, key, callback) {
    db.get(key, function (error, existing) {
      if(!error) obj._rev = existing._rev;
      db.insert(obj, key, callback);
    });
   };

   /* para upDate à foto, tenho de a destruir e depois voltar a inserir */
     //atualizar dados ao body.
     body.estado=estado;
     body.nome=req.body.nome;
     body.password=req.body.password;
     body.pin=req.body.pin;
     body.telefone=req.body.telefone;
     body.tipoFuncionario=req.body.tipo;
     //executar o upDate
     db.update(body, body._id, function(err1, res) {
       if (err1) return console.log(body.nome+" wasn't update!".red +'\n'+ err1);
       console.log("The data of "+body.nome+' was Updated!'.green);
       if(req.files){
         try{
           if(req.files.file.size>0) {
           console.log("Também existe uma foto!");
           //get doc
           db.get(req.body.email, function(err2, bodi) {
             if (err2) {
               console.log("(L-51) - Não foi possivel aceder a "+req.body.email+'\n'
                          +"erro: "+err2);
               res.redirect('/#user');
             }
            //destroy foto
            db.attachment.destroy(body._id, 'prof.jpg', {rev: bodi._rev}, function(err3, bode) {
              if (err3)
                console.log("(L-58) - Deu erro a destruir a foto "+err3);
              else{
                console.log("Destruida a foto de "+ body.nome);
                //get doc novamente, para actualizar a versão documento
                db.get(body._id, function(err4, boda) {
                  if (err4) {
                    console.log("(L-64) - Não foi possivel aceder a "+req.body.email+'\n'
                               +"erro: "+err2);
                    res.redirect('/#user');
                  }
                  //e insert new foto
                  var file;
                  file = req.files.file;
                  var imgData = require('fs').readFileSync(file.path);
                  console.log("path: "+file.path);
                  db.attachment.insert(req.body.email,
                                      'prof.jpg',
                                      imgData,
                                      'image/jpg',
                                      {rev: boda._rev},
                                      function(err5, bodu) {
                                        if (err5){
                                          console.log("Foto not inserted :".red
                                                      + err5);
                                        }
                                        console.log("New foto was inserted".green);
                  });
                });
              }
            });
          });
          }
        }
        catch (error){
          console.log("L 97 - "+error +'\n'+ "Foto não alterada.");
        }
      }
     });

   res.redirect('/#user');
 });


};

exports.new = function(req, res) {
  console.log('teachers new'.green);

  var estado=false;
  if(req.body.estado=="Ativo"){
      estado=true;
  }

  console.log("nome"+req.body.nome);

  var professor={"estado":estado,
                 "nome":req.body.nome,
                 "password":req.body.password,
                 "pin":req.body.pin,
                 "telefone":req.body.telefone,
                 "tipoFuncionario":req.body.tipo};

  var file;
  if(req.files) file = req.files.file;

  var imgData = require('fs').readFileSync(file.path);

  db.multipart.insert(professor, [{
    name: 'prof.jpg',
    data: imgData,
    content_type: 'image/jpg'
  }], req.body.email, function(err, body) {
    if (err) {
      console.log("(L-131) - Não foi possivel inserir "+req.body.email+'\n'
                 +"erro: "+err);
      res.redirect('/#teachers');
    }

    //fazer udate nas escolas caso precise:
    //1º identificar as escolas e turmas a ser atualizadas
    var escolas= getEscolas(req.body.turmas);

    //2º por cada escola update para adicionar o id do prof no array de turmas
    for(esc=0; esc<escolas.length; esc++){
      //                 idProf        escola&turmas
      insertProfTurma(req.body.email, escolas[esc]);
    }
    console.log('New teacher was inserted'.green);

    res.redirect('/#teachers');
  });
};

exports.getAll = function(req, res) {
  console.log('teachers getAll'.yellow);

  db.list({'include_docs': true, 'attachments': true, 'limit': undefined, 'descending': true}, function(err, body) {
    if (err) {
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }
    res.json(body.rows);
  });
};

exports.get = function(req, res) {
  var id = req.params.id;
  db.get(id,function(err, body) {
//dang
//console.log(err);
//console.log(body);
  if (err) {
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }

    res.json(body);
  });
};

//Função para atualizar as turmas com o id do professor
function insertProfTurma(idProf, escola){
  db2.get(escola.id, function(err, body) {

    if (err) {
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }

    //correr os arrays de turmas para encontrar a correspondência
    for(t=0;t< escola.turma.length; t++){
      for(i=0;i<body.turmas.length;i++){
        if(escola.turma[t] == body.turmas[i]._id){
          //verificar se o id do professor já está na turma
          var existe=false;
          for(p=0;p< body.turmas[i].professores.length;p++){
            if(body.turmas[i].professores[p].id == idProf ){
              existe=true;
              break;
            }
          }
          if(!existe){
            body.turmas[i].professores.push(
              {"id":idProf}
            );
          }
        }

      }
    };

    db2.update = function(obj, key, callback) {
     db2.get(key, function (error, existing) {
       if(!error) obj._rev = existing._rev;
       db2.insert(obj, key, callback);
     });
    };


    db2.update(body, body._id, function(err, res) {
      if (err) return console.log('No update!'.red);
      console.log(body.nome+' was Updated!'.green);
    });

  });

};

//função para separar as escolas existentes na string de turmas
function getEscolas(turmas){
  var listaId= new Array();
  var turmaID= new Array();
  var escolas= new Array();
  var contaID=0;
  var id='';

  var isIdEscola=true;

  for(i=0;i<turmas.length;i++){
    //procuro o separador ':' --> id_escola:id_Turma;
    if(turmas.charCodeAt(i) != 58){
      //se estou a ler o id da escola
      if(isIdEscola){
        //adiciona o caracter ao ID
        id+= turmas.charAt(i);
      }
      else{
        //senão é porque estou a ler o id da turma
        //e espero encontrar o separador ';'
        //para identificar o inicio da leitura do id de escola
        if(turmas.charCodeAt(i) == 59){

          isIdEscola=true;
          turmaID.push(id);
          id='';
        }
        else{
          id+= turmas.charAt(i);
        }
      }
    }
    else{
      //encontrei o separador ':'
      //vou entregar ao array o id da escola
      listaId.push(id);
      id='';
      //e identifico o inicio da leitura do id da turma
      isIdEscola=false;
    }
  }

  var unique;
  //Limpar a lista de escolas de id's repetidos
  //e turmas repetidas
  for(i=0;i<listaId.length;i++){
    unique=true;
    for(j=0;j<escolas.length;j++){
      if(escolas[j].id == listaId[i]){
        unique=false;
        var uniqueT=true;
        for(k=0;k<escolas[j].turma.length;k++){
          if(escolas[j].turma[k] == turmaID[i]){
            uniqueT=false;
          }
        }
        if(uniqueT){
          escolas[j].turma.push(turmaID[i]);
        }
      }
    }
    if(unique){
      escolas.push({"id":listaId[i],
                      "turma": [turmaID[i]]
                    });
    }
  }

  return escolas;

};
