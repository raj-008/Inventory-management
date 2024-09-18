const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/profile");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});
const upload = multer({ storage: storage });

module.exports = { upload };
