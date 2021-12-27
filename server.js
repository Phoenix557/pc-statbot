const fs = require("fs");

const config = JSON.parse(fs.readFileSync("./config.json"));
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { ready } = require('./utils/ready.js')

// client ready => console.log() banner 
client.on('ready', () => {
    // banner function
    ready()
});


// try.. catch for logging into the client.
try {
    // check if the client ID is set (if true => console.log() invite link)
    if (config.clientID) console.log(`Invite Link: https://discord.com/oauth2/authorize?client_id=${config.clientID}&scope=bot&permissions=8`)
    // login into the client
    client.login(config.data.token)
} catch (err) { // log any errors when logging into the client
    console.log(`Error logging in: ${err}`)
}
client.on("error", (err) => { // On error, log any errors and restart
	console.log('Dicord Client Error:', err);
	client.login(config.data.token);
})
 // more error logging
process.on('unhandledRejection', (err) => { console.log(`Caught Error: ${err}`) })
