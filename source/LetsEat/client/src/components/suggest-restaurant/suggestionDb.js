import * as firebase from 'firebase';
import {createSuggestions} from "components/suggest-restaurant/preferenceStats";

var db = firebase.firestore();
var event_db = db.collection("event");

async function create_sugst_save_to_db(eventId){
    var suggestions = await createSuggestions(eventId);
    event_db.doc(eventId).update({
        restaurants: suggestions
    })
}

async function testSuggest(){
    console.log("Entering test fcn");
    var eventId = "SW3vtMVhLzFkpJjQmFJd";
    await create_sugst_save_to_db(eventId);
    console.log("Finish saveSuggestionInDb");
}

export {testSuggest, create_sugst_save_to_db}