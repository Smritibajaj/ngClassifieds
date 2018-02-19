(function() {
"use strict";

angular
.module('ngClassifieds')
.controller('newClassifiedsCtrl', function($mdSidenav, $mdDialog, classifiedsFactory){
var vm = this;
$mdSidenav('left').open();
})
})();