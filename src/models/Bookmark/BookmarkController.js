const Bookmark = require("./Bookmark");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  await Bookmark.find(
    {
      user: req.params.id,
    },
    (err, bookmark) => {
      if (err) throw err;
      return res.json({
        code: 0,
        bookmark,
      });
    }
  );
});

router.post("/", (req, res) => {
  Bookmark.create(req.body, (err, bookmark) => {
    if (err) throw err;
    return res.json({
      code: 0,
      bookmark,
    });
  });
});

// router.get("/:id", (req, res) => {});

// router.post("/", async (req, res) => {
//   const subscriber = new Subscriber({
//     name: req.body.name,
//     subscriberToChannel: req.body.subscriberToChannel,
//   });

//   try {
//     const newSubscriber = await subscriber.save();
//     res.status(201).json(newSubscriber);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// router.patch("/:id", (req, res) => {});

// router.delete("/:id", (req, res) => {});
module.exports = router;
