require('colors');

var nano = require('nano');

exports.new = function (req, res) {
  console.log('schools new'.green);
};

exports.getAll = function (req, res) {
  console.log('schools getAll'.green);
};

exports.get = function (req, res) {
  console.log('schools get'.green);
};
