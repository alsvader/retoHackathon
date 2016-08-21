/**
*  Module
*
* Description
*/

(function() {
	'use strict';
	angular.module('convocatoriesLists', [])
	.service('convocatoriaService', ['$q', function($q){
		return{
			listaConvocatoria:listaConvocatoria
		};
		function listaConvocatoria(){      
			
		}
	}])

	.controller('convocatoriesListController', ['$scope', 'convocatoriaService', ConvocatoriesListController]);
	function ConvocatoriesListController($scope, convocatoriaService) {		
        	firebase.database().ref('convocatoria/').on('value', function(snapshot) {
        		var data;
                 var objeto = snapshot.val();
                 for(var propiedad in objeto){
	                data="<div class=\"col-sm-4 ng-binding\">";                
	                data+="<div class=\"panel panel-card\">";
	                data+="<div class=\"item\">";
	                data+="<img src=\"assets/images/c5.jpg\" class=\"w-full r-t\" alt=\"Washed Out\">";
	                data+="</div><a href=\"view.convocatoria.html?v="+propiedad+"\" md-ink-ripple=\"\" class=\"md-btn md-fab md-raised pink m-r md-fab-offset pull-right waves-effect waves-effect\">";
	                data+="<i class=\"fa fa-eye i-24\"></i></a>";              
	                data+="<div class=\"p\">"
	                data+="<h3>"+objeto[propiedad].nombre+"</h3><p>"+objeto[propiedad].descripcion+"</p></div> </div> </div>";    
                 }  
                 $scope.lista=data;
                 $('.row').html(data);         
            });   	       	
	}
	
	angular.module('convocatoriaOne', [])
	.service('convocatoriaUno', ['$q', function($q){
		return{
			convoca:convoca
		};
		function convoca(xValor){     
			var userDefer = $q.defer();
			firebase.database().ref('convocatoria/' +xValor ).on('value', function(snapshot) {
				var objeto = snapshot.val();
				userDefer.resolve(objeto);
				console.log('sdjbs', objeto);
			});
			return userDefer.promise;
		}
	}])
	.controller('getController', ['$scope', 'convocatoriaUno', getController]);
	function getController($scope, convocatoriaUno) {	
		var url = window.location.href;
      	var x= url.split('?');
      	var valor=x[1].substring(2,x[1].lenght);
      	$scope.xCriterios =[];
      	$scope.xJurados=[];
    	convocatoriaUno.convoca(valor).then(function(response){
    		console.log(response);
    		$scope.xNombre=response.nombre;
    		$scope.xDescripcion=response.descripcion;
    		$scope.xCriterios = response.lista_ce;
    		$scope.xJurados=response.lista_ju;
;    	});
    }

}());