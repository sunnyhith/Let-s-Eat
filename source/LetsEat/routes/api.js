var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const sgMail = require("@sendgrid/mail");

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
  const url = "https://api.yelp.com/v3/businesses/search?location=Irvine&limit=5";
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

router.post("/event/send-invites/:id", async (request, response) => {
  const eventId = request.params.id;
  const sendgrid_api_key =
    "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";
  sgMail.setApiKey(sendgrid_api_key);
  const { host, eventInfo, emails } = request.body;
  if (!emails || emails.length === 0) {
    response.end("No emails need to send");
  }
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
    response.end("Emails Sent");
  });
});

module.exports = router;
