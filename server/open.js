const OpenAI = require("openai");
const { apikey } = require("./config.json")
const openai = new OpenAI({ apiKey: apikey});

// api calls are made to openai to analyze an announcement and grab important information
async function main(question) {

    datetime = new Date();
    daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    date = daysOfWeek[datetime.getDay()] + ", " + (parseInt(datetime.getMonth()) + 1) + "/" + datetime.getDate() + "/" + datetime.getFullYear()
    prompt = "Given that the date is " + date + " you are identifying an events from announcements for a schedule," + 
    "give me a description of the event that is less than 10 words and the date and time of the event." + 
    "You should be describing one event. Put your response in this format [event, month/day/year (2 digit numbers), starting time, location (put ~ if not given)] (Do not include the brackets)." + 
    "If the announcement is not describing an upcoming event, respond with \"No Event\". Here is the announcement: "
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt + question }],
      model: "gpt-3.5-turbo",
    });
  
    return completion.choices[0].message.content;
}

// function used for determining if two announcements are referring to the same event
async function sameevent(olddata, newdata) {
    const prompt = "You hear about events from two different people. Determine if they are likely referring to the same event even if there are slight differences in information.\n" +
                   "Answer with a true or false.\nDescription 1: " + olddata + "\nDescription 2: " + newdata;
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
    });
    
    return (completion.choices[0].message.content === "true" || completion.choices[0].message.content === "True");
}

module.exports = { main, sameevent }