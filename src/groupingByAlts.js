const groupByA = (
  groupingFn,
  list,
  initVal = {}
) => list.reduce((acc, item) => {
    const key = groupingFn(item);
    return Object.assign(acc, { [key]: (acc[key] || []).concat(item) });
  }, initVal);

const groupByiife = (
  groupingFn,
  list,
  initVal = {}
) => list.reduce(
  (acc, item) => Object.assign(
    acc,
    ((acc, item, key) => (
      { [key]: (acc[key] || []).concat(item) }
    ))(acc, item, groupingFn(item)),
  ),
  initVal);

const data = [
  {name: 'Kyla',  grade: 'A'},
  {name: 'Kat',   grade: 'A'},
  {name: 'Kevin', grade: 'B'},
  {name: 'Kevin', grade: 'D'},
  {name: 'Kris',  grade: 'C'},
];

[
  groupBy(prop('grade'), data, {}),
  groupByA(prop('grade'), data, {}),
  groupByiife(prop('grade'), data, {}),
]
