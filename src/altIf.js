const isIntIf = (given) => {
  if (typeof given === 'string') {
    return Number.isInteger(parseFloat(given));
  }
  if (typeof given === 'number') {
    return Number.isInteger(given);
  }
  return false;
};



const intCases = {
  str: (given) => Number.isInteger(parseFloat(item)),
  num: Number.isInteger,
  default: () => false,
};

const isIntStr = (given) => (
  (lookup) => intCases[intCases[lookup] ? lookup : 'default'](given)
)(''.concat(
  typeof given === 'string' ? 'str' : '',
  typeof given === 'number' ? 'num' : '',
));




const isIntArr = (given) => [
  [given]
    .filter( (item) => typeof item === 'string' )
    .map( (item) => Number.isInteger(parseFloat(item)) ),
  [given]
    .filter( (item) => typeof item === 'number' )
    .map( Number.isInteger ),
  false
].flat()[0];





// implements cond recursively, allowing it to break early
// falls thru to undefined
const cnds = ([[pred, mapr] = [], ...rest] = [[]]) => (val) =>
  !pred ? undefined :
  pred(val) ? mapr(val) : cnds(rest)(val);



const isIntCond = cnds([
  [
    (item) => typeof item === 'string',
    (item) => Number.isInteger(parseFloat(item)) ],
  [
    (item) => typeof item === 'number',
    Number.isInteger ],
  [
    () => true,
    () => false ]
]);




module.exports = [
  isIntIf(11.1),
  isIntStr(11.1),
  isIntArr(11.1),
  isIntCond(11.1),
];




/*
const checkType = (obj) => Object.prototype.toString.call(obj).slice(8, -1);
const iz = (type) => (obj) => typeof obj !== 'undefined' %26%26 obj !== null %26%26 checkType(obj) === type;
const dot = (f, g) => (a) =>  f(g(a));
const cmp = (fnList) => fnList.reduce(dot, (a) => a);;
const alwayz = (a) => (b) => a;
const els = alwayz(true)
const fals = alwayz(false)
*/
