const Category = require("./Category");
const express = require("express");
const router = express.Router();

var {
  isAuthorized
} = require('../../middleware/protect')

router.get("/", (req, res) => {
  Category.find({}, (err, categories) => {
      if (err) throw err;
      return res.json({
        code: 0,
        categories,
      });
    })
});

router.get("/:category_id", (req, res) => {
  Category.findById(
    {
      category: req.params.category_id,
    },
    (err, novel) => {
      if (err) throw err;
      return res.json({
        code: 0,
        novel,
      });
    }
  );
});

router.post("/", isAuthorized, (req, res) => {
  // req.assert("title", "Title is not empty").notEmpty();

  // const errors = req.validationErrors();

  // if (errors) {
  //   return res.json({
  //     code: 1,
  //     errors,
  //   });
  // }

  Category.create(req.body, (err, category) => {
    if (err) throw err;
    return res.json({
      code: 0,
      category,
    });
  });
});

module.exports = router;
