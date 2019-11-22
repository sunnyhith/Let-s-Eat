import * as firebase from 'firebase';

var db = firebase.firestore();
var user_db = db.collection("users");

async function readPreference(email){
    try{
        var user = await user_db.doc(email).get();
        if(user.exists){
            var preference = { 
                                "dietaryRestrictions": Object.keys(user.data().dietaryRestrictions),
                                "favCuisines": Object.keys(user.data().favCuisines),
                                "pricePreference": Object.keys(user.data().pricePreference),
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

// function updatePreference(email, preference){
//     console.log("preference in util is:", preference);
//     // convert to a list
//     var cusine_map = preference.favCuisines.reduce((a,cusine)=> (a[cusine.label]='', a), {});
//     var dietery_map = {}; //preference.dietaryRestrictions.reduce((a,b)=> (a[b.label]='', a),{});
//     var price_map = {};//preference.pricePreference.reduce();

//     var pref_map = {
//         hasPreferences: true,
//         name: preference.firstName + " " + preference.lastName,
//         currentLocation: preference.currentLocation,
//         favCuisines: cusine_map,
//         dietaryRestrictions: dietery_map,
//         pricePreference: price_map
//     }
//     user_db.doc(email).get().then(user => {
//         // if not registered, in the future create the user with email and save name and location
//         if(!user.exists){
//             console.error("user ", email, " does not exist in the databse.\
//                 Please create the user in user database first");
//             return
//         }
//     })

//     user_db.doc(email).update(pref_map)
//     .then(function() {
//             console.log("successfully updated the user preference for ", email);
//     })
// }

async function testPreference(){
    var preference = {
                        "favCuisines": ["Mexican", "Indian"],
                        "dietaryRestrictions": []
                    }
    // updatePreference("tzuyudc@uci.edu", preference);
    var pref = await readPreference("tzuyuc@uci.edu");    
    console.log(pref.favCuisines);
}
export {readPreference, testPreference};