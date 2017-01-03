/*
  SASS has an overload for rgba() that accepts a single color object instead of a comma delimited rgb value.
  Less doesn't support this, so we need to convert those cases.

  Less rgba(): http://lesscss.org/functions/#color-definition-rgba
  Sass rgba(): http://sass-lang.com/documentation/Sass/Script/Functions.html#rgba-instance_method
*/
module.exports = {
  pattern: /rgba\((#[^,$]+),\s?([^,)]+)\)/gi,
  replacement: 'fade($1, ($2*100))',
  order: 4
};
