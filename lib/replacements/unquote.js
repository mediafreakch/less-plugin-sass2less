module.exports = {
  pattern: /unquote\("(.*)"\)/gi,
  replacement: '~"$1"',
  order: 3
};
