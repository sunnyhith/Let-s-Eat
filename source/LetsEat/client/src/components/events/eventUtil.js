import * as firebase from 'firebase';
import { userInfo } from 'os';

var db = firebase.firestore();
var event_db = db.collection("event");
var user_db = db.collection("users");

function set_event_in_user_db(eventId, email, event_type, status){
    var event = user_db.doc(email).collection(event_type);
    event.doc(eventId).set({status: status})
    .catch(
        error => {
            console.error("Unable to set status of ", eventId, " for ", email);
        }
    )
}

function create_event_info(eventInfo){
    eventInfo["host"] = firebase.auth().currentUser.email;
    let deadline = new Date(eventInfo["start_time"]);
    deadline.setDate(deadline.getDate()-1);
    eventInfo["deadline"] = firebase.firestore.Timestamp.fromDate(deadline); 
    return eventInfo;
}

async function createEvent(eventInfo){
    var emails = eventInfo["guests"];
    delete eventInfo.guests;
    var wrapped_info = create_event_info(eventInfo);

    try{
        var event = await event_db.add(wrapped_info);
        inviteGuests(event.id, emails);
        set_event_in_user_db(event.id, eventInfo["host"], "host_event", "attending");
        return event.id;
    }
    catch(error) {
        console.error("Error creating the event.", error);
        return null;
    };
}

// function get_status_guest(eventId, status){
//     return new Promise((resolve, reject) => {        
//         event_db.doc(eventId).collection(status).get().then(snapshot => {
//             var guests = [];
//             var docs = snapshot.docs;
//             if(docs){
//                 docs.forEach(async (doc) => {
//                     guests.push(doc.id);
//                 })
//                 resolve(guests);
//             }
//             else{
//                 console.log(status, " not defined");
//                 reject("The status ", status, " is empty");
//             }
            
//         }).catch(error => {
//             console.warn("Fail to get guest infromation from ", status, "collection");
//             console.warn(error);
//             reject("The status ", status, " does not exist"); 
//         })
//     });    
// }

async function get_status_guest(eventId, status){
    try { 
        var snapshot = await event_db.doc(eventId).collection(status).get();
        var guests = [];
        var docs = snapshot.docs;
        if(docs){
            docs.forEach(async (doc) => {
                guests.push(doc.id);
            })
            return guests;
        }
        else{
            console.log(status, " not defined");
            // reject("The status ", status, " is empty");
        }
    }
    catch(error) {
        console.warn("Fail to get guest infromation from ", status, "collection");
        console.warn(error);
        // reject("The status ", status, " does not exist"); 
    }
}

async function readEvent(eventId){
    try{
        var event = await event_db.doc(eventId).get();
        if(event.exists){
            var event_info = event.data();

            var statuses = ["invited", "attending", "tentative", "declined"];
            await statuses.forEach(async (status) => {

                event_info[status] = await get_status_guest(eventId, status);
            })
            console.log(event_info.invited);
            return event_info;
        }
        else{
            console.log("Attempted to read an event that does not exist!");
        }
    }
    catch(error){
        console.log("Failed to read an event from database. ", error);
    }
    return null;
}

function updateEvent(eventId, eventInfo){
    var emails = eventInfo["guests"];
    delete eventInfo.guests;
    var wrapped_info = create_event_info(eventInfo);

    event_db.doc(eventId).update(wrapped_info)
    .then(function() {
            console.log("successfully updated the event ", eventId);
    }).catch(function(error)
        {
            console.error("Fail to update the event", error);
        }
    );
}

function deleteEvent(eventId){
    // need to delete all user associate to the eventId...........
    event_db.doc(eventId).delete()
    .catch(function(error)
        {
            console.error("Fail to delete the event", error);
        }
    );

}

async function get_event_in_user_db(eventId, email){
    try{
        var user_event_info = await user_db.doc(email).collection("guest_event").doc(eventId).get();
        return user_event_info.data();
    }
    catch(error){
        console.error("Unable to set status of ", eventId, " for ", email);
        return;
    }
}

