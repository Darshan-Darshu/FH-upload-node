const express = require('express')
const multer = require("multer");

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/upcoming");
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, file.originalname)
    }
  });
  
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
    res.send("File uploaded successfully.");
  });


module.exports = router