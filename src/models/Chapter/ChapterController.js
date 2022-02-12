const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
var _ = require("lodash");

var Chapter = require("./Chapter");
var ReadingChapter = require("./ReadingChapter");

router.get("/", (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  Chapter.paginate(
    {},
    {
      limit,
      page,
      populate: "novel",
    },
    (err, chapter) => {
      if (err) throw err;
      return res.json({
        code: 0,
        chapter,
      });
    }
  );
});

router.get("/:chapter_id", (req, res) => {
  Chapter.findById(req.params.chapter_id, (err, chapter) => {
    if (err) throw err;
    return res.json({
      code: 0,
      chapter,
    });
  }).populate("novel");
});

router.post("/", (req, res) => {
  req.assert("title", "Title cannot be empty").notEmpty();
  req.assert("chapter", "Chapter cannot be empty").notEmpty();
  req.assert("content", "Content cannot be empty").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.json({
      code: 1,
      errors,
    });
  }

  Chapter.create(req.body, (err, chapter) => {
    if (err) throw err;
    return json({
      code: 0,
      chapter,
    });
  });
});

router.post("/reading", (req, res) => {
  ReadingChapter.find({ user: id }, (err, read) => {
    if (err) throw err;

    if (read.length != 0) {
      ReadingChapter.findByIdAndUpdate(
        read[0]._id,
        {
          reading: false,
        },
        (err, read) => {
          if (err) throw err;
        }
      );
    }

    ReadingChapter.create(
      {
        chapter: id,
        user: id,
      },
      (err, read) => {
        if (err) throw err;
        return json({
          code: 0,
        });
      }
    );
  });
});

module.exports = router;
