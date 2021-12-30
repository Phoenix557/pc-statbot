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
    setTimeout(update, config.interval * 1000);
}

module.exports = { update }