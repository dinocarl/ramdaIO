const { groupBy } = require('ramda');
const states = {
  il: 'illinois',
  ma: 'massachussets',
  mo: 'missouri',
  ca: 'california',
  or: 'oregon',
  me: 'maine',
}

const data = [
  { id: 1, city: 'chicago', state: 'il', zip: 12233 },
  { id: 1, city: 'chicago', state: 'il', zip: 12233 },
  { id: 1, city: 'chicago', state: 'il', zip: 12233 },
  { id: 1, city: 'barrington', state: 'il', zip: 22334 },
  { id: 1, city: 'portland', state: 'or', zip: 22334 },
  { id: 1, city: 'portland', state: 'me', zip: 22334 },
  { id: 1, city: 'boston', state: 'ma', zip: 33445 },
  { id: 1, city: 'martha\'s vineyard', state: 'ma', zip: 44556 },
  { id: 1, city: 'st. louis', state: 'mo', zip: 55443 },
  { id: 1, city: 'los angeles', state: 'ca', zip: 44332 },
];

const asc =  (a, b) => (a > b ? 1 : a < b ? -1 : 0);
const desc = (a, b) => asc(b, a);

const cityStateSort = (
  { city: cityA, state: stateA },
  { city: cityB, state: stateB }
) => desc(cityA, cityB) || desc(stateA, stateB);

const stateSort = (
  { state: stateA },
  { state: stateB }
) => desc(stateA, stateB);

module.exports = [
  groupBy(
    ({state = '__'}) => state,
    data
  ),
  // states
  Object.values(
    data.reduce(
      (acc, {state: abbreviation}) => Object.assign(
        acc,
        {[abbreviation]: {
          abbreviation,
          state: states[abbreviation],
          sfId: null
        }}
      ),
      {}
    )
  ).sort(stateSort),
  // cities
  Object.values(
    data.reduce(
      (acc, {city, state: abbreviation}) => Object.assign(
        acc,
        {[`${city || '__'}, ${abbreviation || '__'}`]: {
          city,
          state: states[abbreviation],
        }}
      ),
      {}
    )
  ).sort(cityStateSort),
]
