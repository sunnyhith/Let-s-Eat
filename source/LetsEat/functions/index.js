const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

const sendgrid_api_key =
  "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";
sgMail.setApiKey(sendgrid_api_key);

exports.welcomeEmail = functions.auth.user().onCreate(user => {
  const { email, displayName } = user;
  const APP_NAME = "Let's Eat";
  const mailContent = {
    from: `${APP_NAME} <noreply@letseat.com>`,
    to: email
  };

  mailContent.subject = `Welcome to ${APP_NAME}!`;
  mailContent.text = `Hey${
    displayName ? " " + displayName : " there"
  }! Welcome to ${APP_NAME} community.\n\n
  With ${APP_NAME}, you can create and manage dining invitations as a host or get invited to events hosted by others.\n
  We are unique. We recommend restaurants based on your preferences we saved from the survey.\n\n
  We hope you love using our product.\n\n
  Regards,
  Team ${APP_NAME}`;

  sgMail
    .send(mailContent)
    .then(() => {
      console.log("Success | Welcome email sent to: ", email);
      return true;
    })
    .catch(error => {
      console.log("Error | Couldn't send email: ", error);
      return false;
    });
});
