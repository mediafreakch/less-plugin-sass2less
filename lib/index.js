var replacements = require('./replacements')()
var sassToLess = function() {}

sassToLess.prototype = {
  process: function(src, extra) {
    // skip if it's not a sass/scss file
    if (!extra.fileInfo && !extra.fileInfo.filename.test(/\.s[a|c]ss/gi)) {
      return src
    }

    // process file
    return [src].concat(replacements).reduce(function(source, item) {
      return source.replace(item.pattern, item.replacement)
    })
  }
}

module.exports = sassToLess
