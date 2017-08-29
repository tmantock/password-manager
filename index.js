const storage = require('node-persist');
const argv = require('./args');
const crypto = require('./crypto')
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

function search(accountName, key) {
    const accounts = storage.getItemSync('accounts');
    for (let i = 0; i < accounts.length; i++) {
        const encryptedAccount = accounts[i];
        const decryptedAccount = crypto.decrypt(encryptedAccount, key);
        if (decryptedAccount.name === accountName) {
            return {
                account: decryptedAccount,
                index: i,
                status: true
            };
        }
        return {
            status: false
        };

    }
}

function list(key) {
    try {
        const accounts = storage.getItemSync('accounts');
        if (accounts.length > 0) {
            for (let i = 0; i < accounts.length; i++) {
                const encryptedAccount = accounts[i];
                const decryptedAccount = crypto.decrypt(encryptedAccount, key);
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
    } else if (accounts.length) {
        const foundAccount = search(account.name, key);
        if (foundAccount.status === true && foundAccount.account.name === account.name) {
            console.log("This account already exists");
            return;
        }
    }

    const encryptingAccount = crypto.encrypt(account, key);

    accounts.push(encryptingAccount);
    storage.setItemSync('accounts', accounts);

    console.log(`Account ${account.name} was created`);
    return encryptingAccount;
}

function getAccount(accountName, key) {
    try {
        const foundAccount = search(accountName, key);
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
        const accounts = storage.getItemSync('accounts');
        const foundAccount = search(account.name, key);
        if (foundAccount.status === true) {
            const encryptingAccount = crypto.encrypt(account, key);
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
        const accounts = storage.getItemSync('accounts');
        const foundAccount = search(accountName, key);
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
