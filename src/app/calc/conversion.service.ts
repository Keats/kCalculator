/// <reference path="../../types/types.ts"/>


// Some helpers to deal with archaic units as all the logic is done
// in metrics
class Conversion implements app.IConversion {
  lbsToKg(weight: number): number {
    return Math.round(weight * 0.45359237 * 100) / 100;
  }

  // Forgot that height has both feet and inches -_-
  // Let's use only inches for now
  // TODO: fixme
  inchesToCm(height: number): number {
    return Math.round(height / 0.393700787 * 100) / 100;
  }
}

angular
  .module("calc.conversion", [])
  .service("Conversion", Conversion);
