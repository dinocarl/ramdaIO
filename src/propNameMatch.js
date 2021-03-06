const {
  T,
  always,
  compose,
  cond,
  equals,
  identity,
  is,
  propOr,
  toLower
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
