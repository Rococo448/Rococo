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


// Setting Room # and Name

//const roomNumber = document.querySelector("#roomID");
//const playerName = document.querySelector("#latestNickname");
//
//const docRefR = firestore.doc("Rooms/Room");
//
//const roomData = docRefR.get();
//
//roomNumber.innerHTML = "Room # " + roomData.roomNumber;

//Question stuff

//questionOutput.inner



//DISPLAYING QUESTION


const docRefQ = firestore.collection("questions").doc("2");

docRefQ.get().then(function(doc){
    if(doc.exists){
        const questionStuff = doc.data();
        console.log("the doc data = ", questionStuff.Question);
        questionOutput.innerText = "Question = " + questionStuff.Question;

    }else{
        console.log("no such");
    }
}).catch(function(error){
    console.log("error", error);
});



//DISPLAYING OPTIONS AND LINKING TO CORRECT OR INCORRECT WEB PAGE

















//Collecting Answer
const docRefA = firestore.collection("questions").doc("question");

const questionAnswer = document.querySelector("#questionAnswer");
const submitAnswer = document.querySelector("#submitAnswer");

submitAnswer.addEventListener("click", function(){
    const textToSave = questionAnswer.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docRefA.set({
        answer: textToSave
    }).then( function(){
        console.log("Status saved!");
    }).catch( function(){
        console.log("Got an error: ", error);
    })
})

//getQuestion.addEventListener("click", function(){
//   questionOutput.innerHTML = firestore.collection("questions").doc("question").get("question").toString;
//})

getRealtimeUpdates = function(){
    docRefA.onSnapshot(function (doc){
        if(doc && doc.exists){
            const myData = doc.data();
        }
    });
}

getRealtimeUpdates();
