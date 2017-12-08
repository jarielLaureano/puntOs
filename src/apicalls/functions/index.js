const functions = require('firebase-functions');
const admin = require('firebase-admin');
var nodemailer = require('nodemailer');
var serviceAccount = require("./puntOs-Capstone2017-4ab872953b34.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://puntos-capstone2017.firebaseio.com/"
});

const sender_email = functions.config().gmail.email;
const sender_pass = functions.config().gmail.password;
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender_email,
    pass: sender_pass
  }
})

exports.SendConfirmAndApproveEmails = functions.database.ref('/users/{uid}').onWrite(event =>{
  const event_data = event.data;
  const value = event_data.val();
  const user_id = event.params.uid;
  //Value not new or deleted
  if(event_data.previous.exists() || !event.data.exists()){
    return null;
  }

  if (value.type === 'Business'){

  return admin.database().ref('/admin/u5EldzH8DmhSdWoTVpyrAISjLGm2').once('value', snapshot => {
    const admin_email = snapshot.val().email;
    const confirm_mail_struct = {
      from: 'puntOs Team <noreply@firebase.com>',
      to: value.email,
      subject: 'Thanks for submiting your information!',
      text: `Thank you ${value.businessName} for submitting your business request to join puntOs!
      Please allow at least 24hrs for your information to be verified and your account activated.`
    };

    const approve_mail_struct = {
      from: 'puntOs Team <noreply@firebase.com>',
      to: admin_email,
      subject: `Approval request from ${value.businessName}!`,
      text: `Please verify that the following information is correct:
      ${value} If this information is correct please access this link to approve account creation:
      https://us-central1-puntos-capstone2017.cloudfunctions.net/approveBusinessAccount?id=${user_id}&size=${value.size}`
    };

    const confirmation_promise = transport.sendMail(confirm_mail_struct)
      .then(() => console.log(`email sent to ${value.email}`))
      .catch((error) => console.error(error));

    const approval_promise = transport.sendMail(approve_mail_struct)
      .then(() => console.log(`email sent to ${admin_email}`))
      .catch((error) => console.error(error));

    return Promise.all([confirmation_promise,approval_promise]);
  });
} else if (value.type === 'user'){
    const confirm_mail_struct = {
      from: 'puntOs Team <noreply@firebase.com>',
      to: value.email,
      subject: 'Welcome to the puntOs Team!',
      text: `Thank you ${value.name} for joining our team!
      Log in and start earning points today!`
    };
    return transport.sendMail(confirm_mail_struct)
      .then(() => console.log(`email sent to ${value.email}`))
      .catch((error) => console.error(error));
  }
});

exports.approveBusinessAccount = functions.https.onRequest((req, res) => {
  return admin.database().ref(`users/${req.query.id}`).once('value', snapshot => {
    var radius_size = '0';
    if (req.query.size === 'Small')
      radius_size= '40';
    else if( req.query.size === 'Medium')
        radius_size = '60';
    else if( req.query.size === 'Large')
        radius_size = '80';
    else if( req.query.size === 'XLarge')
        radius_size = '100';
    const activate_account = { active: true, longitude: 'somevalue', latitude: 'somevalue', radius: radius_size };
    snapshot.ref.update(activate_account).catch((error) => console.log(error));
  }).then(snapshot => res.status(200).end());
});
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
      console.log('Uppercasing', event.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return event.data.ref.parent.child('uppercase').set(uppercase);
    });
