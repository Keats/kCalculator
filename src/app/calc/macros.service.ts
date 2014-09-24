/// <reference path="../../types/types.ts"/>


class Macros {
  private caloriesInMacro = {
    proteins: 4,
    carbs: 4,
    fat: 9
  };

  // Calculates macros split for
  private getTotalCalories(tdee, dietModifiers) {
    return {
      rest: Math.round(tdee + tdee * (dietModifiers.rest / 100)),
      workout: Math.round(tdee + tdee * (dietModifiers.workout / 100))
    };
  }

  private getDailyMacros(totalCalories, weight, macrosModifiers) {
    var proteinsRest = (macrosModifiers.rest.proteins / 100) * totalCalories.rest / this.caloriesInMacro.proteins;
    var proteinsWorkout = (macrosModifiers.workout.proteins / 100) * totalCalories.workout / this.caloriesInMacro.proteins;

    var restCalories = Math.round(totalCalories.rest - proteinsRest * this.caloriesInMacro.proteins);
    var workoutCalories = Math.round(totalCalories.workout - proteinsWorkout * this.caloriesInMacro.proteins);

    return {
      rest: {
        carbs: Math.round((macrosModifiers.rest.carbs / 100) * restCalories / this.caloriesInMacro.carbs),
        fat: Math.round((macrosModifiers.rest.fat / 100) * restCalories / this.caloriesInMacro.fat),
        proteins: Math.round(proteinsRest)
      },
      workout: {
        carbs: Math.round((macrosModifiers.workout.carbs / 100) * workoutCalories / this.caloriesInMacro.carbs),
        fat: Math.round((macrosModifiers.workout.fat / 100) * workoutCalories / this.caloriesInMacro.fat),
        proteins: Math.round(proteinsWorkout)
      }
    };
  }

  // dietModifiers: {rest, workout}
  // macrosModfiers {rest: {proteins, carbs, fat}, workout:{proteins, carbs, fat}}
  calculate(tdee, dietModifiers, macrosModifiers, info) {
    // TODO: handle imperial units
    var calories = this.getTotalCalories(tdee, dietModifiers);
    var macros = this.getDailyMacros(calories, info.weight, macrosModifiers);

    return {
      calories: calories,
      macros: macros
    };
  }

}

angular
  .module("calc.macros", [])
  .service("Macros", Macros);
