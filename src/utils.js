const {
  allPass,
  anyPass,
  complement,
  isEmpty,
  isNil
} = require('ramda');

const isntNil = complement(isNil);
const isntEmpty = complement(isEmpty);

const basicValidations = allPass([isntNil, isntEmpty]);
const nilChecks = anyPass([isNil, isEmpty]);

exports.basicValidations = basicValidations;
exports.isntNil = isntNil;
exports.isntEmpty = isntEmpty;
exports.nilChecks = nilChecks;
