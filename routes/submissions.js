require('colors');

//var nano = require('nano')('http://ince.pt:5984');
var nano = require('nano')(process.env.COUCHDB);
//var db = nano.use('resolucoes');
var db = nano.use('dev_resolucoes');


exports.upDate = function(rep, res){
  console.log('submissions upDate, NotAvaliable yet'.blue);
  /*
  submission_={
          "dataReso":string,
          "id_Aluno":string,
          "id_Prof":string,
          "id_Teste":string,
          "nota":string,
          "observ":string,
          "respostas":[{
                        "id_Pergunta":string,
                        "TotalPalavras":string,
                        "dataCorr":string,
                        "velocidade"string,
                        "correcao":[{"palavra":string,
                                     "categoria":string,
                                     "erro":string,
                                     "posicao":string,
                                   }]
                    }]
            }
  */

};


exports.delete = function (req, res){
  console.log("Delete submissions, not avaliable yet!".red);
};

exports.getAll = function (req, res) {
  console.log('submissions getAll'.green);

  db.list({'include_docs': true, 'limit': undefined, 'descending': true}, function(err, body) {
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
  console.log('submissions get'.green);

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
