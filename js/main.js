    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCAmm5enJUX46v6aT4AGG0vuT5rwzkzoT0",
      authDomain: "retoemprendedor-3d622.firebaseapp.com",
      databaseURL: "https://retoemprendedor-3d622.firebaseio.com",
      storageBucket: "retoemprendedor-3d622.appspot.com",
    };
    firebase.initializeApp(config);
	var db = firebase.database(),
	    auth = firebase.auth(),
	    proveedor = new firebase.auth.GoogleAuthProvider();



