angular
    .module('vaiacontecer')
    .config(angularErrorHandler)
    .run(runApp);


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

function runApp() {
    document.addEventListener('deviceready', function () {
        // Enable to debug issues.
        // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

        var notificationOpenedCallback = function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window.plugins.OneSignal
        .startInit("05269a84-e7c2-4ef6-b210-0b64973a10da")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

        // Call syncHashedEmail anywhere in your app if you have the user's email.
        // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
        // window.plugins.OneSignal.syncHashedEmail(userEmail);
    }, false);
}
