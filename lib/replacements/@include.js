module.exports = {
  pattern: /@include\s([\w\-]*)\s?\((.*)\);/gi,
  replacement: '.$1($2);',
  order: 2
};
