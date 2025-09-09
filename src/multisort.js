const {
  T,
  // ascend,
  compose,
  cond,
  // descend,
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

var descend = (fn) => (a, b) => {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
};

var ascend = (fn) => (a, b) => {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
};

const customSortOrders = {
  weirdOrder: [
    'fffff',
    'ddddd',
    'bbbbb',
    'ccccc',
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
  'amount,desc',
  // 'name,asc',
]);

module.exports = sortIncome([
  { name: 'sarah', type: 'fffff', amount: 43 },
  { name: 'alice', type: 'bbbbb', amount: 43 },
  { name: 'bob',   type: 'ccccc', amount: 30 },
  { name: 'clara', type: 'fffff', amount: 47 },
  { name: 'rob',   type: 'ccccc', amount: 31 },
]);
