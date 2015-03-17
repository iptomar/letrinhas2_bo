require('colors');

var nano = require('nano');

exports.new = function (req, res) {
  console.log('teachers new'.green);
  res.json({});
};

exports.getAll = function (req, res) {
  console.log('teachers getAll'.green);
  res.json([]);
};

exports.get = function (req, res) {
  console.log('teachers get'.green);
  res.json({});
};
