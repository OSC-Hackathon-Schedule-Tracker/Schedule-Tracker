const OpenAI = require("openai");
const { apikey } = require("./config.json")
const openai = new OpenAI({ apiKey: apikey});

async function main(question, date) {
    prompt = "Given that the date is " + date + "you are identifying an events from announcements for a schedule, give me a description of the event that is less than 10 words and the date and time of the event. You should be describing one event. Here is the announcement: "
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt + question }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0].message.content);
}

const question = "Good morning @everyone Casual Coding is today! At 5-7! In TURL011! Congrats to the OSC soccer team!! 2 games clean from mercy rule🤭 ⚽ Also as Rebecca mentioned in ⁠school, theres 8 spots left on the study abroad trip to Ghana for a Software Engineering and UX Design Internship (6 weeks, 6 credits)!!";
main(question, "march 23rd ");