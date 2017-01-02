module.exports = {
  pattern: /\((.*)!important\)/gi,
  replacement: function (match, g1) {
    return '(' + g1.trim() + ') !important'
  },
  order: 3
}
