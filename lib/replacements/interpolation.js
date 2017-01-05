module.exports = {
  pattern: /\#{([^}]+)\}/gi,
  replacement: function(match, contents) {
    if (/\#{(?!\$)([^}]+)\}/gi.test(match)) {
      match = match
        // match string concatenation (+ "xy") that is valid within interpolation in SASS but not LESS
        .replace(/\+\s?"/gi, '~"')
        // match sass interpolation and remove it as no equivalent in this form in LESS
        .replace(/\#\{([^}]+)}/gi, '$1')
        // replace $ with @ as usual
        .replace(/\$/gi, '@')
      return match
    } else {
      return '@{' + contents.replace(/\$/gi, '') + '}'
    }
  },
  order: 0
};
