import * as firebase from 'firebase';
import {getSuggestions} from "components/suggest-restaurant/preferenceStats";

var db = firebase.firestore();
var event_db = db.collection("event");

function merge_category(categories){
    var category_list = [];
    for(var category of categories){
        category_list.push(category.title);
    }
    return category_list;
}

async function cleanup_restaurants_data(restaurants){
    var cleanup_restaurants = [];
    for(var restaurant of restaurants){
        var cleanup_restaurant = {
            id: restaurant.id,
            name: restaurant.name? restaurant.name: "NA",
            price: restaurant.price? restaurant.price: "NA",
            categories: merge_category(restaurant.categories),
            rating: restaurant.rating? restaurant.rating:"NA",
            review_count: restaurant.review_count? restaurant.review_count: 0,
            url: restaurant.url,
            phone: restaurant.display_phone?restaurant.display_phone:"NA",
            address: restaurant.location.display_address
        }
        cleanup_restaurants.push(cleanup_restaurant);
    }
    return cleanup_restaurants;
}

async function create_sugst_save_to_db(eventId){
    var suggestions = await getSuggestions(eventId);
    var cleanup_suggestions = await cleanup_restaurants_data(suggestions);
    event_db.doc(eventId).update({
        restaurants: cleanup_suggestions
    })
}

async function read_sugst_from_db(eventId){
    try{
        var event = await event_db.doc(eventId).get();
        if(!event.exists){
            console.warn("event ", eventId, "does not exist");
            return;
        }
        var suggestions = event.data().restaurants;
        if(suggestions === undefined){
            console.warn("suggestion for ", eventId, " event is not yet generated.");
        }
        return suggestions;
    }
    catch(error){
        console.warn(error);
    }
}

async function testSuggest(){
    console.log("Entering test fcn");
    var eventId = "SW3vtMVhLzFkpJjQmFJd";
    await create_sugst_save_to_db(eventId);
    console.log("Finish saveSuggestionInDb");
    // var suggestions = await read_sugst_from_db(eventId);
    // console.log("suggestions is", suggestions);
}

export {testSuggest, create_sugst_save_to_db}