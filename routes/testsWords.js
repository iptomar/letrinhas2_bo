require('colors');

var nano = require('nano')('http://ince.pt:5984');
var db = nano.use('testesWords');

exports.new = function (req, res) {
  console.log('testsWords new'.green);
};

exports.getAll = function (req, res) {
  console.log('testsWords getAll'.green);

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

exports.get = function (req, res) {
  var id = req.params.id;
  console.log('testsWords get'.green);

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
