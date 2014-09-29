describe('Unit: Info service', function () {
  var infoService;

  beforeEach(module('calc.info'));
  beforeEach(inject(function (Info) {
    infoService = Info;
  }));

  it('should calculate TDEE for a man in imperial units', function () {
    var info = {
      useImperial: true,
      gender: 'male',
      activityMultiplier: 1.2,
      weight: 154,
      height: "5'10",
      age: 25
    };

    expect(infoService.calculateTDEE(info)).to.equal(2029);
  });

  it('should calculate TDEE for a man in metric units', function () {
    var info = {
      useImperial: false,
      gender: 'male',
      activityMultiplier: 1.2,
      weight: 70,
      height: 178,
      age: 25
    };

    // A bit different than the imperial one because of rounding
    expect(infoService.calculateTDEE(info)).to.equal(2032);
  });

  it('should calculate TDEE for a woman in imperial units', function () {
    var info = {
      useImperial: true,
      gender: 'female',
      activityMultiplier: 1.2,
      weight: 154,
      height: "5'10",
      age: 25
    };

    expect(infoService.calculateTDEE(info)).to.equal(1830);
  });

  it('should calculate TDEE for a woman in metric units', function () {
    var info = {
      useImperial: false,
      gender: 'female',
      activityMultiplier: 1.2,
      weight: 70,
      height: 178,
      age: 25
    };

    expect(infoService.calculateTDEE(info)).to.equal(1832);
  });

  it('should calculate total number of calories to eat for a day', function () {
    var calories = infoService.getDailyCalories(2032, 20);
    expect(calories).to.equal(2438);
  });

  it('should calculate total number of calories to eat for rest and workout days', function () {
    var calories = infoService.getTotalCalories(2032, {rest: 0, workout: 20});
    expect(calories.rest).to.equal(2032);
    expect(calories.workout).to.equal(2438);
  });
});
