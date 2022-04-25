const express = require("express");
const router = express.Router();

const Bookmark = require("./Bookmark");
const Novel = require('../Novel/Novel')

var {
  isAuthorized
} = require('../../middleware/protect')

// router.get("/", async (req, res) => {
//   await Bookmark.find({})
//     .exec((err, bookmark) => {
//       if (err) throw err;
//       return res.json({
//         code: 0,
//         bookmark,
//       });
//     })
// });

router.get('/bookmarked_books', isAuthorized, (req, res) => {
  let array = Object.values(req.query)
  Novel.find({
    '_id': {
      $in: array }
    }, (err, novels) => {
      if(err) throw err
      return res.json({
        code: 0,
        novels
      })
    })
})

router.post("/", isAuthorized, (req, res) => {
  Bookmark.create(req.body, (err, bookmark) => {
    if (err) throw err;
    return res.json({
      code: 0,
      bookmark,
    });
  });
});

module.exports = router;
