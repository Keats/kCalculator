/// <reference path="../../types/types.ts"/>


class CalcController {
  infoData: app.IInfoData;
  imperialHeightPattern: RegExp;
  tdee: number;
  totalCalories: app.ITotalCalories;
  macrosPercentages: app.IMacroValues;
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
          pointFormat: "<b>{point.y}g ({point.percentage:.1f}%)</b>"
        },
        plotOptions: {
          pie: {
            size: "100%",
            animation: false,
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.y}g ({point.percentage:.1f}%)",
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
    this.macrosPercentages = this.Macros.getBasicMacrosPercentage(
      this.totalCalories, this.infoData.weight, this.infoData.useImperial
    );
    var data = this.Macros.getValues(this.totalCalories, this.macrosPercentages);

    this.restPieConfig.series = [{
      name: "Daily macros %",
      data: [
        ["Proteins", data.rest.proteins],
        ["Carbs", data.rest.carbs],
        ["Fat", data.rest.fat],
      ]
    }];

    this.workoutPieConfig.series = [{
      name: "Daily macros %",
      data: [
        ["Proteins", data.workout.proteins],
        ["Carbs", data.workout.carbs],
        ["Fat", data.workout.fat],
      ]
    }];
  }
}

angular
  .module("calc.index", [
    "calc.info",
    "calc.macros"
  ])
  .controller("CalcController", CalcController);
