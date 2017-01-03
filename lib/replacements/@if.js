module.exports = {
  pattern: /@if\s([()\w\s$=><!-]+)/gi,
  replacement: function(match, g1) {
    return '& when (' + g1.replace('==', '=').trim() + ') '
  },
  order: 0.1
}
