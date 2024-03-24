var fs = require("fs");
const { sameevent } = require("./open.js")

function parse(rawstring) {
    data = rawstring.split(",");
    if (data.length != 4) {
        console.log("improper format")
        return "invalid";
    }
    else {
        eventname = data[0];
        eventdate = data[1];
        eventtime = data[2].toLowerCase();
        eventloca = data[3];
        temp = eventtime;
        if (eventtime.indexOf("-") != -1)
        {
            temp = eventtime.substr(0, eventtime.indexOf("-"))
        }
        if (temp.indexOf("pm") == -1 && temp.indexOf("am") == -1)
            {
                pm = eventtime.indexOf("pm");
                am = eventtime.indexOf("am");

                if (pm) 
                {
                    temp += " pm";
                }
                else if (am) {
                    temp += " am";
                }
                else if ((int)(temp[0]) > 8 && (int)(temp[0]) < 12) {
                    temp += " am";
                }
                else {
                    temp += " pm";
                }
            }
        if (eventloca.indexOf("Location") != -1 || eventloca.indexOf("location") != -1)
        {
            eventloca = "~";
        }
        return eventname + ", " + eventdate + ", " + temp + ", " + eventloca;
    }
}

async function updateschedule(eventinfo, club) {
    events = [];
    data = fs.readFileSync("Schedule-Tracker/server/schedule.txt", "utf-8");
    events = data.split("\r\n");

    parsedinfo = parse(eventinfo)
    repeatevent = false;
    for (let i = 0; i < events.length; i++)
    {
        info = events[i].split(",");
        if (info[0] == club) {
            wassameevent = await sameevent(club + eventinfo, info);
            if (wassameevent){
                repeatevent = true;
            }
        }
    }
    
    if (parsedinfo != "invalid" && !repeatevent) {
        if (events[0] === "") {
            events[0] = club + ", " + parsedinfo;
        }
        else {
            events.push(club + ", " + parsedinfo);
        }
    }

    datastring = events.join("\r\n");
    fs.writeFile("Schedule-Tracker/server/schedule.txt", datastring, (err) => {
        if (err) {
            console.error("./Error", err);
            return;
        }
    });
}

module.exports = { updateschedule };