require('colors');

//var nano = require('nano')('http://ince.pt:5984');
//var nano = require('nano')(process.env.COUCHDB);
var nano = require('nano')('http://185.15.22.235:5984');
//var db = nano.use('alunos');
var db = nano.use('dev_alunos');

exports.upDate = function(req, res){
  console.log('students upDate, NotAvaliable yet'.blue);
};

exports.new = function (req, res) {
  console.log('students new'.green);

  var aluno={
  "nome":req.body.nome,
  "estado":true,
  "numero":req.body.numero,
  "escola":getEscola(req.body.turma),
  "turma":getTurma(req.body.turma),
  };

  var file;
  if(req.files) file = req.files.file;

  var imgData = require('fs').readFileSync(file.path);
  var dati= new Date();
  var idAluno= req.body.nome+dati.getTime();

  db.multipart.insert(aluno, [{
    name: 'aluno.jpg',
    data: imgData,
    content_type: 'image/jpg'
  }], idAluno, function(err, body) {
    if (err) {
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }

    console.log('New student was inserted'.green);

    res.redirect('/#students');

  });

};

exports.getAll = function (req, res) {
  console.log('students getAll'.green);

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

exports.get = function (req, res) {
  var id = req.params.id;
  console.log('students get'.green);

  db.get(id, function(err, body) {
    if (err) {
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }

    res.json(body);
  });
};

function getEscola(turma){
  var escola='';

  for(i=0;i<turma.length;i++){
    //procuro o separador ':' --> id_escola:id_Turma;
    if(turma.charCodeAt(i) != 58){
        //adiciona o caracter ao ID
        escola+= turma.charAt(i);
    }
    //devole o id da escola
    else return escola;
  }

  return null;
};

function getTurma(turma){
  var tturma='';
  var isIdTurma=false;

  for(i=0;i<turma.length;i++){
    //procuro o separador ':' --> id_escola:id_Turma;
    if(turma.charCodeAt(i) != 58){
      if(isIdTurma){
        //se estou a ler o id da turma
        //entã espero encontrar o separador ';'
        //para identificar o fim da leitura
        if(turma.charCodeAt(i) == 59){
          return tturma;
        }
        else{
          tturma+= turma.charAt(i);
        }
      }
    }
    else{
      //encontrei o separador da ":" começo a ler o id da turma
      isIdTurma=true;
    }
  }

  return null;
};
