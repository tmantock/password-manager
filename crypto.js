const cryptoJs = require('crypto-js');

module.exports = {
    decrypt: decrypt,
    encrypt: encrypt
}

function encrypt(text, key) {
    try {
        const encryptedMessage = cryptoJs.AES.encrypt(JSON.stringify(text), key).toString();
        return encryptedMessage;
    } catch (e) {
        throw new Error("Unable to encrypt account.");
    }
}

function decrypt(text, key) {
    try {
        const bytes = cryptoJs.AES.decrypt(text, key);
        const decryptedMessage = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
        return decryptedMessage;
    } catch (e) {
        throw new Error("Unable to decrypt account.");
    }
}
