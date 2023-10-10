const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  const cityName = req.body.city;
  const unit = 'metric';
  const appid = 'ec8e5799797e7986b4ad2c475785fdd3';
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    cityName +
    '&appid=' +
    appid +
    '&units=' +
    unit;
  https.get(url, function (response) {
    response.on('data', function (data) {
      const weatherData = JSON.parse(data);
      const tempe = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const iconName = weatherData.weather[0].icon;
      const iconUrl =
        'http://openweathermap.org/img/wn/' + iconName + '@2x.png';
      res.write(
        '<p>The description of ' + cityName + ' is ' + description + '</p>'
      );
      res.write(
        '<h1>The tempreature of ' +
          cityName +
          ' is ' +
          tempe +
          ' degree celcius</h1>'
      );
      res.write('<img src =' + iconUrl + '>');
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log('server is listening on port 3000');
});
