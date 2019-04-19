/Initializing Firebase
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



//Setting a document Reference



////Creating a randomly numbered document for a player
//const rN = Math.floor(Math.random()* Math.floor(10));

const docRef = firestore.collection("players").doc("1");

//creating variables by gathering info from html
const outputHeader = document.querySelector("#nicknameOutput");
const inputTextField = document.querySelector("#latestNickname");
const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", function() {
    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docRef.set({
        nickName: textToSave
    }).then(function(){
        console.log("Status saved!");
    }).catch(function(){
        console.log("Got an error: ", error);
    })
})

// To update age and favorite color:
//db.collection("users").doc("frank").update({
//    "age": 13,
//    "favorites.color": "Red"
//})
//.then(function() {
//    console.log("Document successfully updated!");
//});

// Add a new document with a generated id.
//db.collection("cities").add({
//    name: "Tokyo",
//    country: "Japan"
//})
//.then(function(docRef) {
//    console.log("Document written with ID: ", docRef.id);
//})
//.catch(function(error) {
//    console.error("Error adding document: ", error);
//});

//Getting collection inside of a doc
//collection("").doc().collection("")


getRealtimeUpdates = function(){
    docRef.onSnapshot(function (doc){
        if(doc && doc.exists){
            const myData = doc.data();
            console.log("Check out this document I recieved", doc);
            outputHeader.innerHTML = "Player =" + myData.nickName;
        }
    });
}

getRealtimeUpdates();

