// hand-rolled transducers
const {
  add,
  gte,
  multiply,
} = require("ramda");

const concatter = (a, b) => a.concat(b);

const mapper = (fn) => (cnct) => (a, b) => cnct(a, fn(b));

const filterer = (fn) => (cnct) => (a, b) => (
  fn(b)
  ? cnct(a, b)
  : a
);

const mapp = fn => list => list.reduce(
  mapper(fn)(concatter),
  []
);

const filtr = fn => list => list.reduce(
  filterer(fn)(concatter),
  []
);
module.exports =
  // filtr( gte(3) )( [2,3,4] )
  [2,3,4,5,6,7].reduce(
    filterer(gte(4))(
      mapper(add(6))(
        mapper(multiply(2))(
          concatter))),
    []
  );
