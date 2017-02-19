angular
    .module('vaiacontecer')
    .factory('EventoService', EventoService);


EventoService.$inject = ['BASE_REST_API', '$http', '$q', 'AuthService'];


function EventoService(BASE_REST_API, $http, $q, AuthService) {
    var service = {
        listarEventoaOcorridos: _listarEventoaOcorridos,
        listarAmigos : _listarAmigos
    }


    return service;


    function _listarEventoaOcorridos() {
        return $http.get(BASE_REST_API + '/eventos/ocorridos/participante/'.concat(AuthService.getToken().telefone))
        .then(function(response) {
            return response.data;
        });
    }

    function _listarAmigos(contatos) {
        var defer = $q.defer();

        return $http.post(BASE_REST_API + '/contas/amigos', contatos)
        .then(function(response) {
            defer.resolve(response.data);
        });

        return defer.promise;
    }
}
