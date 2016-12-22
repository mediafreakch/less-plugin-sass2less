module.exports = {
  pattern: /\@import\s(["|'].*)(["|'])/gi,
  replacement: '@import $1.scss$2',
  order: 2
};
