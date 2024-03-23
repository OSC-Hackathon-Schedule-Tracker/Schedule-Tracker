
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const { main } = require("./open.js");


const bot = new Client({ intents: [
    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
]
});


bot.once(Events.ClientReady, readyClient => {
    console.log("Logged in as " + bot.user.tag);
});

bot.on("messageCreate", async (message) => {
    if(message.channel.name == "announcements") {
        const date = "March 23rd";
        const response = await main(message.content, date);
        console.log(response);
    }
});

bot.login(token);