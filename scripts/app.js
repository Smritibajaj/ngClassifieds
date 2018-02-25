angular
.module("ngClassifieds",["ngMaterial", "ui.router"])
.config(function($mdThemingProvider, $stateProvider) {

    $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('orange');

    $stateProvider
    .state('classifieds',{
        url: '/classifieds',
        templateUrl: 'components/classifieds/classifieds.tpl.html',
        controller: 'classifiedsCtrl as vm'// DEFINE ALIAS
    })
    .state('classifieds.new',{
        url: '/new',
        templateUrl: 'components/classifieds/classifieds.new.tpl.html',
        controller: 'newclassifiedsCtrl as vm'// DEFINE ALIAS
    })
    .state('classifieds.edit',{
        url: '/edit/:id',
        templateUrl: 'components/classifieds/classifieds.edit.tpl.html',
        controller: 'editclassifiedsCtrl as vm',// DEFINE ALIAS
        params: {
            classified: null
        }
    });
});
