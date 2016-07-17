# password-manager
A localhost Node JS password manager.

This password manager allows the user to store their accounts (username and passwords) locally in an encrypted file.

The terminal (Mac or Linux) or the command line (Windows) is the main interface for this application.

To get started, please make sure that you have the latest version of Node JS and npm installed, since this application uses ES6 features. To install or update Node JS please go to the Node JS [website](https://nodejs.org/en/).

After Node JS has been properly installed, go ahead an download the files from this repository by either using the git clone method or downloading the zip file.

Once the files have been installed, go ahead and use the terminal or command line to navigate to the folder. To see a full tutorial of using the terminal or command line please go to this [website](http://cli.learncodethehardway.org/book/).

Once you are in the proper directory, it should be in the password-manager folder if you opted for the git clone method, go ahead and run the following command:

`npm install `

This command will install all the dependencies in the package.json file. You will see a new folder called node_modules appear in the password-manager folder. These modules are necessary for the password manager to function.

Now to start using the application, you will have to type the following commands for what you want.

#### Please make sure to keep track of your master password. It's your key to the castle.

The password manager keeps all your files on record on a local file within a newly created folder called persist. Don't worry, this file will be located within the password-manager directory. All of the accounts within this file are encrypted and require your masterpassword to decrypt them.

### Make sure to only have one master password.

To create a new account enter the following command:

`node index.js create -m masterpassword -n nameOfAccount -u usernameforAccount -p passwordforAccount`

To see the information for an account enter the following command:

`node index.js passlog -m masterpassword -n nameOfAccount`

To update the contents of an account, enter the following command:

`node index.js update -m masterpassword -n nameOfAccount -u usernameforAccount -p passwordforAccount`

To delete an account, enter the following command:

`node index.js delete -m masterpassword -n nameOfAccount`

To list all the accounts you have on record, enter the following command:

`node index.js list -m masterpassword`

Please try it out, hopefully it can provide a solution for your password needs.
