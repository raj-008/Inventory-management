const fs = require("fs");
const path = require("path");

module.exports = (filePath) => {
  const fullFilePath = path.join(__dirname, "../public") + filePath;
  if (fullFilePath && fs.existsSync(fullFilePath)) {
    fs.unlinkSync(fullFilePath);
  }
};
