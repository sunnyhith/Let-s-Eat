import * as firebase from 'firebase';

var db = firebase.firestore();
var event = db.collection("event");


/*
    For event data....
    can we also save dietery restriction, and mutual food preferences?

    For deleting.....
    // How are we going to delete restaurants and person? 
    // How to retireve the id of the person or restaurants
    // Need to handle no host
*/
// var attendee = {
//     name: "",
//     uid: "",
//     email: "",
//     status: attending, declined, tentative, invited
// };

// var restaurant = {
//     business_id: "",
//     votes: 0
// }

// var eventInfo = {
//     host: {
//          attendee
//     },
//     location: "",
//     event_time: "",
//     deadline: "",
//     message: "",
//     restaurant: {
//          restaurant1, restaurant2,... 
//     },
//     guest: {
//
//     },
//     final_restaurant: restaurant
// }

function createEvent(eventInfo){
    event.add(eventInfo).then(function(docRef) {
        console.log("Created event ", docRef.id);
        return docRef.id;
        }
    )
    .catch(function(error) {
        console.error("Error creating the event.", error);
        return null;
        }
    );
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

function updateEvent(eventId, updateInfo){
    event.doc(eventId).update(updateInfo)
    .then(function() {
            console.log("successfully updated the event ", eventId, "with ", updateInfo);
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

function updateKey(eventId, key, val){
    var field_keys = ["time", "location", "message"];
    if(field_keys.includes(key)){
        var updateInfo = {key: val};
        updateEvent(eventId, updateInfo);
    }
    else{
        console.error(key, " is not modifiable.");
    }
}

function addSubField(eventId, key, val){
    var subcollection = ["guests", "hosts", "restaurants"];
    if(subcollection.includes(key)){
        event.doc(eventId).collection(key).add(val)
        .then( (doc) => {
            return doc.id;
        })
        .catch( (error) => {
            console.error("Fail to add the subcollection to", key);
        })
    }
    else{
        console.error(key, " is not a subcollection field.");
    }
};

function delSubField(eventId, key, keyId){
    // How are we going to delete restaurants and person? 
    // How to retireve the id of the person or restaurants
    // Need to handle no host
    var subcollection = ["guests", "hosts", "restaurants"];
    if(subcollection.includes(key)){
        event.doc(eventId).collection(key).doc(keyId).delete()
        .catch( (error) => {
            console.error("Fail to delete ", keyId, " from subcollection ", key);
        })
    }
    else{
        console.error(key, " is not a subcollection field.");
    }
};

function delPerson(eventId, key, delId){
    var person_field = ["guests", "hosts"];

    if(!person_field.includes(key)){
        console.error(key, " does not store person's information.");
        return;
    }
    event.doc(eventId).collection(key).where("email", "==", delId).get()
    .then((snapshot)=>{ snapshot.docs.forEach(doc =>{
            doc.ref.delete().catch(error =>{
                console.error("Fail to delete ", key, " from subcollection ", key);
            });
        })
    })
};


function testEvent(){
    var eventId = "Y7ertqUYNUCjsm7AKzu7";
    var person = {email: "tom@gmail.com", uid: "sasduhlef", name: "Tom", status: "invited"};
    
    //var personId = addSubField(eventId, "guests", person);

    
    //delSubField(eventId, "guests", personId);
    delPerson(eventId, "guests", "tom@gmail.com");
};

export {testEvent};
