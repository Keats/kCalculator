describe('Unit: Conversion service', function () {
  var conversionService;

  beforeEach(module('calc.conversion'));
  beforeEach(inject(function (Conversion) {
    conversionService = Conversion;
  }));

  it('should convert from pounds to kg', function () {
    var weightInKg = conversionService.lbsToKg(1);
    expect(weightInKg).to.equal(0.45);
  });

  it('should convert from inches to cm in format 5\'10', function () {
    var heightInRealUnits = conversionService.heightToCm("5'10");
    expect(heightInRealUnits).to.equal(178);
  });

  it('should convert from inches to cm in format 5\'', function () {
    var heightInRealUnits = conversionService.heightToCm("5'");
    expect(heightInRealUnits).to.equal(152);
  });

});
