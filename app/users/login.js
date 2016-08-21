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
			signIn: signIn,
			signUp: signUp,
			logout: logout,
			getUserId: getUserId,
			getCurrentUser: getCurrentUser
		};

		function getUserId() {
			return localStorage.getItem('userId');
		}

		function getCurrentUser() {
			var userDefer = $q.defer();
			firebase.database().ref('users/' + getUserId()).on('value', function(snapshot) {
				var objeto = snapshot.val();
				userDefer.resolve(objeto);
				console.log('sdjbs', objeto);
			});
			return userDefer.promise;
		}

		function signIn(email, pass) {
			var userDefer = $q.defer();

			firebase.auth().signInWithEmailAndPassword(email, pass)
			.catch(function(error) {
				console.log(error);
				userDefer.reject(error);
			})
			.then(function(response) {
				console.log(response);
				userDefer.resolve(response);
			});
			return userDefer.promise;
		}

		function signUp(email, pass, name) {
			var userDefer = $q.defer();

			firebase.auth().createUserWithEmailAndPassword(email, pass)
			.catch(function(error) {
			  console.log(error);
			  userDefer.reject(error);
			})
			.then(function(response) {
				console.log(response);
				userDefer.resolve(response);
				var userUid = response.uid;
				//var userPushKey = firebase.database().ref().child('users').push().key;
				// data
				var postData = {
					userId: userUid,
					userName: name
					//userPushId: userPushKey
				};
				// save the data
				var newUserObject = {};
				newUserObject['/users/' + userUid] = postData;
				firebase.database().ref().update(newUserObject);
			});
			//console.log('key: ', firebase.database().ref().child('users').push().key);
			return userDefer.promise;
		}

		function logout() {
			var userDefer = $q.defer();
			firebase.auth().signOut()
			.then(function(response) {
				userDefer.resolve(response);
			}, function(error) {
				userDefer.reject(error);
			});

			return userDefer.promise;
		}
	}])


	.controller('Userstroller', ['$rootScope', '$scope', 'UserService', Userstroller]);
	function Userstroller($rootScope, $scope, UserService) {
		$scope.name = '';
		$scope.email = '';
		$scope.pass = '';
		$scope.test = null;
		$scope.loginError = false;
		$scope.regisSuccess = false;
		$scope.regisError = false;

		$scope.signIn = function() {
			console.log('submit', $scope.email, $scope.pass);
			UserService.signIn($scope.email, $scope.pass)
			.catch(function(error) {
				console.log('errpr', error);
				$scope.loginError = true;
			})
			.then(function(response) {
				var user = firebase.auth().currentUser;
				localStorage.setItem('userId', user.uid);
				window.location.href = 'http://localhost:8080/index.html';
				$scope.loginError = false;
			});
		};

		$scope.logout = function() {
			UserService.logout()
			.then(function(response) {
				console.log(response);
				localStorage.removeItem('userId');
				window.location.href = 'http://localhost:8080/signin.html';
			})
			.catch(function(error) {
				console.log(error);
			});
		};

		$scope.signUp = function() {
			console.log('submit', $scope.email, $scope.pass, $scope.name);
			UserService.signUp($scope.email, $scope.pass, $scope.name)
			.catch(function(error) {
				console.log('errpr', error);
				$scope.regisSuccess = false;
				$scope.regisError = true;
			})
			.then(function(response) {
				console.log('res', response);
				$scope.regisError = false;
				$scope.regisSuccess = true;
			});
		};

		angular.element(document).ready(function() {
			UserService.getCurrentUser().then(function(res) {
				res.email = firebase.auth().currentUser.email;
				$rootScope.userData = res;
			});
		});
	}
} ());