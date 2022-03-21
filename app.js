var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const request = require('request');
var logger = require("morgan");
var cors = require('cors')
port = 5000;
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var Model = require("./routes/Model");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus:200
  })
);




app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
 

var spotify_client_id =  '74bbd63608b94a93a2864c80e91a0f54'
var spotify_client_secret = 'a9fc518046e8423e8c5b5508fcbed776'



// filegrab
app.use("/", indexRouter);
 
app.use('/Model', Model);
 
app.get('/auth/login', (req, res) => {
  var scope = "streaming \
  user-read-email \
  user-read-private"

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: "http://localhost:3000/auth/callback",
     
  })
  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());

});


app.get('/auth/callback', (req, res) => {
  
   

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code:req.query.code,
      redirect_uri: "http://localhost:3000/auth/callback",
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.redirect('/')
    }
  });
});


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
