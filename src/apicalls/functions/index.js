const functions = require('firebase-functions');
const admin = require('firebase-admin');
const https = require("https");
const google_api = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const google_api_key = 'AIzaSyBLDLO4nbnylcU90AD-XFn0fZdcLxnHGsY';
var nodemailer = require('nodemailer');
var serviceAccount = require("./puntOs-Capstone2017-4ab872953b34.json");
var haversine = require('haversine');
var moment = require('moment');

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

exports.sendRedeemCode = functions.database.ref('/Redeems/{rid}').onWrite(event => {
  const event_data = event.data;
  const value = event_data.val();
  //console.log(value)
  const user_id = value.uid;

  if(event_data.previous.exists() || !event.data.exists()){
    return null;
  }

  return admin.database().ref(`/users/${user_id}`).once('value', snapshot => {
     var user = snapshot.val();
     //console.log(user)
     const code_mail_struct = {
        from: 'puntos Team <noreply@firebase.com>',
        to: user.email,
        subject: 'Here is your Coupon Code!',
        text: `Thank you ${user.name} for using or app!
        Here is your coupon code: ${value.code}`
     };

     return transport.sendMail(code_mail_struct)
        .then(() => console.log(`email sent to ${user.email}`))
        .catch((error) => console.error(error));
  });

});

