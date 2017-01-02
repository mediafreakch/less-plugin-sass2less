module.exports = {
  pattern: /rgba\((.*),\s?([\d.]+)\)/gmi,
  replacement: 'fade($1, ($2*100)%)',
  order: 3
};
