const path = require("path");
const fs = require("fs").promises;

const deleteFile = async (filePath) => {
    try {
        const actualPath = path.join(process.cwd(), filePath);
        await fs.unlink(actualPath);
        return true;
    } catch (err) {
        console.log("Error Deleting File: ", err.message);
        return false;
    }
}

module.exports = deleteFile;