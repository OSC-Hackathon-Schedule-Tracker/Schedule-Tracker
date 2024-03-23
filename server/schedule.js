var fs = require("fs");


function updateschedule(eventinfo) {
    events = [];
    data = fs.readFileSync("Schedule-Tracker/server/sample.txt", "utf-8");
    events = data.split("\r\n");
    console.log(events.length);

    events.push(eventinfo);
    datastring = events.join("\r\n");
    fs.writeFile("Schedule-Tracker/server/sample.txt", datastring, (err) => {
        if (err) {
            console.error("./Error", err);
            return;
        }
    });
}

module.exports = { updateschedule };