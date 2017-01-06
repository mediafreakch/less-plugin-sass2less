let fs = require('fs')
let _ = require('lodash')
let dir = __dirname + '/replacements/'
let sassToLess = function() {}

let replacements = function () {
  let filenames = fs.readdirSync(dir)

  let results = filenames.map(function (filename) {
    return require(dir + filename)
  })

  return _.sortBy(results, 'order')
}

sassToLess.prototype = {
  process: function(src, extra) {
    // skip if it's not a sass/scss file
    if (extra.fileInfo && !/\.s[a|c]ss/i.test(extra.fileInfo.filename)) {
      return src
    }

    // process file
    return [src].concat(replacements()).reduce(function(source, item) {
      return source.replace(item.pattern, item.replacement)
    })
  }
}

module.exports = sassToLess
