require("dotenv").config();
const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `${process.env.FR_URL}/${process.env.FR_KEY}/${lat},${long}?units=si`;

  request(
    {
      url,
      json: true,
    },
    (error, res) => {
      if (error) {
        return callback("Unable to connect to weather service!", undefined);
      } else if (res.body.error) {
        return callback("Unable to find location!", undefined);
      }

      callback(
        undefined,
        `${res.body.currently.summary}! It is currently ${
          res.body.currently.temperature
        } Celsius degrees out and ${res.body.currently.uvIndex} UV Index-${
          res.body.currently.uvIndex < 3
            ? "Cover Head and/or Eyes"
            : res.body.currently.uvIndex < 6
            ? "Cover Head and Eyes and Use Low SPF Sunscreen"
            : res.body.currently.uvIndex < 8
            ? "Cover Head, Eyes, Body and Use Strong SPF or Do Not Spend Time Outdoors"
            : res.body.currently.uvIndex < 11
            ? "Cover Head, Eyes, Body and Use Strong SPF or Do Not Spend Time Outdoors"
            : "Do Not Go Outdoors!"
        }. There is a ${res.body.currently.precipProbability}% chance of rain.`
      );
    }
  );
};

const multipleForecasts = (lat, long, callback) => {
  const url = `${process.env.FR_URL}/${process.env.FR_KEY}/${lat},${long}?units=si`;

  request(
    {
      url,
      json: true,
    },
    (error, res) => {
      if (error) {
        return callback("Unable to connect to weather service!", undefined);
      } else if (res.body.error) {
        return callback("Unable to find location!", undefined);
      }

      callback(undefined, res.body);
    }
  );
};

module.exports = {
  forecast,
  multipleForecasts,
};
