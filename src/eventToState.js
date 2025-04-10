const {
  assocPath,
  dissocPath,
  has,
  propOr,
  reduce,
} = require("ramda");

// permitted actions for state changes
const eventActions = {
  write: (path, val = null) => assocPath(path, val),
  erase: (path) => dissocPath(path),
};

const noop = () => () => {};

// run a legitmate action on a state object
const eventToState = ({ type, path, val }, stateObj, actions) => propOr(
  noop,
  type,
  actions
)(path, val)(stateObj);

// passing in a set of legitmate actions, update a state object
// with event data. uses a reducer-compatible fn signature
const eventsToStateUsing = (actions) => (acc, detail) => has(detail.type, actions)
  // action is legit; update a path in the object
  ? eventToState(detail, acc, actions)
  // action is not legit; return original object unchanged
  : acc;

const someState = {about: {'456': null, '789': 'articleList'}, currTab: ''};
const evt1 = { type: 'write', path: ['currTab'], val: 'misc' };
const evt2 = { type: 'write', path: ['about', '1112'] };
const evt3 = { type: 'write', path: ['contact', '123'], val: 'email' };
const evt4 = { type: 'erase', path: ['about', '456'] };

module.exports = [
  reduce(
    eventsToStateUsing(eventActions),
    someState,
    [evt1, evt2, evt3, evt4]
  ),

  '----',
  eventsToStateUsing(eventActions)(
    eventsToStateUsing(eventActions)(
      eventsToStateUsing(eventActions)(
        eventsToStateUsing(eventActions)(
          someState,
          evt1
        ),
        evt2
      ),
      evt3
    ),
    evt4
  ),

  '----',
  eventToState(evt1, someState, eventActions),
  eventToState(evt2, someState, eventActions),
  eventToState(evt3, someState, eventActions),
  eventToState(evt4, someState, eventActions),
];
