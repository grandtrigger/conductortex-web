angular
    .module('vaiacontecer')
    .controller('eventoController', eventoController);


eventoController.$inject = ['$state', 'AuthService'];


function eventoController($state, AuthService) {
    var vm = this;


    /// Public Variables
    vm.newUser = {};


    /// Public Methods
    vm.signUp = _signUp;
    vm.cancel = _cancel;
    vm.goToMain = _goToMain;


    /// Implementation

    function _goToMain() {
        $state.go('dashboard.main')
    }

    /**
     * [signUp description]
     * @method  signUp
     * @author
     * @version
     * @return  {[type]} [description]
     */
    function _signUp() {

    }

    /**
     * [_cancel description]
     * @method  _cancel
     * @author
     * @version
     * @return  {[type]} [description]
     */
    function _cancel() {
        $state.go('login');
    }

    function _formValidation() {

    }
}