function updateGuest(guest, updateInfo){
    guest.update(updateInfo)
    .then(function() {
            console.log("successfully updated guest information: ", updateInfo);
    }).catch(function(error)
        {
            console.error("Fail to guest information", error);
        }
    );
}

function addGuestTo(eventId, email, status){
    var guest = event_db.doc(eventId).collection(status);
    guest.doc(email).set({})
    .catch(function(error) {
        console.log("Failed to store invitee guest information for email ", email);
        console.log(error);
    });
}

function inviteGuests(eventId, emails){
    emails.forEach(email => {
            addGuestTo(eventId, email, "invited");
            set_event_in_user_db(eventId, email, "guest_event", "invited");
    });
};

function delGuestFrom(eventId, email, status){
    event_db.doc(eventId).collection(status).doc(email).delete()
    .catch(error=>{
        console.error("Unable to delete guest ", email, " from ", status);
        console.errot(error);
    })    
};

async function changeGuestStatus(eventId, status){
    var valid_status = ["tentative", "declined", "attending"];
    if(!valid_status.includes(status)){
        console.warn("Invalid request for changing guest status");
        return;
    }
    var email = firebase.auth().currentUser.email;
    var usr_event = await get_event_in_user_db(eventId, email);
    if (!usr_event){
        console.log("Current user is not in the event: ", eventId);
        return;
    }
    var prev_status = usr_event.status;
    delGuestFrom(eventId, email, prev_status);
    addGuestTo(eventId, email, status);
    set_event_in_user_db(eventId, email, "guest_event", status);
}

function getUserEveryEvents(){
    return new Promise(async (resolve, reject) => {
        var email = firebase.auth().currentUser.email;
        var allEvents = {};

        ["guest_event", "host_event"].forEach(event_type => {
            user_db.doc(email).collection(event_type).get().then(async snapshot =>{
                let events_list = {};
                var docs = snapshot.docs;
                if(docs){
                    docs.forEach(async (doc) => {
                        var eventId = doc.id;
                        event_db.doc(eventId).get().then( event =>{
                            if(event.exists){
                                var eventInfo = event.data();
                                var eventSummary = {};
                                eventSummary['event_name'] = eventInfo.event_name;
                                eventSummary['location'] = eventInfo.location;
                                eventSummary["status"] = event_type === "guest_event"? doc.data().status: "attending";
                                
                                var statuses = ["invited", "attending", "tentative", "declined"];
                                statuses.forEach((status) => {
                                    get_status_guest(eventId, status).then(guests =>{
                                        eventSummary[status + "_cnt"] = guests.length;
                                    })
                                })
                                events_list[eventId] = eventSummary;
                            }
                        });
                    })
                    allEvents[event_type] = events_list;
                }
            })
        })
        resolve(allEvents);
    })
}

/*function testEvent(){
    var eventId = "C5jYNt7VRcgBGPBRPtS1";
    var emails = ["tzuyuc@uci.edu", "zoechaozoe@gmail.com", "aso@yahoo.com"];
    var eventInfo = {
        event_name: "Tom's birthday",
        location: "Irvine",
        message: "Hey Lets celebrate for Tom",
        guests: emails,
        start_time: new Date('2019-12-01T03:24:00')
    };

    var created_id = await createEvent(eventInfo);
    eventInfo.location = "Tustin";

    updateEvent(created_id, eventInfo);

    var event_info = await readEvent(eventId);
    console.log("In test fcn, ", event_info);
    //var email = firebase.auth().currentUser.email;
    //var usr_event = await get_event_in_user_db(eventId, email);
    console.log("I am in testEvent");
    getUserEveryEvents().then(list_events =>{
        console.log(list_events);
    }).catch(error=>{console.log(error)})
    //changeGuestStatus(eventId, "attending");
};*/

export {createEvent, updateEvent, readEvent, changeGuestStatus, getUserEveryEvents};