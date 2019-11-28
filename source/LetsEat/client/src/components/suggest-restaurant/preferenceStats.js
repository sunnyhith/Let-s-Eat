import * as firebase from 'firebase';
import { userInfo } from 'os';

var db = firebase.firestore();
var event_db = db.collection("event");
var user_db = db.collection("users");

async function getAttendees(eventId){
    const event = await event_db.doc(eventId).get();
    if(!event.exists){
        console.warn("Cannot get attendees, because event does not exist.");
    }
    var attendees = [event.data().host];
    const snapshot = await event_db.doc(eventId).collection("attending").get();
    var emails = snapshot.docs;
    if(emails){
        emails.forEach(async (email) => {
            attendees.push(email.id);
        })
    }
    console.log("finish processing attendess in getAttendees");
    return attendees;
}

async function getPrefStats(eventId){
    const attendees = await getAttendees(eventId);
    var all_attend_pref = [];
    var all_attend_restri = {};

    for(const attendee of attendees){
        var attendeeInfo = await user_db.doc(attendee).get();
        if(attendeeInfo.exists){
            var cuisine = attendeeInfo.data().favCuisines;
            var restriction = attendeeInfo.data().dietaryRestrictions;

            if(cuisine){
                all_attend_pref = [...all_attend_pref, ...Object.keys(cuisine)]
            }
            if(restriction){
                all_attend_restri = {...all_attend_restri, ...restriction};
            }            
        }
    }
    return {favCuisines: all_attend_pref,
            dietaryRestrictions: all_attend_restri
    };
}




// async function selectRestaurant(cuisine, restrictions, location, cnt){ // include time later
//     const config = {
//         headers: {
//         Authorization:
//             "Bearer ZMhxydcy94rtsyrk-H0GvHXN6h6kLIDOyW20fJjcX5C4k8FYFhEhq0X1HNwj18701MRZZ_cEoI4jTFFyhRIwVmvGSWTaxaFXvgyYmh3I2RuocFVEZSb5kTMVf7qwXXYx"
//         },
//         params: {
//             term: "Indian",
//             location: "Irvine",
//             limit: cnt
//         }
//     };
//     const id = props.match.params.post_id;
//     const url = `/api/restaurants/${id}`;
//     const response = await fetch("/api/restaurants${id}", config);
//     const json = await response.json();
//     return json.businesses;
// }

// async function selectRestaurant(cuisine, restrictions, location, cnt){
//     const yelp = require('yelp-fusion');
//     const apiKey = "ZMhxydcy94rtsyrk-H0GvHXN6h6kLIDOyW20fJjcX5C4k8FYFhEhq0X1HNwj18701MRZZ_cEoI4jTFFyhRIwVmvGSWTaxaFXvgyYmh3I2RuocFVEZSb5kTMVf7qwXXYx";
//     const searchRequest = {
//         term: cuisine,
//         location: location,
//         limit: cnt
//     };

//     const client = yelp.client(apiKey);
//     var response = await client.search(searchRequest);
//     client.search(searchRequest).then(response => {
//         const firstResult = response.jsonBody.businesses[0];
//         const prettyJson = JSON.stringify(firstResult, null, 4);
//         console.log(prettyJson);
//         console.log("response is :", prettyJson);
//         return prettyJson;
//     }).catch(e => {
//         console.log(e);
//     });
//     return
//     // .then(response => {
//     //     const firstResult = response.jsonBody.businesses[0];
//     //     const prettyJson = JSON.stringify(firstResult, null, 4);
//     //     console.log(prettyJson);
//     // }).catch(e => {
//     // console.log(e);
//     // });
// }

// async function selectRestaurants(eventId, cnt = 5){
//     var event = await event_db.doc(eventId).get();
//     var location = event.data().location;
//     var preference = await getPrefStats(eventId);
//     var cusines = preference.favCuisines;
//     var restrictions = preference.dietaryRestrictions;
//     console.log("cusines[0] is", cusines[0]);
//     var restaurants = await selectRestaurant(cusines[0], restrictions, location, cnt);
//     return restaurants;
// }

async function testSuggest(){
    console.log("Entering test fcn");
    var eventId = "SW3vtMVhLzFkpJjQmFJd";
    var pref = getPrefStats(eventId);
    console.log("pref is", pref);
    // var restaurants = await selectRestaurants(eventId);
    // console.log("The returned restaurants is", restaurants);
}

export {testSuggest};