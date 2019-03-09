var docRef2 = firestore.collection(doc("questions/question");
const outputHeader2 = document.querySelector("#questionOutput");
const latestAnswer = document.querySelector("#latestAnswer");
const saveAnswer = document.querySelector("saveAnswer");
const loadAnswer = document.querySelector("loadAnser");


function saver(){
    const answerToSave = latestAnswer.value;
    console.log("I am going to save " + answerToSave + " to Firestore");
    docRef2.set({
        answer: answerToSave
    })
}

if(docRef2 != null && latestAnswer.value != null){
    console.log(latestAnswer.value);
saveAnswer.addEventListener("click", saver)
}

docRef2.onSnapshot(function (doc){
        if(doc && doc.exists){
            const myData = doc.data();
            console.log("Check out this document I recieved", doc);
        }
    });
