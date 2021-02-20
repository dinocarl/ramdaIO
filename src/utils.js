const {
  allPass,
  anyPass,
  complement,
  concat,
  is,
  isEmpty,
  isNil,
  lt,
} = require('ramda');

const isntNil = complement(isNil);
const isntEmpty = complement(isEmpty);
const isntNaN = complement(isNaN);

const basicValidations = [isntNil, isntEmpty];
const validateBasic = allPass(basicValidations);
const nilValidations = [isNil, isEmpty];
const validateNil = anyPass(nilValidations);

const numberValidations = concat(basicValidations, [
  isntNaN,
  is(Number),
]);

const numberValidationsGT0 = concat(numberValidations, [lt(0)]);

const integerValidations = [Number.isInteger];

const integerValidationsGT0 = concat(integerValidations, [lt(0)]);

exports.basicValidations = basicValidations;
exports.integerValidations = integerValidations;
exports.integerValidationsGT0 = integerValidationsGT0;
exports.isntNil = isntNil;
exports.isntEmpty = isntEmpty;
exports.isntNaN = isntNaN;
exports.numberValidations = numberValidations;;
exports.numberValidationsGT0 = numberValidationsGT0;;
exports.validateBasic = validateBasic;
exports.validateNil = validateNil;
