/// <reference path="../../types/types.ts"/>


// Some helpers to deal with archaic units as all the logic is done
// in metrics
class Conversion implements app.IConversion {
  lbsToKg(weight) {
    return Math.round(weight * 0.45359237 * 100) / 100;
  }

  heightToCm(height) {
    if (height === undefined) {
      return 0;
    }

    var elements = height.split("'");
    if (elements.length === 0) {
      return 0;
    }

    var feet = parseInt(elements[0], 10);
    var inches = 0;

    if (elements.length === 2 && elements[1] !== "") {
      inches = parseInt(elements[1], 10);
    }

    var totalInches = feet * 12 + inches;
    return Math.round((totalInches / 0.393700787 * 100) / 100);
  }
}

angular
  .module("calc.conversion", [])
  .service("Conversion", Conversion);