exports.approveBusinessAccount = functions.https.onRequest((req, res) => {
  return admin.database().ref(`users/${req.query.id}`).once('value', snapshot => {
    var radius_size = '0';
    var address = snapshot.val().addressLine.split(' ').join('+') + ',+' + snapshot.val().city.split(' ').join('+') + ',+' + 'Puerto+Rico&';
    var req_url = google_api + address + 'key=' + google_api_key;
    //console.log('address: ' + address)
    //console.log('url: ' + req_url)
    https.get(req_url, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', data => {
      body += data;
      });
      res.on('end', () => {
        let longitude = '';
        let lattitude = '';
        body = JSON.parse(body);
        lattitude += body.results[0].geometry.location.lat;
        longitude += body.results[0].geometry.location.lng;
        //console.log(body.results[0])
        //console.log(lattitude)
        //console.log(longitude)
        if (req.query.size === 'Small')
          radius_size= '40';
        else if( req.query.size === 'Medium')
            radius_size = '60';
        else if( req.query.size === 'Large')
            radius_size = '80';
        else if( req.query.size === 'XLarge')
            radius_size = '100';

        const activate_account = { active: true, longitude: longitude, latitude: lattitude, radius: radius_size };
        snapshot.ref.update(activate_account).catch((error) => console.log(error));
    });});

  }).then(snapshot => res.status(200).end());});


  exports.checkIn = functions.https.onRequest((req, res) => {
    var checkin_response = {checkedIn: false, pointsEarned: 0, businessName: '', message: '', distance: 0};
    const businessID = req.query.bid;
    const user_id = req.query.uid;
    const lattitude = req.query.lattitude;
    const longitude = req.query.longitude;
    var checkinFailed = false;
    var check_ins_today = 0;
    const _today = new Date().toISOString().substring(0,10);
    admin.database().ref(`/Checkins`).orderByChild(`queryparam`).equalTo(businessID+_today).once('value', snapshot => {
      if(snapshot.val()){
      check_ins_today = Object.keys(snapshot.val()).length;
      snapshot.forEach(checkin => {
        checkinObj = checkin.val();
        if(checkinObj.uid === user_id){
          checkin_response.message = 'Unable to checkin, cannot checkin on the same business twice in a day.';
          checkinFailed = true;
          return res.status(200).send(checkin_response);
        }
      });}}).then(()=>{
        if(!checkinFailed){
          if(check_ins_today < 10){
              admin.database().ref(`users/${businessID}`).once('value', business => {
                const businessObj = business.val();
                const businessLat = businessObj.latitude;
                const businessLong = businessObj.longitude;
                const businessRad = businessObj.radius;
                const distance_feet = haversine({latitude: businessLat, longitude: businessLong}, {latitude: lattitude, longitude: longitude}, {unit: 'meter'})*3.28084;
                checkin_response.distance = distance_feet;
                //return res.status(200).send(checkin_response);
                if(distance_feet <= businessRad){
                  checkin_response.checkedIn = true;
                  checkin_response.message = 'Successfully checked in.';
                  checkin_response.businessName = businessObj.businessName;
                  admin.database().ref(`users/${user_id}`).once('value', user => {
                    const today = new Date().toISOString().substring(0,10);
                    const userObj = user.val();
                    const age = (moment(new Date(today)).diff(moment(new Date(userObj.birthdate)), 'minutes')/525600).toFixed(0);
                    const checkin_in = {age: age, businessID: businessID, businessName: businessObj.businessName, city: userObj.city,
                    date: today, name: userObj.name, uid: user_id, queryparam: businessID+today};
                    admin.database().ref(`/Checkins`).once('value', checkins => {
                      checkins.ref.push(checkin_in).catch(() => {
                        checkin_response.message = 'Unable to checkin at this time.';
                        checkin_response.checkedIn = false;
                        return res.status(200).send(checkin_response);
                      });
                      var current_points = userObj.points;
                      const new_points = current_points+50;
                      user.ref.update({points: new_points}).then(()=>{
                      return res.status(200).send(checkin_response);
                      }).catch(()=>{
                        checkin_response.message = 'Could not add points.';
                        return res.status(200).send(checkin_response);
                      });
                    }).catch(()=>{
                      checkin_response.message = 'Unable to checkin at this time.';
                      checkin_response.checkedIn = false;
                      return res.status(200).send(checkin_response);
                    });
                  }).catch(()=>{
                    checkin_response.message = 'Unable to access user data.';
                    checkin_response.checkedIn = false;
                    return res.status(200).send(checkin_response);
                  });
                } else{
                  checkin_response.checkedIn = false;
                  checkin_response.message = 'Out of range';
                  checkin_response.businessName = businessObj.businessName;
                  return res.status(200).send(checkin_response);
                }
              }).catch(()=>{
                checkin_response.checkedIn = false;
                checkin_response.message = 'Unable to access business data.';
                return res.status(200).send(checkin_response);
              });
          }
          else {
              checkin_response.message = 'Unable to checkin, cannot checkin more than 10 times a day.';
              return res.status(200).send(checkin_response);
          }
        }
      }).catch(() => {
        checkin_response.checkedIn = false;
        checkin_response.message = 'Unable to access checkin data.';
        return res.status(200).send(checkin_response);
      })
  });

  exports.aggregateReviews = functions.https.onRequest((req, res) => {
        var votes_count = {};
        var update_obj = {};
        var tallied_update = {};
    admin.database().ref(`/Reviews`).orderByChild('tallied').equalTo(false).once('value', snapshot => {
      snapshot.forEach(review => {
        reviewObj = review.val();
        reviewObj['tallied'] = true;
        tallied_update[review.key] = reviewObj;
        businessID = reviewObj.businessID;
        rating = reviewObj.rating;
        if(votes_count.hasOwnProperty(businessID)){
          votes_count[businessID].accumulated += rating;
          votes_count[businessID].possible += 5;
        } else {
          votes_count[businessID] = { accumulated: 0, possible: 0 };
          votes_count[businessID].accumulated += rating;
          votes_count[businessID].possible += 5;
        }
      });
      }).then(() => {
        admin.database().ref('/users').orderByChild('type').equalTo('Business').once('value', users =>{
          users.forEach(child_node => {
              var businessObj = child_node.val();
              var id = child_node.key;
              if(!businessObj.accumulated){
                if(votes_count.hasOwnProperty(id)){
                  var score = ((votes_count[id].accumulated/votes_count[id].possible)*5).toFixed(2);
                  //console.log(score)
                  businessObj['rating'] = score;
                  businessObj['accumulated'] = votes_count[id].accumulated;
                  businessObj['possible'] = votes_count[id].possible;
                  update_obj[id] = businessObj;
                }
              } else {
                if(votes_count.hasOwnProperty(id)){
                  var accumulated_current = businessObj['accumulated'];
                  var possible_current = businessObj['possible'];
                  var new_accumulated = votes_count[id].accumulated+accumulated_current;
                  var new_possible = possible_current+votes_count[id].possible;
                  var score = ((new_accumulated/new_possible)*5).toFixed(2);
                  businessObj['rating'] = score;
                  businessObj['accumulated'] = new_accumulated;
                  businessObj['possible'] = new_possible;
                  update_obj[id] = businessObj;
                }
              }
          });
          console.log(update_obj)
          console.log(tallied_update)
        }).then(() => {
          admin.database().ref('/users').update(update_obj);
          admin.database().ref('/Reviews').update(tallied_update);
        });
        res.status(200).send('Reviews Aggregated');
      });

    });
