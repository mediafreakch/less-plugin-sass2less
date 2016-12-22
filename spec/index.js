// require dependencies
var fs = require('fs')
var path = require('path')
var Converter = require(path.resolve(__dirname, '../lib'))

// locals
let fixtures = fs.readdirSync(path.resolve(__dirname, './fixtures'))

// create instances
var converter = new Converter()

fixtures.map(function (filename) {
  fs.readFile(path.resolve(__dirname, './fixtures', filename), 'utf-8', function(err, data) {
    if (err) throw err;
    console.log('filename:' + filename, converter.process(data))
  })
})
