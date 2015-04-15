require('colors');

// var nano = require('nano')('http://ince.pt:5984');
var nano = require('nano')('http://127.0.0.1:5984');
var dbProf = nano.use('professores');
 

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
  console.log('teachers getAll'.green);

  db.list(function(err, body) {
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

  console.log('teachers get'.green);

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
