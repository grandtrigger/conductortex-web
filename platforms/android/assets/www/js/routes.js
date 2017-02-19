angular
    .module('vaiacontecer')
    .config(routesConfig);


routesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider'];


function routesConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
    $urlRouterProvider.otherwise('login');

    $ocLazyLoadProvider.config({});

    $stateProvider
    .state('login', {
        url : '/login',
        views : {
            'main' : {
                templateUrl : 'components/autenticacao/login/login.tpl.html',
                controller : 'loginController as vm',
            }
        },
        resolve : {
            loadPlugin : function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name : 'js',
                    files : [
                        'components/autenticacao/login/login.controller.js'
                    ]
                });
            }
        }
    })
    .state('cadastro', {
        url : '/cadastro',
        views : {
            'main' : {
                templateUrl : 'components/autenticacao/cadastro/cadastro.tpl.html',
                controller : 'cadastroController as vm',
            }
        },
        resolve : {
            loadPlugin : function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name : 'js',
                    files : [
                        'components/autenticacao/cadastro/cadastro.controller.js'
                    ]
                });
            }
        }
    })
    .state('dashboard', {
        abstract : true,
        url : '/dashboard',
        views : {
            'main' : {
                templateUrl : 'components/dashboard/dashboard.tpl.html'
            }
        }
    })
    .state('dashboard.main', {
        url : '/main',
        views : {
            'content' : {
                templateUrl : 'components/dashboard/main/main.tpl.html',
                controller : 'mainController as vm'
            }
        },
        resolve : {
            loadPlugin : function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name : 'js',
                    files : [
                        'components/dashboard/main/main.controller.js'
                    ]
                });
            }
        }
    })
    .state('dashboard.evento', {
        abstract : true,
        url : '/evento',
        views : {
            'content' : {
                template : '<div ui-view = "evento"></div>',
                templateUrl : 'components/dashboard/evento/evento.tpl.html',
                controller : 'eventoController as vm'
            }
        }
    })
    .state('dashboard.evento.listar', {
        url : '/listar',
        views : {
            'evento' : {
                templateUrl : 'components/dashboard/evento/evento.tpl.html',
                controller : 'eventoController as vm'
            }
        },
        resolve : {
            loadPlugin : function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name : 'js',
                    files : [
                        'components/dashboard/evento/evento.controller.js'
                    ]
                });
            }
        }
    })
    .state('dashboard.evento.cadastrar', {
        url : '/cadastrar',
        views : {
            'evento' : {
                templateUrl : 'components/dashboard/evento/novoevento.tpl.html',
                controller : 'eventoController as vm'
            }
        },
        resolve : {
            loadPlugin : function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name : 'js',
                    files : [
                        'components/dashboard/evento/cadastrar/evento-cadastrar.controller.js'
                    ]
                });
            }
        }
    });
}
