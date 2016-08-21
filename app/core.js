(function() {
	'use strict';
	angular.module('core', ['loginApp'])
	.run(['$rootScope', '$location', function ($rootScope, $location) {
		$rootScope.$on('$locationChangeStart', function (event) {
			// if (!Auth.isLoggedIn()) {
			// 	console.log('DENY');
			// 	event.preventDefault();
			// 	$location.path('/login');
			// }
			// else {
			// 	console.log('ALLOW');
			// 	$location.path('/home');
			// }
			console.log('paseo');
		});
	}]);
} ());