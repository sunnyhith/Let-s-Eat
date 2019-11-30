var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const sgMail = require("@sendgrid/mail");
const yelp = require('yelp-fusion');

// create a GET route
router.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPREssSS BACKEND IS CONNECTED TO REACT" });
});


router.post("/suggestion", async (req, res) => { 
  const apiKey = 'ZMhxydcy94rtsyrk-H0GvHXN6h6kLIDOyW20fJjcX5C4k8FYFhEhq0X1HNwj18701MRZZ_cEoI4jTFFyhRIwVmvGSWTaxaFXvgyYmh3I2RuocFVEZSb5kTMVf7qwXXYx';
  const searchRequest = req.body;
  const client = yelp.client(apiKey);
  try{
    var response = await client.search(searchRequest)
    const restaurants = response.jsonBody.businesses;
    var restaurant_ids = [];
    for(const restaurant of restaurants){
      restaurant_ids.push(restaurant);
    }
    console.log("restaurant_ids: ", restaurant_ids);
    res.json(restaurant_ids);
  }
  catch(e){
    console.log(e);
  }
})

router.post("/event/send-invites/:id", async (request, response) => {
  const eventId = request.params.id;
  const sendgrid_api_key =
    "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";
  sgMail.setApiKey(sendgrid_api_key);
  const { host, eventInfo, emails } = request.body;
  const msg = {
    to: emails,
    from: host.email,
    subject: `Let's Eat! Event Invitation - ${eventInfo.event_name}`,
    text: `${host.displayName} has invited you to the event - ${eventInfo.event_name}\n
          Location - ${eventInfo.location}\n
          Event Description - ${eventInfo.message}\n
          Date and Time - ${eventInfo.start_time}`
  };
  sgMail.send(msg).then(() => {
    response.end("working");
  });
});

module.exports = router;
