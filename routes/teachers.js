require('colors');

//var nano = require('nano')('http://ince.pt:5984');
var nano = require('nano')('http://127.0.0.1:5984');
//var db = nano.use('professores');
var db = nano.use('dev_professores');
//var db2 = nano.use('dev_escolas');


exports.upDate = function(rep, res){
  console.log('teachers upDate, NotAvaliable yet'.blue);
//Exemplo

// source: http://writings.nunojob.com/2012/07/How-To-Update-A-Document-With-Nano-The-CouchDB-Client-for-Node.js.html

db.update = function(obj, key, callback) {
var db = this;

db.get(key, function (error, existing) {
if(!error) obj._rev = existing._rev;
db.insert(obj, key, callback);
});
}


db.update({title: 'The new one'}, '1', function(err, res) {
if (err) return console.log('No update!');
console.log('Updated!');
});
//fim exemplo


};

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
  });
};
