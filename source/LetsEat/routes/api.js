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
  const { action, host, eventInfo, emails, restaurant } = request.body;
  let mailContent = {
    to: emails,
    from: host.email,
    dynamic_template_data: {
      hostName: host.displayName,
      eventName: eventInfo.event_name,
      eventLocation: eventInfo.location,
      eventMessage: eventInfo.message,
      eventStartTime: eventInfo.start_time
    }
  };

  if (!emails || emails.length === 0) {
    response.end("No emails need to send");
  }

  switch (action) {
    case "newEvent":
      mailContent.templateId = "d-fefbcd3227da437d8839465b5bb304e4";
      break;

    case "remindInvitees":
      mailContent.subject = `Let's Eat! ${host.displayName} is waiting for your response`;
      mailContent.text = `You have been invited to the event ${eventInfo.event_name} and ${host.displayName} is still waiting for your response\n
        Please respond back with either "Going", "Maybe" or "Can't Go"\n\n
        Event Details:
        Event Name: ${eventInfo.event_name}\n
        Location: ${eventInfo.location}\n
        Event Description: ${eventInfo.message}\n
        Date and Time: ${eventInfo.start_time}\n
        Restaurant: ${restaurant.name}\n
        Restaurant on Yelp: ${restaurant.url}\n`;
      break;

    case "finalRestaurant":
      mailContent.subject = `Let's Eat! Restaurant has been finalized`;
      mailContent.text = `Hello there! For the event that will be hosted by ${host.displayName}, we have finalized "THIS RESTAURANT" considering the dietary restriction and interests of attendees\n
        Hope you will have a great time there! ^_^\n\n
        Event Details:
        Event Name: ${eventInfo.event_name}\n
        Location: ${eventInfo.location}\n
        Event Description: ${eventInfo.message}\n
        Date and Time: ${eventInfo.start_time}`;
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
