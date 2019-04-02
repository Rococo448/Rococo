//GameplayStuff

var config = {
    apiKey: "AIzaSyBYFOuocBhI3ZMa34HTQQ3OG5iDfItdSS4",
    authDomain: "mywebapp-7bc86.firebaseapp.com",
    databaseURL: "https://mywebapp-7bc86.firebaseio.com",
    projectId: "mywebapp-7bc86",
    storageBucket: "mywebapp-7bc86.appspot.com",
    messagingSenderId: "858961654254"
  };
  firebase.initializeApp(config);

var firestore = firebase.firestore();

//MESSING AROUND
var docRefR = firestore.collection("Rooms").doc("Room");


docRefR.get().then(function(doc){
    if(doc.exists){
        const classRooms = doc.data();
        console.log("the doc data = ", classRooms.roomNumber);
        roomID.innerText = "Room # = " + classRooms.roomNumber;

    }else{
        console.log("no such");
    }
}).catch(function(error){
    console.log("error", error);
});


var docRefP = firestore.collection("players").doc("2");

docRefP.get().then(function(doc){
    if(doc.exists){
        const playerList = doc.data();
        console.log("the doc data = ", playerList.nickName);
        latestNickname.innerText = "Player = " + playerList.nickName;

    }else{
        console.log("no such");
    }
}).catch(function(error){
    console.log("error", error);
});


const docRefG = firestore.collection("Games").doc("hobbyhunt");

docRefG.get().then(function(doc){
    if(doc.exists){
        const playerData = doc.data();
        console.log("the doc data = ", playerData.hobby + playerData.name);
        gameInfo.innerText = playerData.hobby + " is " + playerData.name + "'s favorite hobby";

    }else{
        console.log("no such");
    }
}).catch(function(error){
    console.log("error", error);
});


if(selectTrue){
    selectTrue.addEventListener("click", function(){
        gameInfo.innerText = "You're Right!";
    });
}

if(selectFalse){
    selectFalse.addEventListener("click", function(){
        gameInfo.innerText = "No!";
    });
}



