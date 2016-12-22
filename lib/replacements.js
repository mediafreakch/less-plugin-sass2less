var fs = require('fs')
var _ = require('lodash')
var dir = __dirname + '/replacements/'

var replacements = function () {
  var filenames = fs.readdirSync(dir)

  var results = filenames.map(function (filename) {
    return require(dir + filename)
  })

  return _.sortBy(results, 'order')
};

module.exports = replacements;
