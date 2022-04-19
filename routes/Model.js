var express = require("express");
var router = express.Router();
const data = require("./data");
var axios = require("axios");

var Tracks;

router.post("/", async (req, res) => {
  console.log(Tracks);
  if ((req.body.mood = "")) {
    return null;
  } else {
    Tracks = req.body.tracks;

    res.status(200);
  }
});
router.get("/", async function (req, res, next) {
  console.log(Tracks);
  res.send("sad");
});
module.exports = router;
