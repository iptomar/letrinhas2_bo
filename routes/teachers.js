require('colors');

<<<<<<< HEAD
//var nano = require('nano')('http://ince.pt:5984');
var nano = require('nano')('http://127.0.0.1:5984');
//var db = nano.use('professores');
var db = nano.use('dev_professores');
=======
var nano = require('nano')('http://ince.pt:5984');
var dbProf = nano.use('professores');
 
>>>>>>> 309b4ec2bba021185b35ef34fc5a07a4a1252abb

exports.new = function(req, res) {
  console.log('teachers new'.green);

  var file;
  if(req.files) file = req.files.file;

  var imgData = require('fs').readFileSync(file.path);

  db.multipart.insert(req.body, [{
    name: 'prof.png',
    data: imgData,
    content_type: 'image/png'
  }], req.body.email, function(err, body) {
    if (err) {
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }

    res.json(body);
  });
};

exports.getAll = function(req, res) {
  console.log('teachers getAll'.yellow);

  db.list(function(err, body) {
    if (err) {
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }
    res.json(body.rows);
    //para aceder:
    //json

  });
};

exports.get = function(req, res) {
  var id = req.params.id;

  db.get(id, function(err, body) {
    if (err) {
      return res.status(500).json({
        'result': 'nok',
        'message': err
      });
    }

    res.json(body);
    //para aceder:
    //json.parametro;

  });
};
