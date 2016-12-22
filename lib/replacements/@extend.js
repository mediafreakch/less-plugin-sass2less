module.exports = {
  pattern: /@extend\s\.([a-zA-Z-_]*)/gi,
  replacement: '&:extend(.$1)',
  order: 2
}
