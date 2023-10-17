const User_Signed_Songs = require("./User_Singed_Songs");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    User_Signed_Songs.find({}, (err, user_singed_songs) => {
      if (err) throw err;
      return res.json({
        code: 0,
        user_singed_songs,
      });
    })
});

router.get("/:user_singed_songs_id", (req, res) => {
    User_Signed_Songs.findById(
    {
        user_singed_songs: req.params.user_singed_songs_id,
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

    User_Signed_Songs.create(req.body, (err, user_singed_songs) => {
    if (err) throw err;
    return res.json({
      code: 0,
      user_singed_songs,
    });
  });
});

module.exports = router;
