(function() {
	'use strict';
	angular.module('addProyect', [])
/*
	.service('CallService', ['$q', function($q){

	}])
*/
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

	.controller('ProyectController', ['$scope', 'UserService', ProyectController
		]);

	var db = firebase.database();

	function ProyectController($scope, UserService) {

		$scope.addProyect = function(){
			db.ref ('proyecto/').push({
				nombre:							$scope.nombreProyecto,
				descripcion: 					$scope.descripProyecto,
				enlance_yt: 					"https://www.youtube.com/watch?v=-0gED3rn2Tc",
				archivo_proyecto: 				"www.InserteLigaDelPDFoWordAqui.com",
				lista_participantes: 			$scope.equipoPersonasProyecto,
				lista_tags: 					{JkGrgnJhg4125: true, Bfdedtg123: true, gtdryrddGD: true},
				estatus: 						"En proceso de FeedBack",
				formulario: 					{lista_preguntas: "Seafsvyhft", validado: true},
				idconvocatoria: 				"Gdeeafu124kaksak",
				lista_criterios: 				{XDDtgahsbnk: {Navsddgubbj: true, calificacion: 30, total: 70}}

			});
		};

		angular.element(document).ready(function() {
			UserService.getCurrentUser().then(function(res) {
				res.email = firebase.auth().currentUser.email;
				$scope.userData = res;
				console.log('shjbdhj');
			});
		});
	}
} ());