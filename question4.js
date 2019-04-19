//ALL JUST TO SETUP THE BASICS, FIRESTORE, ROOM NUMBER, PLAYER NAME

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
var docRefR = firestore.collection("Rooms").doc("1");


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
var docRefP = firestore.collection("players").doc("1");

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

//DONE SETTING UP THE BASICS





//GETTING THE QUESTION
//docRefQ1 = firestore.collection("questions").doc("6");
//
//docRefQ1.get().then(function(doc){
//    if(doc.exists){
//        const questionName = doc.data();
//        console.log("the doc data = ", questionName.question);
//        questionGenerator.innerText = questionName.question;
//    }else{
//        console.log("no such");
//    }
//}).catch(function(error){
//    console.log("error", error);
//});

//GETTING THE QUESTION OPTIONS


docRefTTL = firestore.collection("responses").doc("3");

docRefTTL.get().then(function(doc){
    if(doc.exists){
        const truthLie = doc.data();
        console.log("the truths are " + truthLie.truth1 + " " + truthLie.truth2 + "and the lie is " + truthLie.lie);
        truth1.innerText = truthLie.truth1;
        truth2.innerText = truthLie.truth2;
        lie.innerText = truthLie.lie;
    }else{
        console.log("no such");
    }
}).catch(function(error){
    console.log("error", error);
});


lie.addEventListener("click", function(){

       questionGenerator.innerText = "CORRECT";
});














































