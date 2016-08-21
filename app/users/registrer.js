(function() {
	function regitrerUser() {
		var email= 'test@email.com';
		var password = '12345678';
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorMessage);
		})
		.then(function(response) {
			// response.uid
			console.log(response);
			var keyID = response.uid;
			firebase.database().ref('users').push({
				userId: keyID,
				userName: 'name2'
			 });
		});
	}
} ());