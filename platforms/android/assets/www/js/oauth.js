angular
    .module('vaiacontecer')
    .service('AuthService', AuthService);


AuthService.$inject = ['$http', '$q', 'BASE_REST_API_LOGIN'];


function AuthService($http, $q, BASE_REST_API_LOGIN) {

    var token ={
        token:'',
        telefone:''
    };

    this.getToken = function(){
        return token;
    }

    this.login = function(user) {
        var defer = $q.defer();

        $http.post(BASE_REST_API_LOGIN + '/login', user)
        .then(function(response) {
            token.token = response.data.token;
            token.telefone = response.data.telefone;
            defer.resolve(true);

        });

        return defer.promise;
    }
}
