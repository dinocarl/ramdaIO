const anyPass = (predList) => (val) => predList.reduce((acc, predFn) => Boolean(predFn(val) || acc), false);
const allPass = (predList) => (val) => predList.reduce((acc, predFn) => Boolean(predFn(val) && acc), true);
const checkType = (obj) => Object.prototype.toString.call(obj).slice(8, -1);
const is = (type) => (obj) => typeof obj !== 'undefined' && obj !== null && checkType(obj) === type;
const path = (keys, obj) => keys.reduce((acc, key) => is('Object')(acc) || Array.isArray(acc) ? acc[key] : undefined, obj);
const defaultTo = (fallback, value) => (typeof value !== 'undefined' ? value : fallback);
const pathOr = (fallback, keys, obj) => defaultTo(fallback, path(keys, obj));
const includes = (given) => (value) => {
    // whether value is a string
    if (is('String')(value)) {
        return value.includes(given);
    }
    // the value must be a list for any checks to proceed
    if (Array.isArray(value)) {
        // whether both the value and the given are lists
        if (Array.isArray(given)) {
            // whether the value is a list, and both the given
            // and the head of the given are lists
            if (Array.isArray(given[0])) {
                return given[0].every((arg) => value.includes(arg));
            }
            return given.every((arg) => value.includes(arg));
        }
        // whether a scalar is in the given list
        return value.includes(given);
    }
    return false;
};
const always = (a) => () => a;
const identity = (value) => value;
const head = (arr) => arr[0];
const pathSatisfies = (pred, pathList) => (obj) => pred(path(pathList, obj));
const filterOperations = {
  eq: (compareValue) => (value) => value === compareValue,
  lt: (compareValue) => (value) => value !== undefined && value < compareValue,
  gt: (compareValue) => (value) => value !== undefined && value > compareValue,
  includes,
};
const filterCombiners = {
  and: allPass,
  or: anyPass,
};

const filterer = ([propName, operator, val]) => pathSatisfies(filterOperations[operator](val), propName.split('.'));

const tacitOr = (filterTuple) => !Array.isArray(path([0, 1], filterTuple))
  ? anyPass
  : head;

const parseFilterTuples = (filterTuple) => Array.isArray(path([1], filterTuple))
  ? pathOr(anyPass, filterTuple.slice(0, 1), filterCombiners)(filterTuple.slice(1).map(parseFilterTuples))
  : filterOperations[path([1], filterTuple)]
    ? filterer(filterTuple)
    : always(identity);

// 1. Use the tacitOr to determine whether to create
//    a union out of a list of operations
// 2. Interpret the filtering commands by iterating
//    over the tuples to create filtering functions
// 3. Apply the filtering function created by 2) to
//    the function returned by 1) which returns a
//    consolidated filtering function
const parseableFilter = (recipe) => tacitOr(recipe)(
  recipe.map(
    parseFilterTuples
  )
);


// const parseableFilter = (recipe) => tacitOr(recipe)(
//   recipe.map(
//     parseFilterTuples,
//   )
// )

const data = [
   {val: -3, type: 'other'},
   {val: -2, type: 'other'},
   {val: -1, type: 'other'},
   {val: 1, type: 'other'},
   {val: 2, type: 'prime'},
   {val: 3, type: 'prime'},
   {val: 4, type: 'composite'},
   {val: 5, type: 'prime'},
   {val: 6, type: 'composite'},
   {val: 7, type: 'prime'},
   {val: 8, type: 'composite'},
   {val: 9, type: 'composite'},
]

const filterRecipe = [
   ['or',
     ['val', 'lt', 0],
     ['and',
       ['val', 'gt', 4],
       ['type', 'eq', 'prime']]]]

const filterRecipe2 = [
    ['val', 'lt', 0],
    ['val', 'gt', 4]]

const filterRecipe3 = [
  ['or',
     ['val', 'lt', 0],
     ['and',
       ['val', 'gt', 4],
       ['type', 'eq', 'prime']]]]

