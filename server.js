const fs = require("fs");
const moment = require("moment");

const config = JSON.parse(fs.readFileSync("./config.json"));
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const { ready, eventStart } = require('./utils/ready.js');
const { sptc, sptce } = require('./utils/sptc.js');
const channels = require('./data/channel.json');

// client ready => console.log() banner 
client.on('ready', async () => {
    // banner function
    ready();
	// set the users statis
	client.user.setPresence({ activities: [{ name: 's.help' }], status: 'dnd' });
	// check if there is channels already set to be updated
    if (channels.messageID && channels.channelID) {
		let channel = await client.channels.fetch(channels.channelID);
		MESSAGE = await channel.messages.fetch(channels.messageID);
		console.log(`Updating every ${config.data.interval}s...`);
		// if theres messages in a channel then update
		update();
		sptc();
		// no messages in a channel that needs to be updated then log that its awaitng s.start
	} else {
		// event function (tells user that is waiting for s.start)
        eventStart();
		sptce();
	}

});

let MESSAGE;

// constants for enabled components
const component_names = fs.readdirSync('./components/');
const components = new Map();

// load enabled components
component_names.forEach(file_name => {
	if (!file_name.endsWith('.js')) return;

	const file = require(`./components/${file_name}`);

	const component_name = file_name.split('.js').join('');

	if (config.components[component_name])
		components.set(component_name, file);
});

// function for updating the messages in the channels (stats)
async function update() {
	if (!MESSAGE) return console.log('Unable to fetch channel or message.');

	// payload is the stats
	let payload = '';

	// promises in an array 
	const promises = [];

	// for each component update said compoent stat
	components.forEach(component => promises.push(component.update()));

	// valuues of the payloads
	const values = await Promise.all(promises);
	// join the values together and seperate them
	payload = values.join('\n');

	// last updated message (this is for the machine) // still a work in progress
	payload += `\n:timer: **Last Updated:** ${moment().format('MMM Do YY')}`;
	// edit the payload (the timer)
	MESSAGE.edit(payload);
	// update every `x` amount of seconds declared in the config file
	setTimeout(update, config.data.interval * 1000);
}

// take the commands
client.on('messageCreate', async (message) => {
	// checks if the user is a bot 
	if (message.author.bot) return; // if true, it'll ignore the message
	
	// check the message content
	if (message.content === 's.start') { // if theres already a message set return 
		if (channels.messageID) return message.reply("stats has already started.");

		// allow the user to know that its checking to see if the stats are already started
		// more checks
		let msg = await message.channel.send("Updatig stats...");
		channels.messageID = msg.id;
		channels.channelID = msg.channel.id;
		MESSAGE = msg;
		// write the messageID and channelID to this file
		fs.writeFileSync('./data/channel.json', JSON.stringify(channels, null, 2));
		//update
		update();
	}
	// check the message content
	if (message.content === 's.ping') {
		// send message "ping?"
		const msg = await message.channel.send('Ping?')
		// edit the message & provide the ping
		msg.edit(`Pong! Latency is ${Math.round(msg.createdTimestamp - message.createdTimestamp)} ms. API Latency is ${Math.round(client.ws.ping)} ms`)
	}
	// check message content
	if (message.content === 's.help') {
		// this is a discord emebed for the help command
		const help = {
			description: "📕 | Welcome to PC-Statbot!\n\n`s.ping`: Shows the current ping for Computer Infomation.\n`s.start`: Starts the computers statistics\n`s.help`: Shows this message.",
			footer: {
				text: 'Made with ❤️ by Phoenix557',
			},
		}
		// retrun with the embed
		return message.reply({embeds: [help]});
	}
});

// try.. catch for logging into the client.
try {
    // check if the client ID is set (if true => console.log() invite link)
    if (config.clientID) console.log(`Invite Link: https://discord.com/oauth2/authorize?client_id=${config.clientID}&scope=bot&permissions=8`);
    // login into the client
    client.login(config.data.token);
} catch (err) { // log any errors when logging into the client
    console.log(`Error logging in: ${err}`);
} sptc();
client.on("error", (err) => { // On error, log any errors and restart
	console.log('Dicord Client Error:', err);
	client.login(config.data.token);
})
 // more error logging
process.on('unhandledRejection', (err) => { console.log(`Caught Error: ${err}`) });
