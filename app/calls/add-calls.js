(function() {
	'use strict';
	angular.module('addCalls', [])
/*
	.service('CallService', ['$q', function($q){

	}])
*/
	.controller('CallController', ['$scope', CallController
		]);

	var db = firebase.database();

	function CallController($scope, CallService) {
		$scope.nombre 			= '';
		$scope.descrip 			= '';
		$scope.archivo 			= '';
		$scope.banner 			= '';
		$scope.tags 			= '';
		$scope.criterio1		= '';
		$scope.criterio2		= '';
		$scope.regFechaInicio	= '';
		$scope.regFechaFin		= '';
		$scope.evaFechaInicio	= '';
		$scope.evaFechaFin		= '';


		$scope.addCall = function(){
			
			db.ref ('convocatoria/').push({
				nombre:							$scope.nombre,
				banner: 						"http://yucatan.com.mx/wp-content/uploads/2016/08/3Hackt%C3%B3n.jpg",
				descripcion: 					$scope.descrip,
				fecha_cierre: 					$scope.evaFechaFin,
				fecha_fin_registro: 			$scope.regFechaFin,
				fecha_inicio_registro: 			$scope.regFechaInicio,
				lista_ce: 						{criterio1: $scope.criterio1, criterio2: $scope.criterio2},
				tags: 							{Social: true, Emprendimiento: true, Innovacion: true},
//				lista_ju: 						{juez1: "ASDSAdasf7421", juez2: "12jbv1yh21cGCFh"},
				lista_ju: 						{ASDSAdasf7421: true, jbv1yh21cGCFh: true},
				maximo_participantes_proyecto: 	"10",
				minimo_participantes_proyecto: 	"1"

			});

			
		}
	}
} ());