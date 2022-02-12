const Category = require("./Category");
const Novel = require("../Novel/Novel");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Category.find({}, (err, category) => {
    if (err) throw err;
    return res.json({
      code: 0,
      category,
    });
  });
});

router.get("/:category_id", (req, res) => {
  Novel.find(
    {
      category: req.params.category_id,
    },
    (err, novel) => {
      if (err) throw err;
      res.json({
        code: 0,
        novel,
      });
    }
  );
});

router.post("/", (req, res) => {
  req.assert("title", "Title is not empty").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.json({
      code: 1,
      errors,
    });
  }

  Category.create(req.body, (err, category) => {
    if (err) throw err;
    res.json({
      code: 0,
      category,
    });
  });
});

module.export = router;
