#!/usr/bin/env node
"use strict";

const {
  T,
  add,
  always,
  complement,
  compose,
  concat,
  cond,
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
  map,
  not,
  propOr,
  reduce,
  reject,
  replace,
  tap,
  test,
  toLower,
} = require("ramda");
const {
  isntEmpty,
  isntNil,
  basicValidations,
  nilChecks,
} = require('./utils');


module.exports = identity('ready');
