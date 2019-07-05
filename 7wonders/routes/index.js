const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/api/wonders", (req, res, next) => {
  Place.find({})
    // .select("location.coordinates") // selects only certain fields
    .sort({ name: 1 }) // sorts by name
    .limit(10) // limits to the first 10 results
    .then(places => {
      res.json(places);
      // const coordinates = places.map(place => place.location.coordinates)
      // res.json(places)
    });
});

router.post("/wonders", (req, res, next) => {
  const { name, img, latitude, longitude } = req.body;

  Place.create({
    name,
    imageUrl: img,
    location: {
      type: "Point",
      coordinates: [latitude, longitude]
    }
  })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
