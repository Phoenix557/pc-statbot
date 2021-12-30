const fs = require("fs");
const moment = require("moment");

const config = JSON.parse(fs.readFileSync("./config.json"));
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const { ready, eventStart } = require('./utils/ready.js');
const { sptc } = require('./utils/sptc.js');
// const { update } = require('./utils/update.js');
const channels = require('./data/channel.json');

// client ready => console.log() banner 
client.on('ready', async () => {
    // banner function
    ready();

	client.user.setPresence({ activity: { name: 'made with ❤️ by Phoenix557 | s.help' }, status: 'dnd' });

    if (channels.messageID && channels.channelID) {
		let channel = await client.channels.fetch(channels.channelID);
		MESSAGE = await channel.messages.fetch(channels.messageID);
		console.log(`Updating every ${config.data.interval}s...`);
		update();
	} else {
		// event function (tells user that is waiting for s.start)
        eventStart();
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

async function update() {
	if (!MESSAGE) return console.log('Unable to fetch channel or message.');

	let payload = '';

	const promises = [];
	components.forEach(component => promises.push(component.update()));

	const values = await Promise.all(promises);
	payload = values.join('\n');

	// ${moment().format("hh:mm:ss A DD-MM-YYYY").fromNow()}
	payload += `\n:timer: **Last Updated:** ${moment().format('MMM Do YY')}`;
	MESSAGE.edit(payload);
	setTimeout(update, config.data.interval * 1000);
}


client.on('messageCreate', async (message) => {
	if (message.author.bot) return;
	if (message.content === 's.start') {
		if (channels.messageID) return message.reply("stats has already started.");

		let msg = await message.channel.send("Updatig stats...");
		channels.messageID = msg.id;
		channels.channelID = msg.channel.id;
		MESSAGE = msg;
		fs.writeFileSync('./data/channel.json', JSON.stringify(channels, null, 2));
		update();
	}
	if (message.content === 's.ping') {
		const msg = await message.channel.send('Ping?')
		msg.edit(`Pong! Latency is ${Math.round(msg.createdTimestamp - message.createdTimestamp)} ms. API Latency is ${Math.round(client.ws.ping)} ms`)
	}
	if (message.content === 's.help') {
		const help = {
			description: "📕 | Welcome to Computer Infomation!\n\n`s.ping`: Shows the current ping for Computer Infomation.\n`s.start`: Starts the computer information for Phoenix#8033's computer.\n`s.help`: Shows this message."
		}
		return message.channel.send({embed: help});
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
