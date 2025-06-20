const express = require("express");
const router = require("./routes");
const cors = require("cors");
const path = require("path");
const notFoundHandler = require("./error/notFoundHandler");
const globalErrorHandler = require("./error/globalErrorHandler");

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.static(path.join(__dirname, "uploads")))
app.use("/api", router);
app.use(globalErrorHandler);
app.use(notFoundHandler);

module.exports = app;