const filterRecipe4 = [
  ['and',
    ['author.lastName', 'lt', 'M'],
    ['or',
      ['tags', 'includes', 'Rant'],
      ['tags', 'includes', 'Travel']]]]

const filterRecipe5 = [
  ['and',
    // ['offerDateTimeUTC', 'lt', '2025-11-06T13:00:00'],
    ['apptTypeName', 'eq', 'Illness'],
    ['distance', 'lt', 15]]]

const posts = [
  {
    id: 1,
    title: "Et Ultrices Posuere",
    author: { firstName: "Ashby", lastName: "Parfrey" },
    tags: [ "Travel", "Press Release" ]
  },
  {
    id: 2,
    title: "Nulla Nisl",
    author: { firstName: "Jacki", lastName: "Mitchley" },
    tags: [ "Rant", "Finance" ]
  },
  {
    id: 3,
    title: "Natoque Penatibus Et Magnis Dis Parturient",
    author: { firstName: "Rene", lastName: "McCaughey" },
    tags: [ "Press Release", "Health", "Rant", "Travel" ]
  },
  {
    id: 4,
    title: "At Velit Vivamus Vel Nulla Eget",
    author: { firstName: "Rafa", lastName: "Stockey" },
    tags: [ "Press Release", "Finance", "Health", "Entertainment" ]
  },
  {
    id: 5,
    title: "Amet Eros",
    author: { firstName: "Arabella", lastName: "Climance" },
    tags: [ "Press Release", "Travel", "Rant", "Arts and Leisure" ]
  },
  {
    id: 6,
    title: "Tortor Quis Turpis Sed",
    author: { firstName: "Jaquenetta", lastName: "Drinkale" },
    tags: [ "Press Release", "Health", "Arts and Leisure" ]
  },
  {
    id: 7,
    title: "Aenean Fermentum Donec Ut Mauris Eget Massa",
    author: { firstName: "Marv", lastName: "Schroder" },
    tags: [ "Finance", "Travel" ]
  },
  {
    id: 8,
    title: "Convallis Nunc Proin At Turpis A",
    author: { firstName: "Christy", lastName: "Yates" },
    tags: [ "Press Release", "Rant", "Arts and Leisure" ]
  },
  {
    id: 9,
    title: "Primis In Faucibus Orci Luctus",
    author: { firstName: "Dag", lastName: "Damant" },
    tags: [ "Travel", "Press Release", "Arts and Leisure", "Finance" ]
  },
  {
    id: 10,
    title: "Amet Lobortis Sapien Sapien",
    author: { firstName: "Hallie", lastName: "Feely" },
    tags: [ "Arts and Leisure", "Travel", "Health" ]
  }
]

// module.exports = [
//    {val: -3, type: 'other'},
//    {val: -2, type: 'other'},
//    {val: -1, type: 'other'},
//    {val: 1, type: 'other'},
//    {val: 2, type: 'prime'},
//    {val: 3, type: 'prime'},
//    {val: 4, type: 'composite'},
//    {val: 5, type: 'prime'},
//    {val: 6, type: 'composite'},
//    {val: 7, type: 'prime'},
//    {val: 8, type: 'composite'},
//    {val: 9, type: 'composite'},
// ].filter(parseableFilter([
//    ['and',
//      ['val', 'gt', 4],
//      ['type', 'eq', 'prime']]]
// ));


// module.exports = posts.filter(parseableFilter(filterRecipe4))

