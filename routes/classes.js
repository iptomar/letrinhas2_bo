require('colors');

var nano = require('nano');

exports.new = function (req, res) {
  console.log('classes new'.green);
};

exports.getAll = function (req, res) {
  console.log('classes getAll'.green);
};

exports.get = function (req, res) {
  console.log('classes get'.green);
};
