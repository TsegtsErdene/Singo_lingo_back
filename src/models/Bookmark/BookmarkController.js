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

router.get('/:user_id', isAuthorized, (req, res) => {
  Bookmark.find({User: req.params.user_id}, (err, bookmark) => {
    if(err) throw err
    return res.json({
      code: 0,
      bookmark
    })
  }).populate(['novel'])
})

router.post("/", isAuthorized, (req, res) => {
  console.log(req.query)
  // Bookmark.findById(req.params.)
  // Bookmark.create(req.body, (err, bookmark) => {
  //   if (err) throw err;
  //   return res.json({
  //     code: 0,
  //     bookmark,
  //   });
  // });
});

module.exports = router;
