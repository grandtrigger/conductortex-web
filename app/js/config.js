angular
    .module('conductortex')
    .config(angularErrorHandler);


// Injeção de dependências do método angularErrorHandler
angularErrorHandler.$inject = ['$qProvider'];


/**
 *    [angularErrorHandler : Trata um erro comum do engular 1.6]
 *    @author Trigueiro Neto
 *    @param  {[type]} $qProvider [description]
 *    @return {[type]}            [description]
 */
function angularErrorHandler($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}
