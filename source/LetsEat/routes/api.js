var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
const sgMail = require("@sendgrid/mail");
const yelp = require("yelp-fusion");

router.post("/suggestion", async (req, res) => {
  const apiKey =
    "ZMhxydcy94rtsyrk-H0GvHXN6h6kLIDOyW20fJjcX5C4k8FYFhEhq0X1HNwj18701MRZZ_cEoI4jTFFyhRIwVmvGSWTaxaFXvgyYmh3I2RuocFVEZSb5kTMVf7qwXXYx";
  const searchRequest = req.body;
  const client = yelp.client(apiKey);
  try {
    var response = await client.search(searchRequest);
    const restaurants = response.jsonBody.businesses;
    var restaurant_ids = [];
    for (const restaurant of restaurants) {
      restaurant_ids.push(restaurant);
    }
    res.json(restaurant_ids);
  } catch (e) {
    console.log(e);
  }
});

router.post("/get_restaurant", async (request, response) => {
  const businessId = request.body.business_id;
  const config = {
    headers: {
      Authorization:
        "Bearer ZMhxydcy94rtsyrk-H0GvHXN6h6kLIDOyW20fJjcX5C4k8FYFhEhq0X1HNwj18701MRZZ_cEoI4jTFFyhRIwVmvGSWTaxaFXvgyYmh3I2RuocFVEZSb5kTMVf7qwXXYx"
    }
  };
  const url = `https://api.yelp.com/v3/businesses/${businessId}`;
  const fetch_response = await fetch(url, config);
  const json = await fetch_response.json();
  response.json(json);
});

router.post("/event/sendMails", async (request, response) => {
  // const eventId = request.params.id;
  const sendgrid_api_key =
    "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";
  sgMail.setApiKey(sendgrid_api_key);

  const {
    action,
    host,
    eventInfo,
    emails,
    start_time,
    restaurant
  } = request.body;
  let mailContent = {
    to: emails,
    from: host.email,
    dynamic_template_data: {
      hostName: host.displayName,
      eventName: eventInfo.event_name,
      eventLocation: eventInfo.location,
      eventMessage: eventInfo.message,
      eventStartTime: start_time
    }
  };

  if (!emails || emails.length === 0) {
    response.end("No emails need to send");
    return;
  }

  switch (action) {
    case "newEvent":
      mailContent.dynamic_template_data.eventStartTime = eventInfo.start_time;
      mailContent.templateId = "d-fefbcd3227da437d8839465b5bb304e4";
      break;

    case "remindInvitees":
      mailContent.templateId = "d-cccc0af4778d47b7bd35bb33c6086a23";
      break;

    case "finalRestaurant":
      mailContent.dynamic_template_data.restaurantName = restaurant.name;
      mailContent.dynamic_template_data.eventLocation = restaurant.address[0];
      mailContent.dynamic_template_data.restaurantPhone = restaurant.phone;
      mailContent.dynamic_template_data.restaurantUrl = restaurant.url;
      mailContent.templateId = "d-a8c9576a1ce34aa9ab03f9a746d12ead";
      break;

    case "eventDeleted":
      mailContent.templateId = "d-388246e9cfa14bc2887a8d28b2eaeade";
      break;

    default:
      mailContent.subject = `Let's Eat! NO_ACTION_MATCHED`;
      mailContent.text = `NO_ACTION_MATCHED`;
      break;
  }

  sgMail
    .send(mailContent)
    .then(() => {
      response.end("Emails Sent");
    })
    .catch(error => console.log(error));
});

module.exports = router;
