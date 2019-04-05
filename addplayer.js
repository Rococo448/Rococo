

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
