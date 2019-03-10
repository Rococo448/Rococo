// Code to look at

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
