// Code to look at



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
