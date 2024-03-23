const OpenAI = require("openai");
const { apikey } = require("./config.json")
const openai = new OpenAI({ apiKey: apikey});

async function main(question, date) {
    prompt = "Given that the date is " + date + "you are identifying an events from announcements for a schedule," + 
    "give me a description of the event that is less than 10 words and the date and time of the event." + 
    "You should be describing one event. Put your response in this format [event, date, starting time, location (put ~ if not given)]." + 
    "If the announcement is not describing an upcoming event, respond with \"No Event\". Here is the announcement: "
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt + question }],
      model: "gpt-3.5-turbo",
    });
  
    return completion.choices[0].message.content;
}

module.exports = { main }