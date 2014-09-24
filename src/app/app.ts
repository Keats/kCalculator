/// <reference path="../types/types.ts"/>


/* @ngInject */
function appConfig(
  $urlRouterProvider: ng.ui.IUrlRouterProvider,
  $locationProvider: ng.ILocationProvider
) {
  $urlRouterProvider.otherwise("/");
}

angular
  .module("kcalc", [
    "templates",
    "kcalc.calc",
    "highcharts-ng",
    "ui.router.state"
  ])
  .config(appConfig);
