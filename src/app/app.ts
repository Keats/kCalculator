/// <reference path="../types/types.ts"/>


/* @ngInject */
function appConfig(
  $urlRouterProvider: ng.ui.IUrlRouterProvider,
  $locationProvider: ng.ILocationProvider
) {
  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(true);
}

angular
  .module("kcalc", [
    "templates",
    "kcalc.calc",
    "ui.router.state"
  ])
  .config(appConfig);
