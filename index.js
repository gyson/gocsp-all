
module.exports = all

var thunk = require('gocsp-thunk')

/*
    all([
        cb => fs.readFile(),
        cb => fs.writeFile()
    ])

    all({
        a: cb => fs.readFile(),
        b: cb => fs.readFile()
    })
*/
function all(list) {
    if (!Array.isArray(list)) {
        throw new TypeError('Must be an Array')
    }
    return thunk(function (cb) {
        var finish = false
        var result = []
        var length = list.length
        list.forEach(function (item, index) {
            if (item && typeof item.then === 'function') {
                item = thunk.from(item)
            }
            if (typeof item === 'function') {
                if (!thunk.isThunk(item)) {
                    item = thunk(item)
                }
                item(function (err, val) {
                    if (err) {
                        cb(err)
                    } else {
                        length -= 1
                        result[index] = val
                        if (length === 0) {
                            cb(null, result)
                        }
                    }
                })
                return
            }
            throw new TypeError('Must be promise or thunk')
        })
    })
}
