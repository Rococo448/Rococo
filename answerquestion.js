

//Number of Questions

const docRef2 = firestore.collection("questions").doc("question");

const questionOutput = document.querySelector("#questionOutput");
const questionAnswer = document.querySelector("#questionAnswer");
const submitAnswer = document.querySelector("#submitAnswer");

submitAnswer.addEventListener("click", function(){
    const textToSave = questionAnswer.value;
    console.log("I am going to save " + textToSave + " to Firestore");
    docRef2.set({
        answer: textToSave
    }).then( function(){
        console.log("Status saved!");
    }).catch( function(){
        console.log("Got an error: ", error);
    })
})





getRealtimeUpdates = function(){
    docRef2.onSnapshot(function (doc){
        if(doc && doc.exists){
            const myData = doc.data();
        }
    });
}

getRealtimeUpdates();
