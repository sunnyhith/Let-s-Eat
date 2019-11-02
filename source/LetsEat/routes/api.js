var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

// create a GET route
router.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPREssSS BACKEND IS CONNECTED TO REACT" });
});

router.get("/restaurants", async (request, response) => {
  const config = {
    headers: {
      Authorization:
        "Bearer ZMhxydcy94rtsyrk-H0GvHXN6h6kLIDOyW20fJjcX5C4k8FYFhEhq0X1HNwj18701MRZZ_cEoI4jTFFyhRIwVmvGSWTaxaFXvgyYmh3I2RuocFVEZSb5kTMVf7qwXXYx"
    }
    // params: {
    //   term: "tacos",
    //   location: "Irvine",
    //   limit: "10"
    // }
  };
  const url = "https://api.yelp.com/v3/businesses/search?location=Irvine";
  const fetch_response = await fetch(url, config);
  const json = await fetch_response.json();
  response.json(json);
});

router.get("/restaurants/:id", async (request, response) => {
  const businessId = request.params.id;
  const config = {
    headers: {
      Authorization:
        "Bearer ZMhxydcy94rtsyrk-H0GvHXN6h6kLIDOyW20fJjcX5C4k8FYFhEhq0X1HNwj18701MRZZ_cEoI4jTFFyhRIwVmvGSWTaxaFXvgyYmh3I2RuocFVEZSb5kTMVf7qwXXYx"
    },
    params: {
      term: "tacos",
      location: "Irvine",
      limit: "10"
    }
  };
  // const url = "https://api.yelp.com/v3/businesses/search?location=Irvine";
  const url = `https://api.yelp.com/v3/businesses/${businessId}`;
  const fetch_response = await fetch(url, config);
  const json = await fetch_response.json();
  response.json(json);
});


module.exports = router;
