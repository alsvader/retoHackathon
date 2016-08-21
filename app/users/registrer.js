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


/**
*  Module
*
* Description
*/
(function() {
	'use strict';
	angular.module('loginApp', [])


	.service('UserService', ['$q', function($q){
		return {
			signin: signin
		};

		function signin(email, pass) {
			var userDefer = $q.defer();

			firebase.auth().createUserWithEmailAndPassword(email, password)
			.catch(function(error) {
			  console.log(error);
			  userDefer.reject(error);
			})
			.then(function(response) {
				//console.log(response);
				userDefer.resolve(response);
				var keyID = response.uid;
				firebase.database().ref('users').push({
					userId: keyID,
					userName: 'name2'
				 });
			});

			console.log('key: ', firebase.database().ref().child('users').push().key);
			return userDefer.promise;
		}
	}])


	.controller('LoginController', ['$scope', 'UserService', LoginController]);
	function LoginController($scope, UserService) {
		$scope.email = '';
		$scope.pass = '';
		$scope.test = null;

		$scope.name = 'josesds';

		$scope.signin = function() {
			console.log('submit', $scope.email, $scope.pass);
			UserService.signin($scope.email, $scope.pass)
			.catch(function(error) {
				console.log('errpr', error);
				$scope.test = 'fallo';
			})
			.then(function(response) {
				//console.log('res', response);
				$scope.test = response;
			});
		};
	}
} ());