const {
  T,
  allPass,
  always,
  apply,
  compose,
  cond,
  dec,
  lensProp,
  multiply,
  over,
  pick,
  prop,
  values,
} = require("ramda");
const {
  numberValidationsGT0,
  integerValidationsGT0,
} = require('./utils');

const pageLens = lensProp('page');

const calcPageOffset = compose(
  apply(multiply),
  values,
  over(pageLens, dec),
  pick(['page', 'limit']),
);

const validNumberGT0At = (keyName) => compose(
  allPass(numberValidationsGT0),
  prop(keyName),
);

const validIntegerGT0At = (keyName) => compose(
  allPass(integerValidationsGT0),
  prop(keyName),
);

const hasValidPageOffsetData = allPass([
  validNumberGT0At('page'),
  validNumberGT0At('limit')
]);

const hasValidOffset = validIntegerGT0At('offset');

const getOffset = cond([
  [hasValidPageOffsetData, calcPageOffset],
  [hasValidOffset, prop('offset')],
  [T, always(0)]
]);


const data = {
  page: 25,
  offset: 5,
  limit: 10,
};

module.exports = getOffset(data);
