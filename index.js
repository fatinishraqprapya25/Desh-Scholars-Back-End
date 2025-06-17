const express = require("express");
const router = require("./routes");
const notFoundHandler = require("./error/notFoundHandler");
const globalErrorHandler = require("./error/globalErrorHandler");

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(globalErrorHandler);
app.use(notFoundHandler);

module.exports = app;