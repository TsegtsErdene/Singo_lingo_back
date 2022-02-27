const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //why
  res.send("Hello Amaraa-kun");
});

module.exports = router;
