angular
    .module('vaiacontecer')
    .controller('contatoModalController', contatoModalController);


contatoModalController.$inject = ['$scope', '$mdDialog'];


function contatoModalController($scope, $mdDialog) {
    $scope.selecionados = [];

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.getSelecionados = function() {
        $mdDialog.hide(_filterSelecionados());
    };

    function _filterSelecionados() {
        var aux = [];

        $scope.contatos.forEach(function(contato) {
            if(contato.selected) {
                aux.add(contato);
            }
        });

        return aux;
    }
}
