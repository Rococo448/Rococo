
//Initializing Firebase
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

//Reference to Room
const docRef1 = firestore.collection("Room1");

//==========================HTMLTEXTS/BUTTONS=================//
//Output room# and Input room#
const roomNumberShown = document.querySelector("#roomNumberShown");
const roomID = document.querySelector("#roomID");

//Output playerName and Input playerName
const playerNameShown = document.querySelector("#nicknameOutput");
const playerName = document.querySelector("#playerName");

//Join Room Button
const joinRoomButton = document.getElementById("joinRoom");

//Response Text Field
const response = document.getElementById("response");

//=========================BUTTON CLICKS===================//
//JOIN ROOM BUTTON CLICK
//First - save the room# input and playerName input to firestore
//Second - put the room# and playerName at the top of the screen
//Third - erase the unneeded text field and buttons
//Fourth - call the changeQuestion function
//         ...this function gets a question from the database and displays it
//          ...this function also unblocks a text entry and button to collect responses
joinRoom.addEventListener("click", function(){
    const roomToSave = roomID.value;
    const playerToSave = playerName.value;
    console.log("I am going to save " + roomToSave + " and " + playerToSave + " to Firestore");
    docRef1.doc(playerToSave).set({
        playerName: playerToSave,
        roomNumber: roomToSave,
        score: "0"
    }).then(function(){
        //SAVE THE COOKIE!!!
        //create a cookie
        //document.cookie = playerToSave;
        document.cookie = "playerName" + "=" + playerToSave + ";"


        console.log("Document written with Room ID: ", docRef1.id);
        playerNameShown.innerHTML = playerToSave;
        roomNumberShown.innerHTML = roomToSave;

        //need to change the way the page looks!
        playerNameShown.style.fontSize = "12px";
        playerName.style.display = "none";

        roomNumberShown.style.fontSize = "12px";
        roomID.style.display = "none";

        joinRoomButton.style.display = "none";

        //getResponseQuestion("1");
        //getSpecialQuestion();
        getMCQuestion();


    }).catch(function(error){
        console.error("Got an error: ", error);
    })
})

//SUBMIT RESPONSE BUTTON CLICK
// saves the question output and response in the
// questions response collection which containes multiple
// players responses by getting cookies
//
submitResponse.addEventListener("click", function(){
    const questionToSave = questionOutput.value;
    const responseToSave = response.value;

    console.log("current question = " + questionToSave);

    //Get Random Number WITH COOKIE
    var p = getCookie("playerName");
    var r = getCookie("randomNumber");
    var q = getCookie("question");

    console.log("p = " + p + " r = " + r);

    const docRefQ = firestore.collection("questions").doc(r).collection("responses").doc(p);
    console.log("I am going to save " + p + "'s response to Firestore in this question: " + q + "'s player responses");

    docRefQ.set({
        response: responseToSave
        }).catch(function(error){
        console.error("Got an error: ", error);
    });



    getResponseQuestion("1");
    //getSpecialQuestion();
    //getMCQuestion();

})

//========================FUNCTIONS=============================//
//HIDING THE QUESTION STUFF
function doSomething(){
    var q = document.getElementById("questionOutput");
    var r = document.getElementById("response");
    var sr = document.getElementById("submitResponse");

    q.style.display = "none";
    r.style.display = "none";
    sr.style.display = "none";
}


