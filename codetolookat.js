// Code to look at


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







































// Read firestore data from database in the meetups collection
db.collection("meetups").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
        const meetups = doc.data();
        next_title.innerText = meetups.next_title;
        next_desc.innerText = meetups.next_desc;
        next_rsvp_url.href = meetups.next_rsvp_url;
        recent_title.innerText = meetups.recent_title;
        recent_desc.innerText = meetups.recent_desc;
        recent_rsvp_url.href = meetups.recent_rsvp_url;
    });
});

// Show latest room and nickname
var latestNickname = firestore.collection("players").doc("player").get(name);








Map<String, Object> doc = new HashMap<>();
doc.put("uid", currentUser.getUid());
doc.put("name", name);
doc.put("points", score.getTotalScore());
doc.put("details", score.getDetailsToSave());
doc.put("country", countryCode);
FirebaseFirestore db = FirebaseFirestore.getInstance();

//Saving Scores
db.collection("Score")
  .add(doc)
  .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
    @Override
    public void onSuccess(DocumentReference documentReference) {
      Log.d("MyGame", "Score added to firestore");
    }
  })
  .addOnFailureListener(new OnFailureListener() {
    @Override
    public void onFailure(@NonNull Exception e) {
      Log.w("MyGame", "Failed to write score to firestore");
    }
  });
[...]


//Adding players

const functions = require('firebase-functions');
exports.playerCreated = functions.firestore
  .document('players/{playerId}')
  .onCreate(event => {
    // trigger content...
});
