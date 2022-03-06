const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const demo = require("../src/models/Novel/NovelController");
const bookmarkRouter = require("./models/Bookmark/BookmarkController");
const categoryRouter = require("./models/Category/CategoryController");
const chapterRouter = require("./models/Chapter/ChapterController");
const novelRouter = require("./models/Novel/NovelController");
const userRouter = require("./models/User/UserController");
const homeRouter = require("./models/Home/HomeController");
require('dotenv').config()

// mongoose.connect(
//   // process.env.CUSTOMCONNSTR_MyConnectionString || "mongodb://localhost/novel",
//   // {
//   //   useNewUrlParser: true,
//   // }
//   process.env.MONGOLAB_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// });

mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/bookmark', bookmarkRouter);
app.use('/api/category', categoryRouter);
app.use('/api/chapter', chapterRouter);
app.use('/api/novel', novelRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send("Hello server")
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started in ${process.env.PORT}`);
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`Алдаа гарлаа: ${err.message}`)
  server.close(() => {
      process.exit(1)
  })
})