//GETTING A COOKIE
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//GETTING A RESPONSE QUESTION
function getResponseQuestion(n){
    var q = document.getElementById("questionOutput");
    q.style.display = "block";
    var r = document.getElementById("response");
    var sr = document.getElementById("submitResponse");
    r.style.display = "block";
    sr.style.display = "block";

    //Get Random Number
    var randN = Math.floor(Math.random() * 10);
    const docRefQ = firestore.collection("questions").doc(randN.toString());
    //Save Random Number WITH COOKIE
    document.cookie = "randomNumber" + "=" + randN + ";"
    console.log("after setting randomNumber to " + randN);


    if(n == 1){
        console.log("made it in");
        //const docRefQ = firestore.collection("questions").doc("1");
        //Math.floor(Math.random() * 10);
//        var randN = Math.floor(Math.random() * 10);
//        const docRefQ =           firestore.collection("questions").doc(randN.toString());
        docRefQ.get().then(function(doc){
            if(doc.exists){
                const questionName = doc.data();
                console.log("the doc data = ", questionName.question);
                //Save question WITH COOKIE
                document.cookie = "question" + "=" + questionName.question + ";"
                questionOutput.innerText = questionName.question;
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });
    }
    //    else if(n == 2){
    ////        const randN = (Math.floor(Math.random() * 10)).toString();
    ////        const docRefQ = firestore.collection("questions").doc(randN);
    //
    //        docRefQ.get().then(function(doc){
    //            if(doc.exists){
    //                const questionName = doc.data();
    //                console.log("the doc data = ", questionName.question);
    //                questionOutput.innerText = questionName.question;
    //            }else{
    //                console.log("no such");
    //            }
    //        }).catch(function(error){
    //            console.log("error", error);
    //        });
    //    }
}

//GETTING A SPECIAL QUESTION
function getSpecialQuestion(){

    var q = document.getElementById("questionOutput");
    //q.style.display = "block";
    q.innerText = "Special Question";

    var p = getCookie("playerName");
    var r = getCookie("randomNumber");

    firestore.collection("questions").doc("4").collection("responses").where("response", "==", "idk").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const qRs = doc.data();
            q.innerText = q.innerText + qRs.response;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


}

//GETTING A MC QUESTION
function getMCQuestion(n){
    var q = document.getElementById("questionOutput");
    q.style.display = "block";
    var r = document.getElementById("response");
    var sr = document.getElementById("submitResponse");
    r.style.display = "none";
    sr.style.display = "none";

    //Activate question option buttons and score
    var qO1 = document.getElementById("questionOption1");
    qO1.style.display = "block";
    var qO2 = document.getElementById("questionOption2");
    qO2.style.display = "block";
    var qO3 = document.getElementById("questionOption3");
    qO3.style.display = "block";

    //Add a scoreboard
    var s = document.getElementById("score");
    s.style.display = "block";
    s.style.fontSize = "12px";

    var p = getCookie("playerName");

    //Getting current score
        firestore.collection("TestRoom").doc(p).get().then(function(doc){
            if(doc.exists){
                const playerData = doc.data();
                const playerScoreToGet = playerData.score;
                //Save score in a cookie

                document.cookie = "score" + "=" + playerScoreToGet + ";"

                console.log("the players score = " +playerData.score);
                score.innerText = "Score = " + playerScoreToGet;
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });


    //Getting random Multiply choic question

    var randN = Math.floor(Math.random() * 10);
    const docRefQ = firestore.collection("questions").doc("mcg5");


    docRefQ.get().then(function(doc){
            if(doc.exists){
                const questionName = doc.data();
                console.log("the doc data = ", questionName.question);
                //Save question WITH COOKIE
                document.cookie = "question" + "=" + questionName.question + ";"
                questionOutput.innerText = questionName.question;
                questionOption1.innerText = questionName.option1;
                questionOption2.innerText = questionName.option2;
                questionOption3.innerText = questionName.option3;
            }else{
                console.log("no such");
            }
        }).catch(function(error){
            console.log("error", error);
        });

    //Changing player score
        var p = getCookie("playerName");

        //CORRECT RESPONSE
    questionOption1.addEventListener("click", function(){

        console.log("whats going onongfangoahg");


        //get score from cookie
        var playerScore = getCookie("playerScore");

        //Updating score
        firestore.collection("TestRoom").doc(p).update({
            score: "20"
        }).then(function() {
            score.innerText = "Score = 200";
            console.log("score changed to: ");
        }).catch(function(error) {
            console.error("Error adding doc");
        });

    });

    questionOption2.addEventListener("click", function(){

        console.log("whats going onongfangoahg");


        //get score from cookie
        var playerScore = getCookie("playerScore");

        //Updating score
        firestore.collection("TestRoom").doc(p).update({
            score: "10"
        }).then(function() {
            score.innerText = "Score = 00000";
            console.log("score changed to: ");
        }).catch(function(error) {
            console.error("Error adding doc");
        });

    });

    questionOption3.addEventListener("click", function(){

        console.log("whats going onongfangoahg");


        //get score from cookie
        var playerScore = getCookie("playerScore");

        //Updating score
        firestore.collection("TestRoom").doc(p).update({
            score: "10"
        }).then(function() {
            score.innerText = "Score = 00000";
            console.log("score changed to: ");
        }).catch(function(error) {
            console.error("Error adding doc");
        });

    });


}

