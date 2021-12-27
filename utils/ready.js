const Discord = require('discord.js');
const nodelogger = require('hyperz-nodelogger')

function ready() {
    const logger = new nodelogger()
    // Entries: header, headerWidth, headerColor, body, backgroundColor, borderColor, borderStyle, fullBorders
    logger.hypelogger(`PC-Statbot`, '500', 'green', `Made open-source by Phoenix557`, 'disabled', 'red', 'single', false)
}

module.exports = { ready }
