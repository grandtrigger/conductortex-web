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
        $mdDialog.hide($scope.selecionados);
    };
}
