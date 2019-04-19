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

const docRef1 = firestore.collection("Rooms").doc("10");

const roomNumberShown = document.querySelector("#roomNumberShown");
const roomID = document.querySelector("#roomID");

const outputHeader = document.querySelector("#nicknameOutput");
const playerName = document.querySelector("#playerName");

//joinRoom.addEventListener("click", function(){
//    const roomToSave = roomID.value;
//    const playerToSave = playerName.value;
//    console.log("I am going to save " + roomToSave + " and " + playerToSave + "to Firestore");
//    docRef1.set({
//        playerName: playerToSave,
//        roomNumber: roomToSave,
//        playerID: docRef1.id
//    }).then(function(){
//        console.log("Document written with ID: ", docRef1.id);
//        outputHeader.innerHTML = playerToSave;
//        roomNumberShown.innerHTML = roomToSave;
//        window.location.href = "roomjoined.html";
//    }).catch(function(error){
//        console.error("Got an error: ", error);
//    })
//})

joinRoom.addEventListener("click", function(){
firestore.collection("Rooms").doc("10").collection("Players").add({
    name: playerName.value,
    roomNumber: roomID.value
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    nicknameOutput.innerText = playerName.value;
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
    //window.location.href = "roomjoined.html";
})


//ANONYMOUS
//firebase.auth().signInAnonymously().catch(function(error) {
//  // Handle Errors here.
//  var errorCode = error.code;
//  var errorMessage = error.message;
//  // ...
//});

//firebase.auth().onAuthStateChanged(function(user) {
//  if (user) {
//    // User is signed in.
//    var isAnonymous = user.isAnonymous;
//    var uid = user.uid;
//    // ...
//  } else {
//    // User is signed out.
//    // ...
//  }
//  // ...
//});

//MESS AROUND
//const auth = firestore.auth();
//auth.signInAnonymously();
//
//auth.signOut();
//
//auth.onAuthStateChanged(user => {});

login.addEventListener("click", function(){
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
      console.log("signed in");
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
});
});


//
//firebase.auth().onAuthStateChanged(firestoreUser => {
//
//})


//firebase.auth().onAuthStateChanged(function(user){
//    if(user){
//
//    }else{
//
//    }
//});

var user = firebase.auth().currentUser;
if(user){
    //signed in
}else{
    //no user signed in
}
// GET USER PROFILE
//var user = firebase.auth().currentUser;
//var name, email, photoUrl, uid, emailVerified;
//
//if (user != null) {
//  name = user.displayName;
//  email = user.email;
//  photoUrl = user.photoURL;
//  emailVerified = user.emailVerified;
//  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//                   // this value to authenticate with your backend server, if
//                   // you have one. Use User.getToken() instead.
//}
//UPDATE USER
//var user = firebase.auth().currentUser;
//
//user.updateProfile({
//  displayName: "Jane Q. User",
//  photoURL: "https://example.com/jane-q-user/profile.jpg"
//}).then(function() {
//  // Update successful.
//}).catch(function(error) {
//  // An error happened.
//});



//MESS AROUND




//db.collection("users").doc("frank").update({
//    "age": 13,
//    "favorites.color": "Red"
//})
//.then(function() {
//    console.log("Document successfully updated!");
//});

// Add a new document with a generated id.



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
//}

//Getting collection inside of a doc
//collection("").doc().collection("")



getRealtimeUpdates = function(){
    docRef1.onSnapshot(function (doc){
        if(doc && doc.exists){
            const myData = doc.data();
            console.log("Check out this document I recieved", doc);
            roomNumberShown.innerHTML = "Room #: " + myData.roomNumber;
        }
    });
}

getRealtimeUpdates();
