const express = require("express");
const cors = require("cors");
const app = express();
const { getschedule } = require("./schedule");

app.use(cors());

// Route to get schedule
app.get("/getschedule", (req, res) => {
    console.log("getting schedule");
    res.json(getschedule());
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});