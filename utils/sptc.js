const { ready } = require('./ready.js')


function sptc() {
    setTimeout(() => {
        setInterval(function () {ready()}, 60000);
    }, 10000)
}

module.exports = { sptc }