angular
    .module('vaiacontecer')
    .controller('eventoController', eventoController);


eventoController.$inject = ['$state', '$cordovaContacts', 'AuthService'];


function eventoController($state, $cordovaContacts, AuthService) {
    var vm = this;


    /// Public Variables
    vm.newEvent = {};
    vm.availableContacts = [];


    /// Public Methods
    vm.init = _init;

    /// Implementation

    function _init() {
        _getAllContacts();
    }

    /**
     * [_getAllContacts description]
     * @method  _getAllContacts
     * @author Trigueiro Neto
     * @version
     * @return  {[type]}        [description]
     */
    function _getAllContacts() {
        $cordovaContacts.find({fields : ['phoneNumbers']}).then(function(allContacts) {
            allContacts.forEach(function(contato) {
                if(contato.phoneNumbers != null) {
                    contato.phoneNumbers.forEach(function(numero) {
                        var aux = numero.value.replace(/\-/g, '').replace(/\+/g, '').replace(/\s/g, '');
                        if(aux.length > 9) {
                            aux = aux.substring(aux.length - 9);
                        }
                        vm.availableContacts.push(aux);
                    });
                }
            });
        });
    }

    /**
     * [_formValidation description]
     * @method  _formValidation
     * @author Trigueiro Neto
     * @version
     * @return  {[type]}        [description]
     */
    function _formValidation() {

    }
}
