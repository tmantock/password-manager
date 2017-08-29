const ava = require('ava')
const crypto = require('./crypto')

ava.test('encrypt() should take and return strings', (t) => {
    const text = crypto.encrypt('testText', 'testKey')
    t.is(typeof text, 'string')
    t.not('testText')
})

ava.test('encrypt() should throw an error when passed a non-string key', (t) => {
    t.throws(() => {
        crypto.encrypt('testText')
    })
})

ava.test('decrypt() should reverse a string that was encrypted', (t) => {
    const text = crypto.encrypt('testText', 'testKey')
    t.is(crypto.decrypt(text, 'testKey'), 'testText')
})

ava.test('decrypt() should throw an error when passed a bad key', (t) => {
    t.throws(() => {
        crypto.decrypt('testText', 'badKey')
    })
})

ava.test('decrypt() should throw an error when passed a non-string key', (t) => {
    t.throws(() => {
        crypto.decrypt('testText')
    })
})
