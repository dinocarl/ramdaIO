#!/usr/bin/env node
"use strict";

const {
  compose,
  inc,
  isEmpty,
  join,
  juxt,
  map,
  modulo,
  range,
  toString,
} = require("ramda");

const izzer = (str, mod) => (num) => modulo(num, mod) === 0
  ? str
  : '';

const izzerStr = compose(
  join(''),
  juxt([
    izzer('fizz', 3),
    izzer('buzz', 5),
  ])
);

const izzerStrOrNumStr = (str, num) => isEmpty(str)
  ? toString(num)
  : str;

const numOrIzzer = (num) => izzerStrOrNumStr(
  izzerStr(num),
  num
);

const fizzBuzz = compose(
  map(numOrIzzer),
  range(1),
  inc
);


module.exports = fizzBuzz(60);
