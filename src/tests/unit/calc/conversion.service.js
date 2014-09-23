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

  it('should convert from inches to cm', function () {
    var inchInCm = conversionService.inchesToCm(1);
    expect(inchInCm).to.equal(2.54);
  });
});
