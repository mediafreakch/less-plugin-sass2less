module.exports = {
  pattern: /\@import\s["|']([^\.]+)["|']/gi,
  replacement: '@import "$1.scss"',
  order: 2
};
