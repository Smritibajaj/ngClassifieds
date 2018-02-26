angular
.module("ngClassifieds",["ngMaterial", "ui.router"])
.config(function($mdThemingProvider, $stateProvider, $urlRouterProvider) {

    $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('orange');

    $urlRouterProvider.otherwise('/classifieds');

    $stateProvider
    .state('classifieds',{
        url: '/classifieds',
        templateUrl: 'components/classifieds/classifieds.tpl.html',
        controller: 'classifiedsCtrl as vm'// DEFINE ALIAS
    })
    .state('classifieds.new',{
        url: '/new',
        templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
        controller: 'newClassifiedsCtrl as vm'// DEFINE ALIAS
    })
    .state('classifieds.edit',{
        url: '/edit/:id',//:id is a variable  and we pick up from state go from controller
        templateUrl: 'components/classifieds/edit/classifieds.edit.tpl.html',
        controller: 'editClassifiedsCtrl as vm',// DEFINE ALIAS
        params: {
            classified: null // to pass a null object within this route
        }
    });

});
