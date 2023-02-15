require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const { Client, Events, GatewayIntentBits, Guild } = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);

app.get("/", async (req, res) => {
  const guild = await client.guilds.fetch("1058545669058613259");
  const member = await guild.members.fetch("166775206336135168");

  member.send("Hi");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
