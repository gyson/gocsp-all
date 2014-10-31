
var all = require('..')
var thunk = require('gocsp-thunk')

var thunk_0 = thunk(function (cb) { cb(null, 0) })
var thunk_1 = thunk(function (cb) { cb(null, 1) })
var promise = new Promise(function (resolve) { resolve(2) })
var callback = function (cb) { cb(null, 3) }

exports['all'] = function (done) {
    all([
        thunk_0,
        thunk_1,
        promise,
        callback
    ])(function (err, val) {
        console.log(val) // => [ 0, 1, 2, 3 ]
        done()
    })
}
