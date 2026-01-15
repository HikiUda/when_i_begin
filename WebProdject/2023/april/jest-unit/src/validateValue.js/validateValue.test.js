const validateValue = require('./validateValue');

describe('validateValue', () => {
   test('Корректное значение', () => {
      expect(validateValue(0)).toBe(true);
   });
   test('Корректное значение', () => {
      expect(validateValue(100)).toBe(true);
   });
   test('Корректное значение', () => {
      expect(validateValue(50)).toBe(true);
   });
   test('Меньше корректного', () => {
      expect(validateValue(-50)).toBe(false);
   });
   test('Больше корректного', () => {
      expect(validateValue(111)).toBe(false);
   });
});
