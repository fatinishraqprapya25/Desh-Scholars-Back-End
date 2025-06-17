const mongoose = require("mongoose");
const config = require("./config");
const app = require("./index");

let server;

const handleShutdown = async (signal) => {
    console.log(`💥 ${signal} received! Shutting down gracefully...`);
    try {
        if (server) {
            await server.close();
            console.log("Closed all connections.");
        } else {
            console.log("server is not initialized!");
        }

        await mongoose.disconnect();
        console.log("Disconnected from database.");
        process.exit(0);
    } catch (err) {
        console.error("Error during shutdown:", err);
        process.exit(1);
    }
};

const main = async () => {
    try {
        const { port, mongoConnectionString } = config;
        await mongoose.connect(mongoConnectionString);
        server = app.listen(port, () => {
            console.log(`🚀 Server listening at port ${port}`);
        });
    } catch (err) {
        console.error("❌ Error connecting to database:", err.message);
        process.exit(1);
    }
};

main();

process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception: ", err.message);
    handleShutdown("Uncaught Exception");
});

process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Rejection: ", err.message);
    handleShutdown("Unhandled Rejection");
});