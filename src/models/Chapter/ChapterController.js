const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
var _ = require("lodash");

var Chapter = require("./Chapter");
var Novel = require('../Novel/Novel')
var {
  isAuthorized
} = require('../../middleware/protect')

const wordsPerMinute = 200;

router.get("/recently", (req, res) => {
  Chapter.find({}, '_id title episode duration')
  .sort({
    'created_at': -1
  })
  .limit(10)
  .populate('novel')
  .exec((err, chapters) => {
      if (err) throw err;
      return res.json({
        code: 0,
        chapters,
      });
    }
  );
});

router.get('/novel/:novel_id', (req, res) => {
  Chapter.find({novel: req.params.novel_id}, '_id title episode')
  .exec((err, chapters) => {
    if(err) throw err

    return res.json({
      code: 0,
      chapters
    })
  })
})

router.get("/:chapter_id", isAuthorized, (req, res) => {
  Chapter.findById(req.params.chapter_id, (err, chapter) => {
    if (err) throw err;
    return res.json({
      code: 0,
      chapter,
    });
  }).populate("novel");
});

router.post("/", isAuthorized, (req, res) => {
  Chapter.create(req.body, (err, chapter) => {
    if (err) throw err;

    // let textLength = req.body.content.split(" ").length;
    // if(textLength > 0){
    //   let value = Math.ceil(textLength / wordsPerMinute);

    //   chapter.update({
    //     duration: value
    //   },{
    //     upsert: true,
    //   }, function(err) {
    //     if(err) throw err
    //   })
    // }

    Novel.findById(chapter.novel, (err, novel) => {
      if(err) throw err
      
      Novel.updateOne({id: chapter.novel}, {
        total_chapter: novel.total_chapter + 1
      }, (err) => {
        if(err) throw err
        return json({
          code: 0
        });
      })
    })
  });
});

module.exports = router;
