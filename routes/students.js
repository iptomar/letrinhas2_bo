require('colors');

var nano = require('nano');

exports.new = function (req, res) {
  console.log('students new'.green);
};

exports.getAll = function (req, res) {
  console.log('students getAll'.green);
};

exports.get = function (req, res) {
  console.log('students get'.green);
};
