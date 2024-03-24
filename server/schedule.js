var fs = require("fs");
const { sameevent } = require("./open.js")

// checks to see if an event's date has passed so it can be removed from the schedule
function datepassed(event, curdate, curtime) {

    eventdate = event[2].trim();
    eventtime = event[3].trim();
    

    if (eventdate === curdate) {
        if (curtime.indexOf("PM") != -1 && eventtime.indexOf("am" != -1)) {
            return true;
        }
        else if (curtime.indexOf("AM") != -1 && eventtime.indexOf("pm") != -1) {
            return false;
        }
        else {
            curtimecomponents = curtime.split(":");
            eventtimecomponents = eventtime.split(":");
            if (parseInt(curtimecomponents[0]) > parseInt(eventtimecomponents[0])) {
                if (parseInt(curtimecomponents[0]) != 12) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if(parseInt(curtimecomponents[0]) < parseInt(eventtimecomponents[0])) {
                if (parseInt(eventtimecomponents[0]) != 12) {
                    return false;
                }
                return true;
            }
            else if (eventtimecomponents.length > 1) {
                if(parseInt(curtimecomponents[1]) > parseInt(eventtimecomponents[1])) {
                    return true;
                }
            }
        }
    }
    else {
        curdatecomponents = curdate.split("/");
        eventdatecomponents = eventdate.split("/");
        if (parseInt(curdatecomponents[0]) > parseInt(eventdatecomponents[0])) {
            return true;
        }
        else if (parseInt(curdatecomponents[0]) < parseInt(eventdatecomponents[0])) {
            return false;
        }
        else if (parseInt(curdatecomponents[1]) > parseInt(eventdatecomponents[1])) {
            return true;
        }
        else if (parseInt(curdatecomponents[1]) < parseInt(eventdatecomponents[1])) {
            return false;
        }
    }
    return false;
}


// ensures event information is in proper formatting
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

// adds and removes events from schedule when necessary (function is called when the discord bot reads an announcement that is classified as an event)
async function updateschedule(eventinfo, club) {
    events = [];
    data = fs.readFileSync("schedule.txt", "utf-8");
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

    datetime = new Date();
    curdate = datetime.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit"});
    curtime = datetime.toLocaleTimeString("en-US");
    for (let i = 0; i < events.length; i++) {
        info = events[i].split(",");
        if (datepassed(info, curdate, curtime)) {
            events.splice(i, 1);
            i -= 1;
        }
    }

    datastring = events.join("\r\n");
    fs.writeFile("schedule.txt", datastring, (err) => {
        if (err) {
            console.error("./Error", err);
            return;
        }
    });
}

// reads schedule data from a text file and places information in a hashmap
function getschedule() {
    eventmap = {}
    data = fs.readFileSync("schedule.txt", "utf-8");
    events = data.split("\r\n");
    for (let i = 0; i < events.length; i++) {
        info = events[i].split(",");
        club = info.splice(0, 1);
        if (typeof eventmap[club] == "undefined") {
            eventmap[club] = [info.slice()];
        }
        else {
            eventmap[club].push(info.slice());
        }
    }
    return eventmap;
}

module.exports = { updateschedule, getschedule };