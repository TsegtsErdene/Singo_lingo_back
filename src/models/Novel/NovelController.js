const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const ErrorHandler = require('../../utils/errorHandler')

const Novel = require("./Novel");
const Categoty = require("../Category/Category")
const Chapter = require("../Chapter/Chapter")

var {
  isAuthorized
} = require('../../middleware/protect')

router.get("/", (req, res) => {
  Novel.find({}, (err, novels) => {
    if (err) throw err;

    return res.json({
      code: 0,
      novels,
    });
  }).populate(['categories']);
});

router.get("/firstChapter", async (req, res) => {
  const firstChapter = await Chapter.findOne({novel: req.query[0], episode: 1})

  if(firstChapter == null){
    return res.json({
      code: 1,
      content: "Одоогоор бүлэг нэмэгдээгүй байна."
    })
  }
    
  return res.json({
    code: 0,
    firstChapter
  })
});

router.get("/popular", (req, res) => {
  Novel.find({}, '_id title cover_url')
  .sort({
    'total_views': -1
  }).limit(6)
  .exec((err, novels) => {
    if (err) throw err;

    return res.json({
      code: 0,
      novels,
    });
  });
});

router.get("/filter", (req, res) => {
  const limit = 10
  const { page = 1, search_value } = req.query

  if(search_value == "ALL"){
    Novel.paginate({}, {limit, page}, (err, novels) => {
      if(err) throw err

      return res.json({
        code: 0,
        novels
      })
    })
  } else {
    Categoty.find({ title: search_value }, (err, category) => {
      if(err) throw err;
  
      Novel.paginate({ categories: category[0]._id }, {limit, page}, (err, novels) => {
        if(err) throw err;
  
        return res.json({
          code: 0,
          novels
        })
      })
    })
  }
})

router.get('/search', (req, res) => {
  const limit = 10
  const { search_value, page = 1 } = req.query

  const query = {}

  if(search_value){
    Object.assign(query, {
      'title': new RegExp('^' + search_value +'.*', 'i')
    })
  }

  Novel.paginate(query, {limit, page}, (err, novels) => {
    if(err) throw err
    // console.log(novels)
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
