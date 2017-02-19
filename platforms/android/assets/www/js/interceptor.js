angular
    .module('vaiacontecer')
    .factory('Interceptor', Interceptor);


Interceptor.$inject = ['$http', '$q'];


function Interceptor($http, $q) {
    return {
    	'response' : function(response) {

        	return response;
    	},
        'responseError' : function(rejection) {
            console.log(rejection);

            return $q.reject(rejection);
        }
    }
}
