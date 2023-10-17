const Reels = require("./Reels");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    Reels.find({}, (err, reels) => {
      if (err) throw err;
      return res.json({
        code: 0,
        reels,
      });
    })
});

router.get("/:reels_id", (req, res) => {
    Reels.findById(
    {
      reels: req.params.reels_id,
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

    Reels.create(req.body, (err, reels) => {
    if (err) throw err;
    return res.json({
      code: 0,
      reels,
    });
  });
});

module.exports = router;
