/*
  Note that we have to deal with SASS partials (_file.scss) as well.
  To make things easier we just tell less to look for underscored files as well and import them as reference.
  In order for less not to throw errors, we make sass imports optional.
  This might make debugging harder in some cases...
  http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#partials
*/
module.exports = {
  pattern: /@import\s?['|"]([^.]+?)['|"];/gi,
  replacement: '@import (optional) "$1.scss";\n@import (optional, reference) "_$1.scss";',
  order: 2
};
