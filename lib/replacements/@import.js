/*
  Note that we have to deal with SASS partials (_file.scss) as well.
  To make things easier we just tell less to look for underscored files as well and import them as reference.
  In order for less not to throw errors, we make sass imports optional.
  This might make debugging harder in some cases...
  http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#partials
*/
module.exports = {
  pattern: /@import\s?['|"]([\w-_]+|[\w-_/]+\/|\.\.?\/)([^./]*?)['|"];/gi,
  replacement: function (match, pathOrName, name) {
    if (name) {
      // we got a file referenced with a path but need to append '_' only to the filename
      return '@import (optional) "' + pathOrName + name + '.scss";\n@import (optional) "' + pathOrName + '_' + name + '.scss";'
    }
    return '@import (optional) "' + pathOrName + '.scss";\n@import (optional) "_' + pathOrName + '.scss";'
  },
  order: 2
};
