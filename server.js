const express = require("express");
const dotenv = require("dotenv").config();
const path = require('path');
const eventsRouter = require("./routers/events");
const routeNotFoundMiddleware = require("./middlewares/routeNotFound");
const errorsFormatterMiddleware = require("./middlewares/errorsFormatter");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use("/events", eventsRouter);

app.use(errorsFormatterMiddleware);

app.use(routeNotFoundMiddleware);

app.listen(process.env.Port || 3000, () => {
    console.log(`App running on port http://localhost:${process.env.PORT}`)
})