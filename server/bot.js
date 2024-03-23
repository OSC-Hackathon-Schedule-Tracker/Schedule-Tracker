
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");


const bot = new Client({ intents: [
    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
]
});


bot.once(Events.ClientReady, readyClient => {
    console.log("Logged in as ${bot.user.tag}");
});

bot.on("messageCreate", message => {
    if(message.channel.name == "announcements") {
        console.log(message.content);
    }
});

bot.login(token);