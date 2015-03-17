require('colors');

var nano = require('nano');

exports.new = function (req, res) {
  console.log('submissions new'.green);
};

exports.getAll = function (req, res) {
  console.log('submissions getAll'.green);
};

exports.get = function (req, res) {
  console.log('submissions get'.green);
};
