const express = require("express");
const https = require("https");
const bodyparser=require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res) {

res.sendFile(__dirname+"/index.html");
    })

app.post("/",function(req,res){
const query=  req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=aa34a9214a1315397f03540f7842d37d"
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherreport = JSON.parse(data);
      console.log(weatherreport);
      const temp=weatherreport.main.temp;
      const description = weatherreport.weather[0].description;
      const icon=weatherreport.weather[0].icon;
      const imageurl=" http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p> the weather description is : " + description+".</p>");
      res.write("<h1> the temperature in "+query+" is : "+temp+" degree celcius.</h1> ");
      res.write("<img src="+imageurl+">");
      res.send();
    })
  })

})




app.listen(3000, function() {
  console.log("running");
})
