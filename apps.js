//InitializeFirebase
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


const docRef = firestore.doc("samples/sandwichData");
const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latestHotDogStatus");
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");

saveButton.addEventListener("click", function() {
    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docRef.set({
        hotDogStatus: textToSave
    }).then(function(){
        console.log("Status saved!");
    }).catch(function(){
        console.log("Got an error: ", error);
    })
})

if(loadButton){
loadButton.addEventListener("click", function() {
    docRef.get().then(function(doc) {
        if(doc && doc.exists){
            const myData = doc.data();
            outputHeader.innerHTML = "Hot dog status: " + myData.hotDogStatus;
        }
    }).catch(function (error){
        console.log("Got an error: ", error);
    });

                            });
} else{console.log("Somethings fucked")}

getRealtimeUpdates = function(){
    docRef.onSnapshot(function (doc){
        if(doc && doc.exists){
            const myData = doc.data();
            console.log("Check out this document I recieved", doc);
            outputHeader.innerHTML = "Hot dog status: " + myData.hotDogStatus;
        }
    });
}

getRealtimeUpdates();


//
