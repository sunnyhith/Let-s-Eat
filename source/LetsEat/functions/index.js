const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

const sendgrid_api_key =
  "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";
sgMail.setApiKey(sendgrid_api_key);

exports.welcomeEmail = functions.auth.user().onCreate(user => {
  const mailContent = {
    from: "Let's Eat <noreply@letseat.com>",
    to: user.email,
    templateId: "d-5a856df4b1ff4c05ad2b4764818ab787"
  };
  sgMail
    .send(mailContent)
    .then(() => {
      console.log("Success: Welcome email sent to: ", user.email);
      return true;
    })
    .catch(error => {
      console.log("Error: Couldn't send email: ", error);
      return false;
    });
});
