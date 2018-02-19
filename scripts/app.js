angular
.module("ngClassifieds",["ngMaterial", "ui.router"])
.config(function($mdThemingProvider, $stateProvider) {

    $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('orange');

    $stateProvider
    .state('stateone',{
        url: '/stateone',
        template: '<h1>State one</h1>'
    })
    .state('statetwo',{
        url: '/statetwo',
        template: '<h1>State two</h1> <md-button ui-sref="two.more">Go to nested State</md-button><ui-view></ui-view>'
    })
    .state('two.more',{
        url: '/more',
        template: '<p>State two is deeper</p> '
    })
})
.directive("helloWorld", function(){
return{
    template: "<h1> {{message}}</h1>"
}
});