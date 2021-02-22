// Uses a fallback value, then an array of strings
// that serve as an ordered list of preferred props
// from most to least to return from an object.
// The first valid prop gets returned.
const {
  T,
  anyPass,
  always,
  append,
  compose,
  cond,
  curry,
  isEmpty,
  isNil,
  map,
  not,
  prop,
} = require("ramda");

const validVal = compose(
  not,
  anyPass([isEmpty, isNil])
);

const validProp = curry((propName, obj) => validVal(prop(propName, obj)));

const propsOr = curry((fallback, propsList, obj) => compose(
  cond,
  append([T, always(fallback)]),
  map((str) => [validProp(str), prop(str)]),
)(propsList)(obj));


const data = {
  mostPreferred: 'X',
  preferred2: 'Y',
};


module.exports = propsOr(':(', ['mostPreferred', 'preferred2', 'leastPreferred'], data);
