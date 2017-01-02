module.exports = {
  pattern: /(@function\s)|(@return)/gi,
  replacement: function (match, func, rt) {
    return func ? '.function-' : 'return:'
  },
  order: 1
}
