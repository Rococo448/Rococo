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

//Setting the room #
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

// Setting the player name
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

//Getting the question and setting it up
const docRefG = firestore.collection("questions").doc("hobbyQuestion");

docRefG.get().then(function(doc){
    if(doc.exists){
        const hobbyQuestion = doc.data();
        console.log("the doc data = ", hobbyQuestion.hobby);
        gameInfo.innerText = hobbyQuestion.hobby + " is _______________'s favorite hobby";

    }else{
        console.log("no such");
    }
}).catch(function(error){
    console.log("error", error);
});

//making buttons names
const docRefNO = firestore.collection("players").doc("2");

//Putting player 1 there

docRefNO.get().then(function(doc){
    if(doc.exists){
        const playerName = doc.data();
        console.log("the doc data = ", playerName.nickName);
        selectName1.innerText = playerName.nickName;

    }else{
        console.log("no such");
    }
}).catch(function(error){
    console.log("error", error);
});

//Saying Right or Wrong (adding point)

if(selectName1){
    selectName1.addEventListener("click", function(){
        gameInfo.innerText = "No it isn't";
        window.location.href = "mingjunquestion.html";
    });
}
if(selectName2){
    selectName2.addEventListener("click", function(){
        gameInfo.innerText = "Yep!";
        window.location.href = "leiquestion.html";
    });
}
if(selectName3){
    selectName3.addEventListener("click", function(){
        gameInfo.innerText = "No it isn't!";
    });
}
if(selectName4){
    selectName4.addEventListener("click", function(){
        gameInfo.innerText = "No it isn't!";
    });
}


