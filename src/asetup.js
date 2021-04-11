const {
  T,
  add,
  allPass,
  anyPass,
  always,
  append,
  apply,
  complement,
  compose,
  concat,
  cond,
  curry,
  dec,
  equals,
  filter,
  flip,
  gte,
  identity,
  ifElse,
  inc,
  invoker,
  is,
  isEmpty,
  isNil,
  join,
  juxt,
  last,
  lensProp,
  map,
  modulo,
  multiply,
  not,
  over,
  pick,
  prop,
  propOr,
  range,
  reduce,
  reject,
  replace,
  tap,
  test,
  toLower,
  toString,
  values,
} = require("ramda");
const {
  integerValidationsGT0,
  isntEmpty,
  isntNil,
  numberValidationsGT0,
  validateBasic,
  validateNil,
} = require('./utils');

module.exports = identity(`
┌────────────────────────────────┐
│           - ready -            │
│ replace the export in *asetup* │
│       to see new output        │
└────────────────────────────────┘
`);
