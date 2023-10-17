const Artist = require("./Artist");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Artist.find({}, (err, artists) => {
      if (err) throw err;
      return res.json({
        code: 0,
        artists,
      });
    })
});

router.get("/:artist_id", (req, res) => {
    Artist.findById(
    {
      artist: req.params.artist_id,
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

  Artist.create(req.body, (err, artist) => {
    if (err) throw err;
    return res.json({
      code: 0,
      artist,
    });
  });
});

module.exports = router;
