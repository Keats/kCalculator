/// <reference path="../../types/types.ts"/>


// Calculating BMR/TDEE is independent of any diet
class Info implements app.IInfo {
  /* @ngInject */
  constructor(private Conversion: app.IConversion) {}

  // BMR can be easily computed in the template from the TDEE (bmr / activity)
  calculateTDEE(data) {
    // All the calculation is done using metrics so convert to metrics first
    // if needed
    if (data.useImperial) {
      data.height = this.Conversion.inchesToCm(data.height);
      data.weight = this.Conversion.lbsToKg(data.weight);
    }

    // BMR is the same for both gender except for one factor
    var bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age);

    if (data.gender === "male") {
      bmr += 5;
    } else {
      bmr -= 161;
    }
    bmr = Math.round(bmr);
    return Math.round(bmr * data.activityMultiplier);
  }
}

angular
  .module("calc.info", [
    "calc.conversion"
  ])
  .service("Info", Info);
