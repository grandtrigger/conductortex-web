angular
    .module('vaiacontecer')
    .controller('loginController', loginController);


loginController.$inject = ['$state', 'AuthService'];


function loginController($state, AuthService) {
    var vm = this;


    vm.user = {

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
        // AuthService.login(vm.user)
        // .then(function(response) {
        //     console.log('response');
        // });
        $state.go('dashboard.main');
    }

    /**
     * [_formValidation description]
     * @method  _formValidation
     * @author
     * @version
     * @return  {[type]}        [description]
     */
    function _formValidation() {

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
