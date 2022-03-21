var express = require("express");
var router = express.Router();
const data = require("./data");

const Mooda = []

router.post("/", (req, res) => {
  Mooda.push(req.body.mood);
  console.log(Mooda)
  res.status(200);
});

module.exports = router;

