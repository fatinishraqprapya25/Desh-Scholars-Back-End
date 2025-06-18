const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
    port: process.env.SERVER_PORT,
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
    jwtSecret: process.env.JWT_SECRET,
    bcryptSaltRound: process.env.BCRYPT_SALT_ROUNDS
}

module.exports = config;