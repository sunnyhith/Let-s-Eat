import * as firebase from 'firebase';
import { userInfo } from 'os';

var db = firebase.firestore();
var event_db = db.collection("event");
var user_db = db.collection("users");

async function getAttendees(eventId, event){
    var attendees = [event.host];
    const snapshot = await event_db.doc(eventId).collection("attending").get();
    var emails = snapshot.docs;
    if(emails){
        emails.forEach(async (email) => {
            attendees.push(email.id);
        })
    }
    return attendees;
}

async function getPrefStats(eventId, event){
    const attendees = await getAttendees(eventId, event);
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


async function selectRestaurant(cuisine, restrictions, location){ // include time later
    try{
        var suggestion = await fetch('/api/suggestion', {
            method: "post",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                term: cuisine,
                location: location,
                categories: restrictions
            })
        })
        var parse_suggestion = await suggestion.json();
        return parse_suggestion;
    }
    catch(error){
        console.error(error);
    }
}

function process_restriction(restrictions){
    var filt_restriction = [];
    for(var restriction in restrictions){
        if(restriction !== "None"){
            filt_restriction.push(restriction);
        }
    }
    return filt_restriction.join().toLowerCase();
}

async function getSuggestions(eventId, num_suggestions = 6){
    const event_doc = await event_db.doc(eventId).get();
    if(!event_doc.exists){
        console.warn("Cannot get attendees, because event does not exist.");
        return;
    }

    var suggestions = {};
    const event = event_doc.data();
    const location = event.location;
    const time = event.time;
    const pref = await getPrefStats(eventId, event);
    var cuisines = pref["favCuisines"];
    var restrictions = process_restriction(pref["dietaryRestrictions"]);
    var isEnoughCusine = cuisines.length >= num_suggestions;

    var cuisine_counter = {};
    for(var cnt = 0; cnt < num_suggestions; cnt++){
        // select cusine without duplicate only if the cuisines list is long enough for selection
        var cuisine_ind = Math.floor(Math.random()*cuisines.length);
        var cuisine = cuisines[cuisine_ind];
        if(isEnoughCusine){
            [cuisines[cuisines.length-1], cuisines[cuisine_ind]] = [cuisines[cuisine_ind], cuisines[cuisines.length-1]];
            cuisines.pop();
        }
        cuisine_counter[cuisine] = cuisine_counter[cuisine]? cuisine_counter[cuisine]+ 1: 1;
    }

    for(var cuisine in cuisine_counter){
        var req_cnt = cuisine_counter[cuisine];
        var yelp_results = await selectRestaurant(cuisine, restrictions, location);
        if(yelp_results === undefined){
            console.warn(`cannot get yelp result from this combination ${cuisine}, ${restrictions}, ${location}`)
        }
        
        var cnt = 0;
        for(var yelp_res of yelp_results){
            var business_id = yelp_res.id;
            if(!(business_id in suggestions)){
                suggestions[business_id] = yelp_res;
                cnt += 1;
                if(cnt >= req_cnt){
                    break;
                }
            }            
        }
    }
    return Object.values(suggestions);
}

export {getSuggestions};