const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

const Novel = require("./Novel");
const Categoty = require("../Category/Category")

router.get("/", (req, res) => {
  Novel.find({}, (err, novels) => {
    if (err) throw err;

    return res.json({
      code: 0,
      novels,
    });
  }).populate(['categories']);
});

router.get("/popular", (req, res) => {
  Novel.find({})
  .sort({
    'total_views': -1
  }).limit(6)
  .populate(['categories'])
  .exec((err, novels) => {
    if (err) throw err;

    return res.json({
      code: 0,
      novels,
    });
  });
});

router.get("/filter", (req, res) => {
  if(req.query[0] == "ALL"){
    return Novel.find({}, (err, novels) => {
      if(err) throw err
      
      return res.json({
        code: 0,
        novels
      })
    })
  }

  Categoty.find({ title: req.query[0] }, (err, category) => {
    if(err) throw err;

    Novel.find({ 'categories': category[0]._id }, (err, novels) => {
      if(err) throw err;

      return res.json({
        code: 0,
        novels
      })
    })
  })
  
})

router.get('/search', (req, res) => {
  Novel.find({ title: new RegExp(req.query[0], "i") }, (err, novels) => {
    if(err) throw err
    return res.json({
      code: 0,
      novels
    })
  })
})

router.get("/:novel_id", (req, res) => {
  Novel.findOne({_id: req.params.novel_id}, (err, novel) => {
    if (err) throw err;
    
    let views = novel.total_views

    novel.update({
      total_views: views + 1
    },{
      upsert: true,
    }, function(err) {
      if(err) throw err
    })

    return res.json({
      code: 0,
      novel,
    });
  }).populate(['categories'])
});

router.post("/", (req, res) => {
  Novel.create(req.body, (err, novel) => {
    if (err) throw err;
    return res.json({
      code: 0,
      novel,
    });
  });
});

module.exports = router;
