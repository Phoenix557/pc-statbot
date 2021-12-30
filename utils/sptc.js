const { ready, eventStart } = require('./ready.js')

function sptc() {
    setTimeout(() => {
        setInterval(function () {ready()}, 60000);
    }, 10000)
}

function sptce() {
    setTimeout(() => {
        setInterval(function () {eventStart()}, 60000)
    }, 10000)
}

module.exports = { sptc, sptce}