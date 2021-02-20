#!/usr/bin/env node
"use strict";

const {
  T,
  add,
  always,
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
  map,
  not,
  propOr,
  reduce,
  tap,
  test,
  toLower
} = require("ramda");
const {
  isntEmpty,
  isntNil,
  basicValidations,
  nilChecks
} = require('./utils');


module.exports = identity('ready');
