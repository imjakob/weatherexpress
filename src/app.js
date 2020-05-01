const express = require("express");
const cors = require("cors");
const path = require("path");
const hbs = require("hbs");

const { forecast, multipleForecasts } = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (_req, res) => {
  res.render("index", {
    title: "Weather",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        forecast: forecastData,
      });
    });
  });
});

app.get("/jakobweather-dev", cors(), (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    multipleForecasts(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        forecast: forecastData,
      });
    });
  });
});

app.get("*", (_req, res) => {
  res.render("404", {
    title: "404",
    message: "Page Not Found",
  });
});

app.listen(port);
