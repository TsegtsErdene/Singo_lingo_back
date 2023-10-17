const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const user_signed_songsRouter = require("./models/User_Singed_Songs/User_Signed_SongsController");
const reelsRouter = require("./models/Reels/ReelsController");
const artistRouter = require("./models/Artist/ArtistController");
const categoryRouter = require("./models/Category/CategoryController");
const userRouter = require("./models/User/UserController");
const songsRouter = require("./models/Songs/SongsController");
const pronounceRouter=require("./api/pronounce")
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

app.use('/api/reels', reelsRouter);
app.use('/api/category', categoryRouter);
app.use('/api/artist', artistRouter);
app.use('/api/songs', songsRouter);
app.use('/api/user_signed_songs', user_signed_songsRouter);
app.use('/api/user', userRouter);
app.use('/api/pronounce',pronounceRouter);

app.get('/', (req, res) => {
  res.send("Here is Singo Lingo back end boyyyy")
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
