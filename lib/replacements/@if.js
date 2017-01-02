module.exports = {
  pattern: /@if\s([()\w\s$=><!-]+)({(?:[^{}])+})/gi,
  replacement: function(match, g1, g2) {
    return '.if() when (' + g1.replace('==', '=').trim() + ') ' + g2 + '\n.if();'
  },
  order: 0.1
}
