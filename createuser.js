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


//creating variables by gathering info from html
const outputHeader = document.querySelector("#nicknameOutput");
const inputTextField = document.querySelector("#playerName");
const createUser = document.querySelector("#loginButton");
const joinRoomButton = document.querySelector("#joinRoomButton");


var x;

createUser.addEventListener("click", function(){

    x = inputTextField.value;

    //firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
//    console.log("sign in anon");
//    firebase.auth().signInAnonymously().catch(function(error){
//
//    var errorCode = error.code;
//    var errorMessage = error.message;
//
//    });
});


joinRoomButton.addEventListener("click", function(){

    x = inputTextField.value;

//    firebase.auth().onAuthStateChanged(function(user){
//        if(user){
//            console.log("users signed in");
//            user.updateProfile({
//              displayName: "Jane Q. User"
//            }).then(function() {
//              // Update successful.
//            }).catch(function(error) {
//              // An error happened.
//            });
//        }else{
//            console.log("no user signed in")
//        }
//    })

            window.location.href = "tester2.html";
});


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
//var user = firebase.auth().currentUser;
//
//if (user) {
//  // User is signed in.
//} else {
//  // No user is signed in.
//}
