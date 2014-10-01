/// <reference path="../../types/types.ts"/>


class CalcController {
  infoData: app.IInfoData;
  imperialHeightPattern: RegExp;
  tdee: number;
  totalCalories: app.ITotalCalories;
  macrosPercentages: app.IMacroValues;
  macrosValues: app.IMacroValues;
  dietModifiers: app.IDietModifiers;

  // Charts stuff, we don't care about those type really
  restPieConfig: any;
  workoutPieConfig: any;

  /* @ngInject */
  constructor(private Info: app.IInfo, private Macros) {
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

    this.dietModifiers = {
      rest: 0,
      workout: 30
    };

    // Manually calls thing for the first load
    this.tdee = this.Info.calculateTDEE(this.infoData);
    this.totalCalories = this.Info.getTotalCalories(this.tdee, this.dietModifiers);
    this.macrosPercentages = this.Macros.getBasicMacrosPercentage(
      this.totalCalories, this.infoData.weight, this.infoData.useImperial
    );

    // Get reaaady
    this.initCharts();
    this.calculateTDEE();
  }

  private getPieChartConfig(title) {
    return {
      options: {
        chart: {
          type: "pie",
          marginRight: 50
        },
        tooltip: {
          pointFormat: "<b>{point.grams}g ({point.y}%)</b>"
        },
        plotOptions: {
          pie: {
            size: "100%",
            animation: false,
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.grams}g ({point.y}%)",
              style: {
                fontSize: "14px"
              }
            }
          }
        }
      },
      series: [],
      title: {
        text: title
      },
      loading: false
    };
  }

  initCharts() {
    this.restPieConfig = this.getPieChartConfig("Rest Day");
    this.workoutPieConfig = this.getPieChartConfig("Workout Day");
  }

  // Give some default values when switching units and recalculate TDEE
  toggleUnits() {
    // TODO: use a directive for that
    this.infoData.useImperial = this.infoData.useImperial === "true";
    if (this.infoData.useImperial) {
      this.infoData.weight = Math.round(this.infoData.weight * 2.2);
      this.infoData.height = "5'10";
    } else {
      this.infoData.weight = Math.round(this.infoData.weight / 2.2);
      this.infoData.height = 178;
    }
    this.calculateTDEE();
  }

  calculateTDEE() {
    this.tdee = this.Info.calculateTDEE(this.infoData);
    this.totalCalories = this.Info.getTotalCalories(this.tdee, this.dietModifiers);
    // separate that in another method
    this.macrosPercentages = this.Macros.getBasicMacrosPercentage(
      this.totalCalories, this.infoData.weight, this.infoData.useImperial
    );
    this.computeMacros();
  }

  computeMacros() {
    this.macrosValues = this.Macros.getValues(this.totalCalories, this.macrosPercentages);

    this.restPieConfig.series = [{
      name: "Daily macros %",
      data: [
        {name: "Proteins", y: this.macrosPercentages.rest.proteins, grams: this.macrosValues .rest.proteins},
        {name: "Carbs", y: this.macrosPercentages.rest.carbs, grams: this.macrosValues .rest.carbs},
        {name: "Fat", y: this.macrosPercentages.rest.fat, grams: this.macrosValues .rest.fat}
      ]
    }];

    this.workoutPieConfig.series = [{
      name: "Daily macros %",
      data: [
        {name: "Proteins", y: this.macrosPercentages.workout.proteins, grams: this.macrosValues .workout.proteins},
        {name: "Carbs", y: this.macrosPercentages.workout.carbs, grams: this.macrosValues .workout.carbs},
        {name: "Fat", y: this.macrosPercentages.workout.fat, grams: this.macrosValues .workout.fat}
      ]
    }];
  }

  changeMacros(dayType: string, macroName: string) {
    // Variable is set as a string by the type=range, should probably have a
    // directive to do it for me
    this.macrosPercentages[dayType][macroName] = parseInt(this.macrosPercentages[dayType][macroName], 10);
    // Sum should be 100, get the difference divided by 2 as we'll need to split
    // the difference across the 2 other macros
    var difference = (
      100 - (
        this.macrosPercentages[dayType].carbs +
        this.macrosPercentages[dayType].proteins +
        this.macrosPercentages[dayType].fat
        )
      ) / 2;

    var additionalDifference = 0;

    for (var macro in this.macrosPercentages[dayType]) {
      if (macro === macroName) {
        continue;
      }
      var macroPercentage = this.macrosPercentages[dayType][macro];
      if (macroPercentage + difference < 0) {
        this.macrosPercentages[dayType][macro] = 0;
        additionalDifference = difference - macroPercentage;
      } else {
        this.macrosPercentages[dayType][macro] += difference + additionalDifference;
      }
    }

    this.computeMacros();
  }

  getDailyCalories(dayType: string){
    return this.Macros.getDailyCalories(this.macrosValues[dayType]);
  }
}

angular
  .module("calc.index", [
    "calc.info",
    "calc.macros"
  ])
  .controller("CalcController", CalcController);
