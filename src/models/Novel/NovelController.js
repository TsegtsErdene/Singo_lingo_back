const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

const Novel = require("./Novel");

router.get("/", (req, res) => {
  Novel.find({}, (err, novels) => {
    if (err) throw err;

    return res.json({
      code: 0,
      novels,
    });
  }).populate(['categories']);
});

router.get("/:novel_id", (req, res) => {
  Novel.findOne({_id: req.params.novel_id}, (err, novel) => {
    if (err) throw err;
    
    return res.json({
      code: 0,
      novel,
    });
  }).populate(['categories'])
});

router.post("/", (req, res) => {
  Novel.create(req.body, (err, novel) => {
    if (err) throw err;
    return res.json({
      code: 0,
      novel,
    });
  });
});

module.exports = router;
