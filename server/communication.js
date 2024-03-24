const express = require("express");
const app = express();
const { getschedule } = require("./schedule");

// needs frontend connection to finish testing
app.get("/getschedule", (req, res) => {
    console.log("getting schedule");
    res.json(getschedule());
});


const PORT = 3002;
app.listen(PORT, () => {
    console.log("Server is running on port 3002");
});