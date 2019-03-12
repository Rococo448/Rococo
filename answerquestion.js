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

//Question stuff

const docRefQ = firestore.collection("questions").doc("question");

const questionOutput = document.querySelector("questionOutput");
const questionAnswer = document.querySelector("#questionAnswer");
const submitAnswer = document.querySelector("#submitAnswer");

submitAnswer.addEventListener("click", function(){
    const textToSave = questionAnswer.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docRefQ.set({
        answer: textToSave
    }).then( function(){
        console.log("Status saved!");
    }).catch( function(){
        console.log("Got an error: ", error);
    })
})

getRealtimeUpdates = function(){
    docRefQ.onSnapshot(function (doc){
        if(doc && doc.exists){
            const myData = doc.data();
        }
    });
}

getRealtimeUpdates();
