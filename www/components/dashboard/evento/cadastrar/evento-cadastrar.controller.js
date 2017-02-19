angular
    .module('vaiacontecer')
    .controller('eventoController', eventoController);


eventoController.$inject = ['$state', '$cordovaContacts', 'EventoService', '$mdDialog'];


function eventoController($state, $cordovaContacts, EventoService, $mdDialog) {
    var vm = this;


    /// Public Variables
    vm.newEvent = {};
    vm.availableContacts = [];


    /// Public Methods
    vm.init = _init;
    vm.cancel = _cancel;
    vm.openModal = _openModal;

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
            var tempList = [];

            allContacts.forEach(function(contato) {
                if(contato.phoneNumbers != null) {
                    contato.phoneNumbers.forEach(function(numero) {
                        var aux = numero.value.replace(/\-/g, '').replace(/\+/g, '').replace(/\s/g, '');
                        if(aux.length > 9) {
                            aux = aux.substring(aux.length - 9);
                        }

                        tempList.push(aux);
                    });
                }
            });

            if(tempList.length) {
                EventoService.listarAmigos(tempList)
                .then(function(response) {
                    vm.availableContacts = response;
                    console.log(vm.availableContacts);
                });
            }
        });
    }

    function _openModal() {
        $mdDialog.show({
            controller: contatoModalController,
            templateUrl: 'components/dashboard/evento/modals/contatos/contato.modal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose : true,
            locals : {
                contatos : vm.availableContacts
            }
        })
        .then(function(contatos) {
            vm.newEvent.participantes = contatos;
        });
    }

    /**
     * [_cancel description]
     * @method  _cancel
     * @author Trigueiro Neto
     * @version
     * @return  {[type]}        [description]
     */
    function _cancel() {
        $state.go('dashboard.evento.listar');
    }
}
