angular
    .module('vaiacontecer')
    .controller('eventoController', eventoController);


eventoController.$inject = ['$state', 'AuthService'];


function eventoController($state, AuthService) {
    var vm = this;


    /// Public Variables
    vm.newUser = {};
    vm.eventsList = [{titulo : "Evento X"}, {titulo : "Evento X"}, {titulo : "Evento X"}, {titulo : "Evento X"}, {titulo : "Evento X"}, {titulo : "Evento X"}];


    /// Public Methods
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
