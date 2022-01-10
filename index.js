// load in dotenv
const dotenv = require("dotenv");
dotenv.config();

// add express dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT;

// uk cityname
const city = process.argv[2];

// address
const url =
  process.env.WEATHER_API_URL +
  `?q=${city}&&appid=${process.env.WEATHER_API_KEY}&&units=metric`;

// add request dependencies
const request = require("request");

app.get("/", (req, res) => {
  res.send("a hello world to express backend");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

if (!city) {
  console.log("there is no address entered");
  console.log("program will be terminated");
  return;
}

// console version of the output
request(url, (err, mess, body) => {
  try {
    const data = JSON.parse(body);
    var forcast = data.list;
    forcast.forEach((element, index) => {
      var temp = element.main.temp;
      var feels_like = element.main.feels_like;
      var hum = element.main.humidity;
      var weather = element.weather[0].description;
      var wind = element.wind.speed;
      console.log(`${city} weather on day ${index} will be: \n
        temperature will be ${temp} degree and humidity will be ${hum} and wind speed is ${wind} \n
        The weather will be like: ${weather} \n
        But it feels like ${feels_like} degree \n\n`);
    });
  } catch (err) {
    console.log("There is an error in your input");
  } finally {
    console.log(url);
  }
});
