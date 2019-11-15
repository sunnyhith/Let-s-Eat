import * as firebase from 'firebase';
import { userInfo } from 'os';

var db = firebase.firestore();
var event = db.collection("event");
var user_db = db.collection("users");

function create_event_info(eventInfo){
    eventInfo["host"] = firebase.auth().currentUser.email;
    let deadline = new Date(eventInfo["start_time"]);
    deadline.setDate(deadline.getDate()-2);
    eventInfo["deadline"] = firebase.firestore.Timestamp.fromDate(deadline); 
    return eventInfo;
}

function createEvent(eventInfo){
    var emails = eventInfo["guests"];
    delete eventInfo.guests;
    var wrapped_info = create_event_info(eventInfo);

    event.add(wrapped_info).then(function(docRef) {
        inviteGuests(docRef.id, emails);
        console.log("Created event ", docRef.id);
        console.log(typeof(docRef.id));
        return docRef.id;
    })
    .catch(function(error) {
        console.error("Error creating the event.", error);
        return null;
    });
}

function readEvent(eventId){
    event.doc(eventId).get()
    .then(function(doc) {
            if(doc.exists){
                return doc.data();
            }
            else{
                console.log("Event document does not exist!");
                return null;
            }
        }
    );
}

function updateEvent(eventId, eventInfo){
    var emails = eventInfo["guests"];
    delete eventInfo.guests;
    var wrapped_info = create_event_info(eventInfo);

    event.doc(eventId).update(wrapped_info)
    .then(function() {
            console.log("successfully updated the event ", eventId);
    }).catch(function(error)
        {
            console.error("Fail to update the event", error);
        }
    );
}

function deleteEvent(eventId){
    event.doc(eventId).delete()
    .catch(function(error)
        {
            console.error("Fail to delete the event", error);
        }
    );
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
    var guest = event.doc(eventId).collection(status);
    guest.doc(email).set({})
    .catch(function(error) {
        console.log("Failed to store invitee guest information for email ", email);
        console.log(error);
    });
}

function inviteGuests(eventId, emails){
    emails.forEach(email => {
            addGuestTo(eventId, email, "invited");
        });
};

function delGuestFrom(eventId, email, status){
    event.doc(eventId).collection(status).doc(email).delete()
    .catch(error=>{
        console.error("Unable to delete guest ", email, " from ", status);
        console.errot(error);
    })    
};

function update_event_in_user_db(eventId, email, updateInfo){
    user_db.doc(email).update(updateInfo).catch(
        error => {
            console.error("Unable to update status of ", eventId, " for ", email);
        }
    )
}

function changeGuestStatus(eventId, status){
    var valid_status = ["tentative", "declined", "attending"];
    if(!valid_status.includes(status)){
        console.warn("Invalid request for changing guest status");
        return;
    }

    var email = firebase.auth().currentUser.email;
    user_db.doc(email).get().then(
        doc => {
            if (!(eventId in doc.data().guest_events)){
                console.log("Current user is not in the event: ", eventId);
                return;
            }
            var usr_data = doc.data();
            var prev_status = usr_data.guest_events[eventId];
            delGuestFrom(eventId, email, prev_status);
            addGuestTo(eventId, email, status);
            usr_data["guest_events"][eventId] = status;
            update_event_in_user_db(eventId, email, usr_data);
        }
    ).catch(function(error) {
        console.log("Failed to change guest information:", error);
    })
}

function testEvent(){
    var eventId = "3K7eHuuOm4w1woJlsQ16";
    var emails = ["tzuyuc@uci.edu", "zoechaozoe@gmail.com"];
    var eventInfo = {
        event_name: "Tom's birthday",
        location: "Irvine",
        message: "Hey Lets celebrate for Tom",
        guests: emails,
        start_time: new Date('2019-12-01T03:24:00')
    };
    //var created_id = createEvent(eventInfo);
    eventInfo.location = "Tustin";
    updateEvent(eventId, eventInfo);
    // inviteGuests(eventId, emails);
    //changeGuestStatus(eventId, "tentative");
};

export {testEvent};
