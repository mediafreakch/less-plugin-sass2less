module.exports = {
  pattern: /adjust-hue\((.+),(.+)\)/gi,
  replacement: 'spin($1,$2)',
  order: 3
};