module.exports = [
  {offerDate: '2025-11-06', apptTypeName: 'Illness',         providerName: 'Onsite',     locationName: 'Demo',      distance: 0,  offerDateTimeUTC: '01:24'},
  {offerDate: '2025-11-07', apptTypeName: 'Other',           providerName: 'Onsite',     locationName: 'Demo',      distance: 0,  offerDateTimeUTC: '01:44'},
  {offerDate: '2025-11-06', apptTypeName: 'Other',           providerName: 'Onsite',     locationName: 'Demo',      distance: 0,  offerDateTimeUTC: '07:17'},
  {offerDate: '2025-11-07', apptTypeName: 'Illness',         providerName: 'Onsite',     locationName: 'Demo',      distance: 0,  offerDateTimeUTC: '16:31'},
  {offerDate: '2025-11-06', apptTypeName: 'Illness',         providerName: 'Onsite',     locationName: 'Chicago',   distance: 12, offerDateTimeUTC: '11:36'},
  {offerDate: '2025-11-07', apptTypeName: 'Sports Physical', providerName: 'Onsite',     locationName: 'Albany',    distance: 34, offerDateTimeUTC: '15:59'},
  {offerDate: '2025-11-07', apptTypeName: 'Illness',         providerName: 'Onsite',     locationName: 'Pittsford', distance: 22, offerDateTimeUTC: '13:41'},
  {offerDate: '2025-11-06', apptTypeName: 'Other',           providerName: 'Onsite',     locationName: 'Chicago',   distance: 12, offerDateTimeUTC: '09:06'},
  {offerDate: '2025-11-06', apptTypeName: 'Illness',         providerName: 'Telehealth', locationName: 'Chicago',   distance: 12, offerDateTimeUTC: '11:23'},
  {offerDate: '2025-11-06', apptTypeName: 'Illness',         providerName: 'Telehealth', locationName: 'Demo',      distance: 0,  offerDateTimeUTC: '05:43'},
  {offerDate: '2025-11-07', apptTypeName: 'Sports Physical', providerName: 'Telehealth', locationName: 'Demo',      distance: 0,  offerDateTimeUTC: '18:31'},
  {offerDate: '2025-11-07', apptTypeName: 'Injury',          providerName: 'Telehealth', locationName: 'Demo',      distance: 0,  offerDateTimeUTC: '06:11'},
  {offerDate: '2025-11-06', apptTypeName: 'Sports Physical', providerName: 'Telehealth', locationName: 'Pittsford', distance: 22, offerDateTimeUTC: '20:39'},
  {offerDate: '2025-11-06', apptTypeName: 'Illness',         providerName: 'Telehealth', locationName: 'Pittsford', distance: 22, offerDateTimeUTC: '07:08'},
  {offerDate: '2025-11-07', apptTypeName: 'Sports Physical', providerName: 'Onsite',     locationName: 'Demo',      distance: 0,  offerDateTimeUTC: '22:43'},
  {offerDate: '2025-11-07', apptTypeName: 'Sports Physical', providerName: 'Onsite',     locationName: 'Pittsford', distance: 22, offerDateTimeUTC: '06:26'},
  {offerDate: '2025-11-06', apptTypeName: 'Injury',          providerName: 'Telehealth', locationName: 'Pittsford', distance: 22, offerDateTimeUTC: '10:59'},
  {offerDate: '2025-11-07', apptTypeName: 'Other',           providerName: 'Onsite',     locationName: 'Albany',    distance: 34, offerDateTimeUTC: '08:30'},
  {offerDate: '2025-11-07', apptTypeName: 'Injury',          providerName: 'Onsite',     locationName: 'Albany',    distance: 34, offerDateTimeUTC: '09:15'},
  {offerDate: '2025-11-06', apptTypeName: 'Illness',         providerName: 'Onsite',     locationName: 'Chicago',   distance: 12, offerDateTimeUTC: '15:38'}
].filter(
  parseableFilter(
    [ [ 'and'
      , [ 'offerDate', 'eq', '2025-11-06' ]
      , [ 'offerDateTimeUTC', 'lt', '13:00' ]
      , [ 'distance', 'gt', 0 ]
      , [ 'distance', 'lt', 15 ]
      , [ 'providerName', 'eq', 'Onsite' ]
      , [ 'or'
        , [ 'apptTypeName', 'eq', 'Illness' ]
        , [ 'apptTypeName', 'eq', 'Other' ]
        ]
      ]
    ]
  )
).sort(
  (a, b) => a.offerDateTimeUTC.localeCompare(b.offerDateTimeUTC)
).slice(
  0, 5
);
