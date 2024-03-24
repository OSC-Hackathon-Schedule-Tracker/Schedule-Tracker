const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const { getschedule } = require("./schedule");

// Enable CORS for all routes
app.use(cors());

// Route to get schedule
app.get("/getschedule", (req, res) => {
    console.log("getting schedule");
    res.json(getschedule());
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});