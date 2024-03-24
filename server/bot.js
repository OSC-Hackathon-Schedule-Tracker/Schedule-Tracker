
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const { main } = require("./open.js");
const { updateschedule } = require("./schedule.js");


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

// bot checks all messages sent in announcements to see if any are referring to events
bot.on("messageCreate", async (message) => {
    if(message.channel.name == "announcements") {
        let response = await main(message.content);
        if (response.indexOf("[") != -1) {
            response = response.split("[").join("");
            response = response.split("]").join("");
        }
        if (response != "No Event") {
            await updateschedule(response, message.guild.name);
        }
        else {
            console.log("No Event");
        }
    }
});

bot.login(token);