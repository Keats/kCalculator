/// <reference path="../../types/types.ts"/>


/* @ngInject */
function calcConfig($stateProvider: ng.ui.IStateProvider) {
  $stateProvider.state("home", {
    url: "/",
    controller: "CalcController as vm",
    templateUrl: "calc/index.html"
  });
}

angular
  .module("kcalc.calc", [
    "calc.index",
    "ui.router.state"
  ])
  .config(calcConfig);
