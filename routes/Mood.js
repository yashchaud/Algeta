var express = require("express");
var router = express.Router();
const data = require("./data");
var axios = require("axios");

var mood
router.get("/", async function (req, res, next) {
  
 
  res.send(mood);
   
});

router.post("/", (req, res) => {
  mood = req.body.mood;
   res.status(200);
});

module.exports = router;
