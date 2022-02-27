var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const bookmarkRouter = require("./src/models/Bookmark/BookmarkController");
const categoryRouter = require("./src/models/Category/CategoryController");
const chapterRouter = require("./src/models/Chapter/ChapterController");
const novelRouter = require("./src/models/Novel/NovelController");
const userRouter = require("./src/models/User/UserController");
const homeRouter = require("./src/models/Home/HomeController");
var indexRouter = require("./src/index");
var usersRouter = require("./src/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/Bookmark", bookmarkRouter);
app.use("/Category", categoryRouter);
app.use("/Chapter", chapterRouter);
app.use("/Novel", novelRouter);
app.use("/User", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
