/// <reference path="../../types/types.ts"/>


class CalcController {
  infoData: app.IInfoData;
  imperialHeightPattern: any;

  /* @ngInject */
  constructor(private Info: app.IInfo) {
    this.imperialHeightPattern = /^[3-7]'([0-9]|(1[0-1]))?$/;

    // Init the info with my own data
    // TODO load and generate URL
    this.infoData = {
      useImperial: false,
      gender: "male",
      activityMultiplier: 1.55,
      weight: 75,
      height: 178,
      age: 26
    };
  }
}

angular
  .module("calc.index", [
    "calc.info"
  ])
  .controller("CalcController", CalcController);
