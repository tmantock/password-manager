var storage = require('node-persist');
var argv = require('./args');
var crypto = require('crypto-js');
storage.initSync();

if (argv.command === 'list') {
    argv.argument(list);
} else if (argv.command === 'create') {
    argv.argument(createAccount);
} else if (argv.command === 'passlog') {
    argv.argument(getAccount);
} else if (argv.command === 'update') {
    argv.argument(updateAccount);
} else if (argv.command === 'delete') {
    argv.argument(deleteAccount);
} else {
    console.log("Please enter a valid command type --help to see the list of commands.");
}

function encrypt(account, key) {
    try {
        var encryptedMessage = crypto.AES.encrypt(JSON.stringify(account), key).toString();
        return encryptedMessage;
    } catch (e) {
        console.log("Unable to encrypt account.");
    }
}

function decrypt(string, key) {
    try {
        var bytes = crypto.AES.decrypt(string, key);
        var decryptedMessage = JSON.parse(bytes.toString(crypto.enc.Utf8));
        return decryptedMessage;
    } catch (e) {
        console.log("Unable to decrpty account.");
    }
}

function search(accountName, key) {
    let accounts = storage.getItemSync('accounts');
    for (let i = 0; i < accounts.length; i++) {
        var encryptedAccount = accounts[i];
        var decryptedAccount = decrypt(encryptedAccount, key);
        if (decryptedAccount.name === accountName) {
            return {
                account: decryptedAccount,
                index: i,
                status: true
            };
        } else {
            return {
                status: false
            };
        }
    }
}

function list(key) {
    try {
        let accounts = storage.getItemSync('accounts');
        if (accounts.length > 0) {
            for (let i = 0; i < accounts.length; i++) {
                var encryptedAccount = accounts[i];
                var decryptedAccount = decrypt(encryptedAccount, key);
                console.log(`Account Name: ${decryptedAccount.name}`);
            }
        } else {
            console.log("There are no accounts on record");
        }

    } catch (e) {
        console.log("Please check your master password");
    }
}

function createAccount(account, key) {
    let accounts = storage.getItemSync('accounts');
    if (typeof accounts === 'undefined') {
        accounts = [];
    } else if (accounts.length === 0) {

    } else {
        var foundAccount = search(account.name, key);
        if (foundAccount.status === true && foundAccount.account.name === account.name) {
            console.log("This account already exists");
            return;
        }
    }

    var encryptingAccount = encrypt(account, key);

    accounts.push(encryptingAccount);
    storage.setItemSync('accounts', accounts);

    console.log(`Account ${account.name} was created`);
    return encryptingAccount;
}

function getAccount(accountName, key) {
    try {
        var foundAccount = search(accountName, key);
        if (foundAccount.status === true) {
            console.log(foundAccount.account);
            return foundAccount.account;
        } else if (foundAccount.status === false) {
            console.log("This account does not exist");
        }
    } catch (e) {
        console.log("Please check your master password.");
    }
}

function updateAccount(account, key) {
    try {
        let accounts = storage.getItemSync('accounts');
        var foundAccount = search(account.name, key);
        if (foundAccount.status === true) {
            var encryptingAccount = encrypt(account, key);
            accounts.splice(foundAccount.index, 1, encryptingAccount);
            storage.setItemSync('accounts', accounts);
            console.log(`Account ${account.name} was updated.`);
        } else {
            console.log("This account does not exist");
        }
    } catch (e) {
        console.log("Please check your master password");
    }
}

function deleteAccount(accountName, key) {
    try {
        let accounts = storage.getItemSync('accounts');
        var foundAccount = search(accountName, key);
        if (foundAccount.status === true) {
            accounts.splice(foundAccount.index, 1);
            storage.setItemSync('accounts', accounts);
            console.log(`Account ${accountName} was deleted.`);
        } else {
            console.log("This account does not exist");
        }
    } catch (e) {
        console.log("Please check you master password");
    }

}
