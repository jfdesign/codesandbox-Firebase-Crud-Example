//In Firebase make sure your in the database and not the store
//Update the rules for the database
//Get API from account

//From Firbase
var firebaseConfig = {
  //apiKey: "",
  authDomain: "crud-api-8bb56.firebaseapp.com",
  databaseURL: "https://crud-api-8bb56.firebaseio.com",
  projectId: "crud-api-8bb56",
  storageBucket: "crud-api-8bb56.appspot.com",
  messagingSenderId: "391815000566",
  appId: "1:391815000566:web:30db75c544c10eddb8d7d7"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
//var storage = firebase.storage();
