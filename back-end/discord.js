require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);

const guildID = "1058545669058613259";

async function sendDM(memberId, text) {
  try {
    const guild = await client.guilds.fetch(guildID);
    const member = await guild.members.fetch(memberId);
    console.log(memberId);
    await member.send(text);
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendDM;
