module.exports = {
  pattern: /@include\s([\w\-]+)/gi,
  replacement: '.$1',
  order: 2
};
