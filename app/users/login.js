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
			var businessDefer = $q.defer();

			firebase.auth().signInWithEmailAndPassword(email, pass)
			.catch(function(error) {
				businessDefer.reject(error);
			})
			.then(function(response) {
				businessDefer.resolve(response);
			});
			return businessDefer.promise;
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
				console.log('res', response);
				$scope.test = response;
			});
		};
	}
} ());