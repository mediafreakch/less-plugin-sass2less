var Converter = require('./index.js')

module.exports = {
  install: (less, pluginManager) => {
    pluginManager.addPreProcessor(new Converter(), 2000)
  },
  minVersion: [2, 7, 1]
}
