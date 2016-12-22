// require dependencies
var fs = require('fs')
var path = require('path')
var Converter = require(path.resolve(__dirname, '../lib'))

describe('SCSS to LESS converter', function() {
  let fixtures, converter

  function getName(file) {
    return file.split('.')[0]
  }

  function runTest(name, fixtureFile, expectedFile) {
    let convert = new Promise(function(resolve, reject) {
      fs.readFile(fixtureFile, 'utf-8', function(err, data) {
        if (err) reject(err);
        resolve(converter.process(data, { fileInfo: { filename: fixtureFile } }))
      })
    })

    let expected = new Promise(function(resolve, reject) {
      fs.readFile(expectedFile, 'utf-8', function(err, data) {
        if (err) reject(err);
        resolve(data);
      })
    })

    it('should convert "' + name + '"', function (done) {
      var test = function(values) {
        expect(values[0]).toEqual(values[1])
        done()
      }

      var error = function(err) {
        fail(err)
      }

      Promise.all([convert, expected]).then(test).catch(error)
    })
  }

  // locals
  fixtures = fs.readdirSync(path.resolve(__dirname, './fixtures'))

  // create instances
  converter = new Converter()

  fixtures.map(function (file) {
    let filename = getName(file)
    runTest(filename, path.resolve(__dirname, './fixtures', file), path.resolve(__dirname, './expected', filename + '.less'))
  })
})
