module.exports = {
  pattern: /\#{\$([^}]+)\}/gi,
  replacement: '@{$1}',
  order: 1
};
