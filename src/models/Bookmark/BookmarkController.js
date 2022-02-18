const Bookmark = require("./Bookmark");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  await Bookmark.find(
    {
      user: req.params.id,
    },
    (err, bookmark) => {
      if (err) throw err;
      return res.json({
        code: 0,
        bookmark,
      });
    }
  );
});

router.post("/", (req, res) => {
  Bookmark.create(req.body, (err, bookmark) => {
    if (err) throw err;
    return res.json({
      code: 0,
      bookmark,
    });
  });
});

module.exports = router;
