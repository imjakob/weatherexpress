require("dotenv").config();
const request = require("request");

const geocode = (address, callback) => {
  const url = `${process.env.GEO_URL}/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.GEO_KEY}`;

  request(
    {
      url,
      json: true,
    },
    (error, res) => {
      if (error) {
        return callback("Unable to connect to location service!", undefined);
      } else if (res.body.features.length === 0) {
        return callback(
          "Unable to find location. Try another search!",
          undefined
        );
      }

      callback(undefined, {
        lat: res.body.features[0].center[1],
        long: res.body.features[0].center[0],
        location: res.body.features[0].place_name,
      });
    }
  );
};

module.exports = geocode;
