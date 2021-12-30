<h1 align="center">PC-Statbot</h1>
<h3 align="center">
    Get & track the stats of you machine all in a Discord bot!
</h3>
<h5 align="center">Orginally private-soruce, made open-soruce by Phoenix557 <3</h5>
<br>
</br>

<h1 align="center">Setup</h1>
<h4 align="center">Make sure to rename <code> config-example.json </code> to <code> config.json</code>!</h4>

<div align="center">
    <p>Before running, run <code>npm install</code></p>
</div>
<pre>
<code>
{
  "data": {
    "token": "",
    "clientID": "",
    "interval": 1
  },
  "components": {
    "battery": true,
    "cpuUsage": true,
    "memoryUsage": true
  }
}
</code>
</pre>
<div align="center">
    <p><code>Interval</code> is the amount of seconds that you want the stats to update</p>
    <p>Change the <code>components</code> to true or false, depending on what stats you want to display.</p>
<br></br>
</div>
<div algin ="center">
<h3 align="center">Get your Discord bot token <a href="https://discord.com/developers/applications">here</a></h3>

<br></br>

<h1 align="center">Discord Developer Portal</h1>
<div align="center">
    <img src="https://cdn.discordapp.com/attachments/882773640792383578/926215802259140729/unknown.png">
    <p>Copy the token and paste it in the <code>token</code> part of the config</p>
<br>
    <img src="https://cdn.discordapp.com/attachments/882773640792383578/926225894794756187/unknown.png">
    <p>Copy the client ID and paste it in the <code>clientID</code> part of the config</p>
</br>
</div>