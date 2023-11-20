const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file.mimetype);
    if (file.mimetype == "audio/wave") {
      cb(null, "records/");
    } else {
      cb(null, "images/");
    }
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    callback(null, true);
  },
});

module.exports = upload;
