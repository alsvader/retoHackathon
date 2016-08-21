(function() {
	'use strict';
	angular.module('addProyect', [])
/*
	.service('CallService', ['$q', function($q){

	}])
*/
	.controller('ProyectController', ['$scope', ProyectController
		]);

	var db = firebase.database();

	function ProyectController($scope, CallService) {

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

			
		}
	}
} ());