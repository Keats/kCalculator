/// <reference path="../../types/types.ts"/>


class CalcController {
  infoData: app.IInfoData;
  imperialHeightPattern: RegExp;
  restPieConfig: any;
  workoutPieConfig: any;
  tdee: number;

  // TODO: TO TYPE
  dietModifiers: any;
  macrosModifiers: any;


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

    this.macrosModifiers = {
      rest: {
        proteins: 30,
        carbs: 20,
        fat: 50
      },
      workout: {
        proteins: 30,
        carbs: 50,
        fat: 20
      }
    };

    // Manually calls thing for the first load
    this.initCharts();
    this.calculateTDEE();
  }

  private getPieChartConfig(title) {
    return {
      options: {
        chart: {
          type: "pie"
        },
        tooltip: {
          pointFormat: "<b>{point.y}g ({point.percentage:.1f}%)</b>"
        },
        plotOptions: {
          pie: {
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

  calculateTDEE() {
    this.tdee = this.Info.calculateTDEE(this.infoData);
    var data = this.Macros.calculate(this.tdee, this.dietModifiers, this.macrosModifiers, this.infoData);

    this.restPieConfig.series = [{
      name: 'Daily macros %',
      data: [
        ['Proteins', data.macros.rest.proteins],
        ['Carbs', data.macros.rest.carbs],
        ['Fat', data.macros.rest.fat],
      ]
    }];
    this.workoutPieConfig.series = [{
      name: 'Daily macros %',
      data: [
        ['Proteins', data.macros.workout.proteins],
        ['Carbs', data.macros.workout.carbs],
        ['Fat', data.macros.workout.fat],
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
