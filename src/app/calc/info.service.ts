/// <reference path="../../types/types.ts"/>


// Calculating BMR/TDEE is independent of any diet
class Info implements app.IInfo {
  /* @ngInject */
  constructor(private Conversion: app.IConversion) {}

  // Calculates total calories for both type of day
  private getDailyCalories(tdee: number, dietModifier: number): number {
    return Math.round(tdee + tdee * (dietModifier / 100));
  }

  // BMR can be easily computed in the template from the TDEE (bmr / activity)
  calculateTDEE(data) {
    // All the calculation is done using metrics so convert to metrics first
    // if needed
    var height = data.height;
    var weight = data.weight;
    if (data.useImperial) {
      height = this.Conversion.heightToCm(data.height);
      weight = this.Conversion.lbsToKg(data.weight);
    }

    // BMR is the same for both gender except for one factor
    var bmr = (10 * weight) + (6.25 * height) - (5 * data.age);

    if (data.gender === "male") {
      bmr += 5;
    } else {
      bmr -= 161;
    }
    bmr = Math.round(bmr);
    return Math.round(bmr * data.activityMultiplier);
  }

  getTotalCalories(tdee, macrosModifier) {
    return {
      rest: this.getDailyCalories(tdee, macrosModifier.rest),
      workout: this.getDailyCalories(tdee, macrosModifier.workout)
    };
  }
}

angular
  .module("calc.info", [
    "calc.conversion"
  ])
  .service("Info", Info);
