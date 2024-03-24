# Schedule-Tracker

Dependencies:
-npm install node.js (https://nodejs.org/en/download)
-npm install openai (https://platform.openai.com/docs/overview)
-npm install discord.js (https://discordjs.guide/#before-you-begin)
-npm install express (https://expressjs.com/)
-npm install cors (https://www.npmjs.com/package/cors)
-react: specifically needs node_modules and package-lock.json in schedule-website (https://react.dev/)

Additional Requirements:
-A discord bot token is required in a config.json in order to run the bot.js file. The rest of the program can be run without bot.js but to have server announcements added to the schedule, bot.js needs to be running. (https://discord.com/developers/applications)
-An api key is required for the calls to openai. (https://platform.openai.com/api-keys)

Running Program:
-run bot.js through the terminal to add events from announcements to schedule.txt
-run communication.js through the terminal before entering "npm start" in the terminal while in the schedule-website directory in order to run the website
