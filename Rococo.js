
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


//add player with a room #

//creating variables by gathering info from html


//HIDING THE QUESTION STUFF
function doSomething(){
    var q = document.getElementById("questionOutput");
    var r = document.getElementById("response");
    var sr = document.getElementById("submitResponse");

    q.style.display = "none";
    r.style.display = "none";
    sr.style.display = "none";
}

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

//Reference to Room Collection
const docRef1 = firestore.collection("TestRoom");

//Output room# and Input room#
const roomNumberShown = document.querySelector("#roomNumberShown");
const roomID = document.querySelector("#roomID");

//Output playerName and Input playerName
const playerNameShown = document.querySelector("#nicknameOutput");
const playerName = document.querySelector("#playerName");

//Join Room Button
const joinRoomButton = document.getElementById("joinRoom");


//Join Room button click
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
        roomNumber: roomToSave
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

        changeQuestion("1");


    }).catch(function(error){
        console.error("Got an error: ", error);
    })
})

//GET RANDOM QUESTION
//function getQuestionNumber(){
//    Math.floor(Math.random() * 10);
//}
//CHANGE QUESTION
function changeQuestion(n){
    var q = document.getElementById("questionOutput");
    q.style.display = "block";
    var r = document.getElementById("response");
    var sr = document.getElementById("submitResponse");
    r.style.display = "block";
    sr.style.display = "block";

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
//        const docRefQ = firestore.collection("questions").doc(randN.toString());

        docRefQ.get().then(function(doc){
            if(doc.exists){
                const questionName = doc.data();
                console.log("the doc data = ", questionName.question);
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

const response = document.getElementById("response");

submitResponse.addEventListener("click", function(){
    const questionToSave = questionOutput.value;
    const responseToSave = response.value;

    console.log("current question = " + questionToSave);

    //Get Random Number WITH COOKIE
    var p = getCookie("playerName");
    var r = getCookie("randomNumber");

    console.log("p = " + p + " r = " + r);

    const docRefQ = firestore.collection("questions").doc(r).collection("responses").doc(p);
    console.log("I am going to save " + p + "'s response to Firestore in this question: " + questionToSave + "'s player responses");

    docRefQ.set({
        response: responseToSave
        }).catch(function(error){
        console.error("Got an error: ", error);
    });


    changeQuestion("1");

})




//HIDING AND SHOWING THINGS IN JS
//function changeQuestion(q){
//    var a = document.getElementById("changeArea");
//
//    var header1 = document.getElementById("nicknameOutput");
//    var header12 = document.getElementById("playerName");
//
//    var header2 = document.getElementById("roomNumberShown");
//    var header22 = document.getElementById("roomID");
//
//    var button = document.getElementById("joinRoom");
//
//
//    if(q == 1){
//        a.innerHTML = "name";
//        a.style.display = "none";
//
//        header1.style.fontSize = "12px";
//        header12.style.display = "none";
//
//        header2.style.fontSize = "12px";
//        header22.style.display = "none";
//
//        button.style.display = "none";
//
//    }
//    else if(q == 2){
//         a.innerHTML = "room";
//        a.style.display = "block";
//    }else if(q == 3){
//        a.style.display = "none";
//        a.innerHTML = "question";
//
//                }
//    else if(a.style.display == "none"){
//        a.style.display = "block;"
//    }else {
//        a.style.display = "none";
    //}
//}



// GETTING DATA
//docRefQ1 = firestore.collection("questions").doc("1");
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




// SETTING/ADDING/UPDATING DATA
//if(joinRoom){
//firestore.collection("players").add({
//    name: playerName.value,
//    roomNumber: roomID.value
//})
//.then(function(docRef) {
//    console.log("Document written with ID: ", docRef.id);
//})
//.catch(function(error) {
//    console.error("Error adding document: ", error);
//});
//
//}





//HIDING AND SHOWING THINGS IN JS
//function myFunction(){
//    var x = document.getElementById("myDIV");
//    if(x.style.display == "none"){
//        x.style.display = "block;"
//    }else {
//        x.style.display = "none";
//    }
//}
// HIDING AND SHOWING IN HTML
//   <script>
//            function changeQuestion(q){
//                var a = document.getElementById("changeArea");
//                if(q == 1){
//                    a.innerHTML = "name";
//                }
//                else if(q == 2){
//                    a.innerHTML = "room";
//                }else if(q == 3){
//                    a.innerHTML = "question";
//                }
//            }
//        </script>
//
//EXTRA HTML CODE
//<p></p>
//        <a href = "#" onclick="changeQuestion(1);">Question 1</a>
//        <a href = "#" onclick="changeQuestion(2);">Question 2</a>
//        <a href = "#" onclick="changeQuestion(3);">Question 3</a>
//
//        <div id= "changeArea">
//        hello
//        </div>
//

//SET A COOKIE
//function setCookie(cname, cvalue, exdays) {
//  var d = new Date();
//  d.setTime(d.getTime() + (exdays*24*60*60*1000));
//  var expires = "expires="+ d.toUTCString();
//  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//}
//
//GET A COOKIE
//function getCookie(cname) {
//  var name = cname + "=";
//  var decodedCookie = decodeURIComponent(document.cookie);
//  var ca = decodedCookie.split(';');
//  for(var i = 0; i <ca.length; i++) {
//    var c = ca[i];
//    while (c.charAt(0) == ' ') {
//      c = c.substring(1);
//    }
//    if (c.indexOf(name) == 0) {
//      return c.substring(name.length, c.length);
//    }
//  }
//  return "";
//}
//
//CHECK A COOKIE
//function checkCookie() {
//  var username = getCookie("username");
//  if (username != "") {
//   alert("Welcome again " + username);
//  } else {
//    username = prompt("Please enter your name:", "");
//    if (username != "" && username != null) {
//      setCookie("username", username, 365);
//    }
//  }
//}
