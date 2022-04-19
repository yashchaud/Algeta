var express = require("express");
var router = express.Router();
var axios = require("axios");
var fetch = require("fetch").fetchUrl;
/* GET home page. */

router.get("/",  async function (req, res, next) {
  async function Database() {
    var pata = [];
    var data = JSON.stringify({
      collection: "Happy",
      database: "Yash",
      dataSource: "Cluster0",
      filter: {},
    });

    var config = {
      method: "post",
      url: "https://data.mongodb-api.com/app/data-tptrj/endpoint/data/beta/action/findOne",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key":
          "8ME5YyZSDC373Y1ki0j5sUwOct1po4qVR5SdHsxyYIc2WGXnjiCrbmCobPb49tV1",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        pata.push(response.data);
        
      })
      .catch(function (error) {
        console.log(error);
      });
    return pata;
  }
  var mood =[]
  async function filtering() {
    
    var data = await Database();
    await axios
        .get("http://localhost:5000/mood")
        .then(function (response) {
          mood.push(response.data)
          console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });

      
    
     
     if(mood == "happy"){
      const tracks = data[0].document.happy
      mood.pop("happy")
     
      return tracks;
      
     }else if(mood == "surprise"){
      const tracks = data[0].document.happy
      mood.pop("surprise")
     
      return tracks;
      
     }else if(mood =="disgust"){
      const tracks = data[0].document.sad
      mood.pop("sad")
      return tracks;
     }else if(mood =="anger"){
      const tracks = data[0].document.sad
      mood.pop("sad")
      return tracks
    }
     
     else if(mood == 'sadness'){
      const tracks = data[0].document.sad
      mood.pop("sad")
      return tracks;
     }else if (mood == 'z'){
       const tracks = data[0].document.z
        mood.pop("z")
        return tracks;
     }else if (mood == "fear"){
      const tracks = data[0].document.fear
      mood.pop("fear")
      return tracks;
     }
       
     
  }
   
  var Tracks = await filtering();
  console.log(Tracks)
  res.send(Tracks);
  
});


router.post("/", function (req, res, next) {
  var mood = req.body.mood;
  
  res.status(200);
  
});


module.exports = router;
