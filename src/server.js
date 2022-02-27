const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const demo = require("../src/models/Novel/NovelController");
const bookmarkRouter = require("./models/Bookmark/BookmarkController");
const categoryRouter = require("./models/Category/CategoryController");
const chapterRouter = require("./models/Chapter/ChapterController");
const novelRouter = require("./models/Novel/NovelController");
const userRouter = require("./models/User/UserController");
const homeRouter = require("./models/Home/HomeController");

app.use(bodyParser.json());

mongoose.connect(
  process.env.CUSTOMCONNSTR_MyConnectionString || "mongodb://localhost/novel",
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.use("/", homeRouter);
app.use("/Bookmark", bookmarkRouter);
app.use("/Category", categoryRouter);
app.use("/Chapter", chapterRouter);
app.use("/Novel", novelRouter);
app.use("/User", userRouter);

app.listen(3000, () => console.log("Server Started"));
