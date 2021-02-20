#!/usr/bin/env node
"use strict";

const {
  T,       add,   always,    compose,  concat,   cond,  equals,
  filter,  flip,  identity,  ifElse,   invoker,  is,
  map,     not,   propOr,    reduce,   tap,      test,  toLower,
} = require("ramda");

const ensureStr = cond([
  [is(String), identity],
  [T, always('')]
]);

const loweredEnsuredStr = compose(
  toLower,
  ensureStr,
);

const checkName = (name) => compose(
  equals(loweredEnsuredStr(name)),
  loweredEnsuredStr,
  propOr('', 'name'),
);

const propNameMatch = (obj, name) => checkName(name)(obj);


const data = {
  name: 'markdown',
  other: 'thing',
};

module.exports =
  propNameMatch(data, 'Markdown');
