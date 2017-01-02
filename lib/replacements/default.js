/*
  The !default attribute is not needed in LESS, because of lazy loading.
  Thus we just remove it. http://lesscss.org/features/#variables-feature-default-variables
*/
module.exports = {
  pattern: /\s?\!default/gi,
  replacement: '',
  order: 3
}
