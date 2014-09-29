describe('Unit: Macros service', function () {
  var macrosService;

  beforeEach(module('calc.macros'));
  beforeEach(inject(function (Macros) {
    macrosService = Macros;
  }));

  it('should calculate proteins from bodyweight in metrics', function () {
    var prot = macrosService.getBasicProteinsAmount(70, false);
    expect(prot).to.equal(154);
  });

  it('should calculate proteins from bodyweight in lbs', function () {
    var prot = macrosService.getBasicProteinsAmount(154, true);
    expect(prot).to.equal(154);
  });

  it('should calculate a macro amount given calories/modifier/type of macro', function () {
    var amount = macrosService.getMacroAmount(2000, 50, "carbs");
    expect(amount).to.equal(250);
  });

  it('should get the basics macro % for a given TDEE/weight in metrics', function () {
    var totalCalories = {
      rest: 2032,
      workout: 2438
    };

    var macros = macrosService.getBasicMacrosPercentage(totalCalories, 75, false);
    expect(macros.rest.proteins).to.not.equal(macros.workout.proteins);
    expect(macros.rest.carbs + macros.rest.fat + macros.rest.proteins).to.equal(100);
    expect(macros.workout.carbs + macros.workout.fat + macros.workout.proteins).to.equal(100);
  });

  it('should get the basics macro % for a given TDEE/weight in imperial', function () {
    var totalCalories = {
      rest: 2032,
      workout: 2438
    };
    var macros = macrosService.getBasicMacrosPercentage(totalCalories, 75, true);
    expect(macros.rest.proteins).to.not.equal(macros.workout.proteins);
    expect(macros.rest.carbs + macros.rest.fat + macros.rest.proteins).to.equal(100);
    expect(macros.workout.carbs + macros.workout.fat + macros.workout.proteins).to.equal(100);
  });

  it('should calculate macros depending on percentages', function () {
    var totalCalories = {
      rest: 2032,
      workout: 2438
    };
     var macrosPercentages = {
      rest: {
        proteins: 50,
        carbs: 10,
        fat: 40
      },
      workout: {
        proteins: 50,
        carbs: 40,
        fat: 10
      }
    };
    var macros = macrosService.getValues(totalCalories, macrosPercentages);
    console.log(macros);
    // 4 cals in 1g of proteins
    expect(macros.rest.proteins).to.equal(1016 / 4);
    expect(macros.workout.proteins).to.equal(Math.round(1219 / 4));
  });
});
