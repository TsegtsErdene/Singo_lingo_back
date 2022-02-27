//Location CRUD
const express = require("express");
const router = express.Router();
const Category = require("./Category");
const Post = require("../post/Post");

router.get("/", (req, res) => {
  const limit = 10;
  const { page = 1, search_value } = req.query;

  let query = {};

  if (search_value) {
    Object.assign(query, {
      title: new RegExp("^" + search_value + ".*", "i"),
    });
  }

  Category.paginate(query, { limit, page }, (err, category) => {
    if (err) throw err;

    return res.json({
      code: 0,
      category,
    });
  });
});

router.get("/all", (req, res) => {
  Category.find({}, (err, category) => {
    if (err) throw err;

    return res.json({
      code: 0,
      category,
    });
  });
});

router.get("/:category_id", (req, res) => {
  Category.findById(req.params.category_id, (err, category) => {
    if (err) throw err;
    return res.json({
      code: 0,
      category,
    });
  });
});

router.delete("/:category_id", (req, res) => {
  Post.find({ category: req.params.category_id }, (err, posts) => {
    if (err) throw err;

    if (posts.length == 0) {
      Category.findByIdAndDelete(req.params.category_id, (err) => {
        if (err) throw err;
        return res.json({
          code: 0,
        });
      });
    }

    return res.json({
      code: 1,
    });
  });
});

router.post("/", (req, res) => {
  req.assert("title", "Title cannot be empty").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.json({
      code: 1,
      errors,
    });
  }

  Category.create(req.body, (err, category) => {
    if (err) throw err;
    return res.json({
      code: 0,
      category,
    });
  });
});

router.put("/:category_id", (req, res, next) => {
  Category.findByIdAndUpdate(
    req.params.category_id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
    (err, category) => {
      if (err) throw err;

      return res.json({
        code: 0,
        category,
      });
    }
  );
});

module.exports = router;
