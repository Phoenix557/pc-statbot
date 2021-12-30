const nodelogger = require('phx-nodelogger')
const config = require('../config.json');
const data = require('../data/channel.json');

function ready() {
    const logger = new nodelogger();
    logger.phxLogger(
        `PC-Statbot`, // header 
        '500', // headerWidth
        'green', // headerColor
        `Made open-source by Phoenix557`, // body
        'disabled', // backgroundColor
        'red', // borderColor
        'single', // bodyStyle
        false // fullBorders
    )
}

function eventStart() {
    const logger = new nodelogger();
    logger.phxLogger(
        `Events`, // header
        '50', //headerWidth
        'red', //headerColor
        `Listening for s.start!`, // 
        'disabled', // backgroundColor
        'red', // borderColor
        'single', // bodyStyle
        false // fullBorders
    )
}

module.exports = { ready, eventStart }
