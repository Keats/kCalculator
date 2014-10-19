/// <reference path="../libs/angular.d.ts"/>

declare module app {

  interface IConversion {
    lbsToKg(weight: number): number;
    heightToCm(height: string): number;
  }


  interface IInfoData {
    useImperial: any;  // defaults to false
    gender: string;  // male or female
    activityMultiplier: number;
    weight: number;
    height: any;
    age: number;
  }

  interface IInfo {
    calculateTDEE(data: IInfoData): number;
    getTotalCalories(tdee: number, dietModifiers: IDietModifiers): ITotalCalories;
  }


  // In the controller, passed to the Macros service
  interface IDietModifiers {
    rest: number;
    workout: number;
  }

  // Calculated by the macros service and sent to the controller
  interface ITotalCalories {
    rest: number;
    workout: number;
  }

  interface IDayValues {
    carbs: number;
    fat: number;
    proteins: number;
  }

  interface IMacroValues {
    rest: IDayValues;
    workout: IDayValues;
  }

  interface IMacros {
    getBasicMacrosPercentage(totalCalories: ITotalCalories, weight: number, useImperial: any): IMacroValues;
    getValues(totalCalories: ITotalCalories, macrosModifier: IMacroValues): IMacroValues;
    getDailyCalories(macroValues: IDayValues): number;
  }
}

