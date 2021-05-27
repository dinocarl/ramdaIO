const {
  T,
  ascend,
  compose,
  cond,
  descend,
  equals,
  flip,
  head,
  juxt,
  has,
  identity,
  indexOf,
  last,
  length,
  map,
  prop,
  sort,
  sortWith,
  split,
  tail,
} = require("ramda");

const customSortOrders = {
  weirdOrder: [
    'fffff',
    'ddddd',
    'ccccc',
    'bbbbb',
  ]
};

const sortDir = (dir) => (dir === 'desc'
  ? descend
  : ascend);

const namedItemFrom = (propName, sortArr) => compose(
  flip(indexOf)(sortArr),
  prop(propName),
);

const propSortWith = (sortArr) => ([propName, dir]) => sortDir(dir)(namedItemFrom(propName, sortArr));

const sorter = () => ([propName, dir]) => sortDir(dir)(prop(propName));

const regOrCustomSorter = (lookup) => (has(lookup, customSortOrders)
  ? propSortWith(prop(lookup, customSortOrders))
  : sorter());

const hasLength = (len) => compose(
  equals(len),
  length,
)

const checkForCustom = cond([
  [hasLength(3), tail],
  [T, identity],
]);

const lispIt = ([a, b]) => a(b);

const parseSort = compose(
  lispIt,
  juxt([compose(regOrCustomSorter, head), compose(split(','), last)]),
  checkForCustom,
  split(':'),
);

const sortByColumns = compose(
  sortWith,
  map(parseSort),
);

const sortIncome = sortByColumns([
  'custom:weirdOrder:type,asc',
  'amount,asc',
]);

module.exports = sortIncome([
  { name: 'alice', type: 'bbbbb', amount: 41 },
  { name: 'bob', type: 'ccccc', amount: 30 },
  { name: 'clara', type: 'fffff', amount: 47 },
  { name: 'alice', type: 'fffff', amount: 43 },
  { name: 'bob', type: 'ccccc', amount: 31 },
]);
