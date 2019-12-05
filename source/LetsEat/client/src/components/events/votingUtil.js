import * as firebase from 'firebase';
import { userInfo } from 'os';

var db = firebase.firestore();
var event_db = db.collection("event");
var user_db = db.collection("users");

async function getVoteInfo(eventId){
    var eventInfo = await event_db.doc(eventId).get();
    if(!eventInfo.exists){
        console.error(`${eventId} does not exist`);
        return
    }
    if(! ("restaurants" in eventInfo.data())){
        console.error(`${eventId} does not have restaurant list generated`);
        return
    }

    var vote_cnt = [];
    var is_voted = [];
    var voter = firebase.auth().currentUser.email;

    var restaurants =  eventInfo.data()["restaurants"];
    for(var restaurant of restaurants){
        vote_cnt.push(restaurant.cnt);
        is_voted.push(voter in restaurant.voter);
    }
    var voteInfo = {
                    vote_cnt: vote_cnt,
                    is_voted: is_voted
                   }
    return voteInfo;
}

async function changeVote(eventId, vote_ind){
    var eventInfo = await event_db.doc(eventId).get();
    if(!eventInfo.exists){
        console.warn(`${eventId} does not exist`);
        return
    }
    if(! ("restaurants" in eventInfo.data())){
        console.warn(`${eventId} does not have restaurant list generated`);
        return
    }
    var restaurants =  eventInfo.data()["restaurants"];
    if(!(0 <= vote_ind < restaurants.length)){
        console.warn(`the resturant index is invalid. Fail to set vote for ${eventId}`);
        return
    }

    var voter = firebase.auth().currentUser.email;

    if(voter in restaurants[vote_ind]["voter"]){
        restaurants[vote_ind]["cnt"] -= 1;
        delete restaurants[vote_ind]["voter"][voter]; 
    }
    else{
        restaurants[vote_ind]["cnt"] += 1;
        restaurants[vote_ind]["voter"][voter] = ""; 
    }
    event_db.doc(eventId).update({restaurants: restaurants});   
}

async function testVote(){
    var eventId = "HoYaNHE2xokKgejZjOcx";
    changeVote(eventId, 0);
}

export {changeVote, testVote, getVoteInfo};
