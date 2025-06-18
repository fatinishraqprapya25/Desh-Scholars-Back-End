const express = require("express");
const router = require("./routes");
const cors = require("cors");
const notFoundHandler = require("./error/notFoundHandler");
const globalErrorHandler = require("./error/globalErrorHandler");

const app = express();
app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use("/api", router);
app.use(globalErrorHandler);
app.use(notFoundHandler);

module.exports = app;