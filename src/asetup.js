#!/usr/bin/env node
"use strict";

const {
  T,
  add,
  allPass,
  always,
  apply,
  complement,
  compose,
  concat,
  cond,
  dec,
  equals,
  filter,
  flip,
  identity,
  ifElse,
  invoker,
  is,
  isNil,
  join,
  juxt,
  last,
  lensProp,
  map,
  multiply,
  not,
  over,
  pick,
  prop,
  propOr,
  reduce,
  reject,
  replace,
  tap,
  test,
  toLower,
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


module.exports = identity('ready');
