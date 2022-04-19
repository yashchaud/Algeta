var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const request = require("request");
var logger = require("morgan");
var cors = require("cors");
port = 5000;
var indexRouter = require("./routes/index");
 
var Model = require("./routes/Model");
var mood = require("./routes/mood");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var spotify_client_id = "74bbd63608b94a93a2864c80e91a0f54";
var spotify_client_secret = "a9fc518046e8423e8c5b5508fcbed776";

// filegrab
app.use("/home", indexRouter);
app.use("/mood", mood);
app.use("/Model", Model);

 


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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;
