angular
    .module('vaiacontecer')
    .factory('AuthService', AuthService);


AuthService.$inject = ['$http', 'BASE_REST_API_LOGIN'];


function AuthService($http, BASE_REST_API_LOGIN) {
    var service = {
        login : _login
    }

    var _userToken;


    return service;


    function _login(user) {
        return $http.post(BASE_REST_API_LOGIN + '/login', user)
        .then(function(response) {
            console.log(response);
        });
    }
}
