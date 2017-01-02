module.exports = {
  pattern: /(@if\s([()\w\s$=><!-]+)({(?:[^{}])+})\s@else\s({(?:[^{}])+}))/gi,
  replacement: function(match, g1, g2, g3, g4) {
    return '.if() when (' + g2.replace('==', '=').trim() + ') ' + g3 + '\n.if() when not (' + g2.replace('==', '=').trim() + ') ' + g4 + '\n.if();'
  },
  order: 0
}
