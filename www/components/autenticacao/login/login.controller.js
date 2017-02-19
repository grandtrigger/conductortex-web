angular
    .module('vaiacontecer')
    .controller('loginController', loginController);


loginController.$inject = ['$state', 'AuthService'];


function loginController($state, AuthService) {
    var vm = this;


    vm.user = {
        telefone : '83996437372',
        senha : '1234'
    };


    /// Public Methods
    vm.login = _login;
    vm.signUp = _signUp;


    /**
     * [_login description]
     * @method  _login
     * @author
     * @version
     * @return  {[type]} [description]
     */
    function _login() {
        if(!vm.userLoginForm.$valid) {
            return;
        }

        AuthService.login(vm.user)
        .then(function(response) {
            if(response) {
                $state.go('dashboard.main');
            }
        });
    }

    /**
     * [_signUp description]
     * @method  _signUp
     * @author
     * @version
     * @return  {[type]} [description]
     */
    function _signUp() {
        $state.go('cadastro');
    }
}
