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
			signUp: signUp
		};

		function signIn(email, pass) {
			var userDefer = $q.defer();

			firebase.auth().signInWithEmailAndPassword(email, pass)
			.catch(function(error) {
				userDefer.reject(error);
			})
			.then(function(response) {
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
				var keyID = response.uid;
				firebase.database().ref('users').push({
					userId: keyID,
					userName: name
				 });
			});
			return userDefer.promise;
		}
	}])


	.controller('Userstroller', ['$scope', 'UserService', Userstroller]);
	function Userstroller($scope, UserService) {
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
				$scope.loginError = false;
				console.log('res', response);
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
	}
} ());