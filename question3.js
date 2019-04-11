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
docRefQ1 = firestore.collection("questions").doc("3");

docRefQ1.get().then(function(doc){
    if(doc.exists){
        const questionName = doc.data();
        console.log("the doc data = ", questionName.question);
        questionGenerator.innerText = questionName.question;
    }else{
        console.log("no such");
    }
}).catch(function(error){
    console.log("error", error);
});




//Adding The Responses to the Players Data

const docRefTR = firestore.collection("responses").doc("3");

const truth1Input = document.querySelector("#truth1");
const truth2Input = document.querySelector("#truth2");

const lieInput = document.querySelector("#lie");


if(submitRs){
    submitRs.addEventListener("click", function(){
        const truth1ToSave = truth1Input.value;
        const truth2ToSave = truth2Input.value;
        const lieToSave = lieInput.value;
        console.log("I am going to save " + truth1ToSave + " and save " + truth2ToSave + " and save " +lieToSave);
        docRefTR.set({
            truth1: truth1ToSave,
            truth2: truth2ToSave,
            lie: lieToSave
        }).then(function(){
    console.log("status saved!");
}).catch(function(error){
    console.log("got an error",error);
})

        window.location.href = "question4.html";


    });
}


































