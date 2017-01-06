module.exports = {
  pattern: /@for\s([\w$]+)\sfrom\s([\w$]+)\s(through|to)\s(.*)\s\{((?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*)\}/gi,
  replacement: function(match, iterator, initial, through, to, body) {
    let operator = through === 'through' ? '<=' : '<'
    return `.for(${iterator}: ${initial}) when (${iterator} ${operator} ${to}) {` +
      `${body.replace(new RegExp('(?:\#{)?' + iterator + '}?', 'gi'), '@{' + iterator + '}')}` +
`  .for((${iterator} + 1));
}
.for();`
  },
  order: 0
}
