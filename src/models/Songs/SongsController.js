const Songs = require("./Songs");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    Songs.find({}, (err, songs) => {
      if (err) throw err;
      return res.json({
        code: 0,
        songs,
      });
    })
});

router.get("/:songs_id", (req, res) => {
    Songs.findById(
    {
      songs: req.params.songs_id,
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

router.post("/", (req, res) => {

    Songs.create(req.body, (err, songs) => {
    if (err) throw err;
    return res.json({
      code: 0,
      songs,
    });
  });
});

module.exports = router;
