module.exports = {
  pattern: /rgba\(([^,]+),\s?([^,)]+)\)/gi,
  replacement: 'fade($1, ($2*100))',
  order: 4
};
