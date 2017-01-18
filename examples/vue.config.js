var sass2less = require('less-plugin-sass2less')
var Functions = require('less-plugin-functions')

module.exports = {
  less: {
    plugins: [sass2less, new Functions()]
  }
}
