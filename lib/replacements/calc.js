/*
  Due to the agressive default behaviour of LESS for calc(), we need to escape it when coming from sass
  More on that here: http://stackoverflow.com/a/36214895/1071518
  There are some pretty nasty sass interpolation features that are handled in cases where there is a match for them.
*/
module.exports = {
  pattern: /calc\(([^;]+)\)/gi,
  replacement: function(match, calcBody) {
    if (/\#{(?!\$)([^}]+)\}/gi.test(calcBody)) {
      calcBody = calcBody
        // match math operators that are not within interpolation and LESS-escape them
        .replace(/[-+*\/][^#]+?}|([-+*\/])/gi, function(hit, operator) { return operator ? '~"' + operator + '"' : hit })
        // match sass interpolation and remove it as no equivalent in this form in LESS
        .replace(/\#\{([^}]+)}/gi, '$1')
        // replace $ with @ as usual
        .replace(/\$/gi, '@')

      return 'calc(' + calcBody + ')'
    } else {
      return 'calc(~"' + calcBody + '")'
    }
  },
  order: 0
}
