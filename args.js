class argvModule {
    constructor() {
        this.argv = require('yargs').command('create', 'Initiate user log', function(yargs) {
            yargs.options({
                masterKey: {
                  demand: true,
                  type: "string",
                  alias: 'm',
                  description: "Master Key to access account"
                },
                name: {
                    demand: true,
                    type: "string",
                    alias: 'n',
                    description: "Name of the account you'd like to store."
                },
                username: {
                    demand: true,
                    type: "string",
                    alias: 'u',
                    description: "Username for the account."
                },
                password: {
                  demand: true,
                  type: "string",
                  alias: 'p',
                  description: "Password for the account."
                }
            }).help('help');
        }).command('list','List out the accounts on record', function (yargs){
          yargs.options({
            masterKey: {
              demand: true,
              type: "string",
              alias: 'm',
              description: "Master Key to access account"
            }
          }).help('help');
        })
        .command('passlog', 'Get appropiate password', function(yargs) {
          yargs.options({
            masterKey: {
              demand: true,
              type: "string",
              alias: 'm',
              description: "Master Key to access account"
            },
            name: {
              demand: true,
              type: "string",
              alias: "n",
              description: "Name of the account you'd like to retrieve."
            }
          }).help('help');
        }).command('update', 'Update the account information', function(yargs) {
          yargs.options({
            masterKey: {
              demand: true,
              type: "string",
              alias: 'm',
              description: "Master Key to access account"
            },
            name: {
                demand: true,
                type: "string",
                alias: 'n',
                description: "Name of the account you'd like to store."
            },
            username: {
                demand: true,
                type: "string",
                alias: 'u',
                description: "Username for the account."
            },
            password: {
              demand: true,
              type: "string",
              alias: 'p',
              description: "Password for the account."
            }
          }).help('help');
        }).command('delete', 'Delete the account from your records', function (yargs){
          yargs.options({
            masterKey: {
              demand: true,
              type: "string",
              alias: 'm',
              description: "Master Key to access account"
            },
            name: {
              demand: true,
              type: "string",
              alias: 'n',
              description: "Name of the account you'd like to retrieve."
            }
          }).help('help');
        }).help('help').argv;
        this.command = this.argv._[0];
        return this.command;
    }

    argument(func) {
      var account = {};
      var key = this.argv.masterKey;
      var accountName = this.argv.name;
      account.name = this.argv.name;
      account.username = this.argv.username;
      account.password = this.argv.password;
      if (this.command === 'create' && typeof this.argv.name !== 'undefined' && typeof this.argv.username !== 'undefined' && typeof this.argv.password !== 'undefined' && typeof this.argv.masterKey !== 'undefined') {
        if(!this.argv.name.trim() && !this.argv.username.trim() && !this.argv.password.trim() && !this.argv.masterKey.trim()){
          console.log("Please enter a valid input.");
        } else {
          func(account, key);
        }

      } else if(this.command === 'passlog' && typeof this.argv.name !== 'undefined' && typeof this.argv.masterKey !== 'undefined'){
        if(!this.argv.name.trim() && !this.argv.masterKey.trim()){
          console.log("Please enter a valid account name.");
        } else {
          func(accountName, key);
        }
      } else if(this.command === 'update' && typeof this.argv.name !== 'undefined' && typeof this.argv.username !== 'undefined' && typeof this.argv.password !== 'undefined' && typeof this.argv.masterKey !== 'undefined') {
        if(!this.argv.name.trim() && !this.argv.username.trim() && !this.argv.password.trim() && !this.argv.masterKey.trim()){
          console.log("Please enter a valid input.");
        } else {
          func(account, key);
        }
      } else if(this.command === 'delete' && typeof this.argv.name !== 'undefined' && typeof this.argv.masterKey !== 'undefined') {
        if(!this.argv.name.trim() && !this.argv.masterKey.trim()){
          console.log("Please enter a valid account name.");
        } else {
          func(accountName, key);
        }
      } else if(this.command === 'list') {
        func(key);
      }
    }
}

module.exports = new argvModule();
