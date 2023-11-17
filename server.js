const express = require("express");
const dotenv = require("dotenv").config();
const eventsRouter = require("./routers/events");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("LE MIE API");
});

app.use("/events", eventsRouter);

app.listen(process.env.Port || 3000, () => {
    console.log(`App running on port http://localhost:${process.env.PORT}`)
})