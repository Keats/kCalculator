/// <reference path="../libs/angular.d.ts"/>

declare module app {

  interface IConversion {
    lbsToKg(weight: number): number;
    inchesToCm(height: number): number;
  }


  interface IInfoData {
    useImperial: boolean;  // defaults to false
    gender: string;  // male or female
    activityMultiplier: number;
    weight: number;
    height: number;
    age: number;
  }

  interface IInfo {
    calculateTDEE(data: IInfoData): number;
  }
}
