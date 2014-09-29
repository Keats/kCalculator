/// <reference path="../../types/types.ts"/>


class Macros implements app.IMacros {

  private caloriesInMacro = {
    proteins: 4,
    carbs: 4,
    fat: 9
  };

  // Avoid rewriting the math everytime
  private getMacroAmount(calories: number, modifier: number, macro: string): number {
    return Math.round((modifier / 100) * calories / this.caloriesInMacro[macro]);
  }

  private getMacroPercent(calories: number, amount: number, macro: string): number {
    return Math.round(((amount * this.caloriesInMacro[macro]) / calories) * 100);
  }

  // Defaults to 1g / lbs of body weight
  private getBasicProteinsAmount(weight: number, useImperial: any): number {
    var proteins = weight;
    if (!useImperial) {
      proteins = Math.round(weight * 2.2);
    }
    return proteins;
  }

  // Calculate the initial calories percentage
  // Use 1g / lbs for the proteins and fills the rest with carbs/fat
  getBasicMacrosPercentage(totalCalories, weight, useImperial) {
    var proteins = this.getBasicProteinsAmount(weight, useImperial);

    var result = {
      rest: {
        proteins: 0,
        carbs: 0,
        fat: 0
      },
      workout: {
        proteins: 0,
        carbs: 0,
        fat: 0
      }
    };

    var days = ["rest", "workout"];
    for (var i = 0, len = days.length; i < len; i++) {
      var dayType = days[i];
      var proteinsPercent = this.getMacroPercent(totalCalories[dayType], proteins, "proteins");
      var carbsPercent = Math.round((100 - proteinsPercent) / 2);
      // Fill the rest with fat, like in real life
      var fatPercent = 100 - (proteinsPercent + carbsPercent);
      result[dayType] = {
        proteins: proteinsPercent,
        carbs: carbsPercent,
        fat: fatPercent
      };
    }

    return result;
  }


  // Calculates macro grams
  getValues(totalCalories, macrosPercentages) {
    var macros = {
      rest: {
        proteins: 0,
        carbs: 0,
        fat: 0
      },
      workout: {
        proteins: 0,
        carbs: 0,
        fat: 0
      }
    };

    var days = ["rest", "workout"];
    for (var i = 0, len = days.length; i < len; i++) {
      var dayType = days[i];
      macros[dayType] = {
        proteins: this.getMacroAmount(
          totalCalories[dayType], macrosPercentages[dayType].proteins, "proteins"
        ),
        carbs: this.getMacroAmount(
          totalCalories[dayType], macrosPercentages[dayType].carbs, "carbs"
        ),
        fat: this.getMacroAmount(
          totalCalories[dayType], macrosPercentages[dayType].fat, "fat"
        )
      };
    }
    return macros;
  }

}

angular
  .module("calc.macros", [])
  .service("Macros", Macros);
