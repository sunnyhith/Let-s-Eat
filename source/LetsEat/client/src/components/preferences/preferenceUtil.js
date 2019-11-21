import * as firebase from 'firebase';

var db = firebase.firestore();
var user_db = db.collection("users");

async function readPreference(email){
    try{
        var user = await user_db.doc(email).get();
        if(user.exists){
            var preference = {  // convert from list to maps
                                "dietery_restriction": Object.keys(user.data().dietery_restriction),
                                "cusine": Object.keys(user.data().cusine)
                             }
            return preference;
        }
        else{
            console.log("Attempted to read a user preference that does not exist!");
        }
    }
    catch(error){
        console.log("Failed to read a user preference from database. ", error);
    }
    return null;
}

function updatePreference(email, preference){
    // convert to a list
    var cusine_map = preference.cusine.reduce((a,b)=> (a[b]='',a),{});
    var dietery_map = preference.dietery_restriction.reduce((a,b)=> (a[b]='',a),{});
    var pref_map = {
        cusine: cusine_map,
        dietery_restriction: dietery_map
    }
    user_db.doc(email).get().then(user => {
        // if not registered, in the future create the user with email and save name and location
        if(!user.exists){
            console.error("user ", email, " does not exist in the databse.\
                Please create the user in user database first");
            return
        }
    })
    user_db.doc(email).update(pref_map)
    .then(function() {
            console.log("successfully updated the user preference for ", email);
    }).catch(function(error)
        {
            console.error("Fail to update the user preference for ", email);
            console.log(error);
        }
    );
}

async function testPreference(){
    var preference = {
                        "cusine": ["Mexican", "Indian"],
                        "dietery_restriction": []
                    }
    updatePreference("tzuyudc@uci.edu", preference);
    // var pref = await readPreference("tzuyuc@uci.edu");    
    // console.log(pref.dietery_restriction);
}
export {readPreference, updatePreference, testPreference};