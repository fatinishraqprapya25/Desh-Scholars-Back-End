const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
    port: process.env.SERVER_PORT,
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
}

module.exports = config;