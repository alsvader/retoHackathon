// Initialize Firebase
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCAmm5enJUX46v6aT4AGG0vuT5rwzkzoT0",
  authDomain: "retoemprendedor-3d622.firebaseapp.com",
  databaseURL: "https://retoemprendedor-3d622.firebaseio.com",
  storageBucket: "retoemprendedor-3d622.appspot.com",
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
console.log(database);