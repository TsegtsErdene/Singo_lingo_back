const express = require("express");
const router = express.Router();

const Bookmark = require("./Bookmark");
const Novel = require('../Novel/Novel')

var {
  isAuthorized
} = require('../../middleware/protect');
const { verify } = require("jsonwebtoken");

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

router.get('/user/:user_id', (req, res) => {
  const limit = 10
  const { page = 1 } = req.query

  Bookmark.paginate({user: req.params.user_id}, {limit, page, populate: ['novel']}, (err, bookmarks) => {
    if(err) throw err
    
    return res.json({
      code: 0,
      bookmarks
    })
  })
})

router.get('/novel', (req, res) => {
  const { user, novel } = req.query

  Bookmark.findOne({user: user}, (err, bookmark) => {
    if(err) throw err

    if(bookmark != null){
      const value = bookmark.novel.find(mark => mark == novel)

      return res.json({
        code: 0,
        value
      })
    } else {
      return res.json({
        code: 0,
        value: null
      })
    }
  })
})

router.post("/", (req, res) => {
  const { user_id, novel_id } = req.body.params
  // console.log(`${user_id} --- ${novel_id}`)
  Bookmark.findOne({user: user_id}, async (err, bookmark) => {
    if(err) throw err

    if(bookmark == null){
      Bookmark.create({
        user: user_id,
        novel: novel_id
      }, (err, bookmark) => {
        if(err) throw err

        return res.json({
          code: 0,
          bookmark
        })
      })
    } else {
      const value = await bookmark.novel.find(mark => mark == novel_id)

      if(value == null){
        Bookmark.updateOne({user: user_id}, {
          "$push": { novel: novel_id }
        }, { "new": true, "upsert": true }, (err, bookmark) => {
          if(err) throw err

          return res.json({
            code: 0,
            bookmark,
            value
          })
        })
      } else {
        Bookmark.updateOne({user: user_id}, {
          "$pull": { novel: value }
        }, { "new": true, "upsert": true }, (err, bookmark) => {
          if(err) throw err
          
          return res.json({
            code: 0,
            bookmark,
            value
          })
        })
      }
    }
  })
});

module.exports = router;
