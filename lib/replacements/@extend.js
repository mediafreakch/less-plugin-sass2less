// TODO: mimic LESS's &:extend(x all)
module.exports = {
  pattern: /@extend[^\S\n]([\w\-\.\#]*)/gi,
  replacement: '&:extend($1 all)',
  order: 2
}
