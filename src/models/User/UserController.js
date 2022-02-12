const express = require("express");
const router = express.Router();
const User = require("./User");
const Bookmark = require("../Bookmark/Bookmark");

router.get("/all", async (req, res) => {
  User.find({}, (err, category) => {
    if (err) throw err;

    return res.json({
      code: 0,
      category,
    });
  });
});

router.get("/:user_id", (req, res) => {
  User.findById(req.params.user_id, (err, category) => {
    if (err) throw err;
    return res.json({
      code: 0,
      category,
    });
  });
});

router.post("/", async (req, res) => {
  //   req.assert("username", "Username cannot be empty").notEmpty();

  //   const errors = req.validationErrors();

  //   if (errors) {
  //     return res.json({
  //       code: 1,
  //       errors,
  //     });
  //   }

  User.create(req.body, (err, user) => {
    if (err) throw err;
    return res.json({
      code: 0,
      user,
    });
  });
});

router.delete("/:user_id", (req, res) => {
  User.findByIdAndDelete(req.params.user_id, (err) => {
    if (err) throw err;
    return res.json({
      code: 0,
    });
  });
});

router.put("/:user_id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.user_id, req.body);
});
module.exports = router;
