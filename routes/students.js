require('colors');

//var nano = require('nano')('http://ince.pt:5984');
var nano = require('nano')('http://127.0.0.1:5984');
//var db = nano.use('alunos');
var db = nano.use('dev_alunos');
//var db2 = nano.use('dev_escolas');



exports.upDate = function(rep, res){
  console.log('students upDate, NotAvaliable yet'.blue);


};

exports.new = function (req, res) {
  console.log('students new, NotAvaliable yet'.green);


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
