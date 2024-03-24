const express = require("express");
const app = express();
const { getschedule } = require("./schedule");

// needs frontend connection to finish testing
app.get("/getschedule", (req, res) => {
    res.json(getschedule());
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});