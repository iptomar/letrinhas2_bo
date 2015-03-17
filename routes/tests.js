require('colors');

var nano = require('nano');

exports.new = function (req, res) {
  console.log('tests new'.green);
};

exports.getAll = function (req, res) {
  console.log('tests getAll'.green);
};

exports.get = function (req, res) {
  console.log('tests get'.green);
};
