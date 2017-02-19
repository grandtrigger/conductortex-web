angular
    .module('vaiacontecer')
    .factory('CadastroUsuarioService', CadastroUsuarioService);


CadastroUsuarioService.$inject = ['BASE_REST_API_LOGIN', '$http'];


function CadastroUsuarioService(BASE_REST_API_LOGIN, $http) {
    var service = {
        signUp : _signUp
    }


    return service;


    function _signUp(newUser) {
        return $http.post(BASE_REST_API_LOGIN + '/contas', newUser)
        .then(function(response) {
            return response.data;
        });
    }
}
