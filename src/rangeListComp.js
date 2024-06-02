
const highlightedOrPlain = (bool, str) => bool ? `<strong>${str}</strong>` : str;

const RangeListComp = (rl) => [
  '<ol>',
  ...rl.map(({header, start, end, highlighted}) => `<li>${
    highlightedOrPlain(
      highlighted,
      `${header}: ${start} - ${end}`
    )}</li>`),
  '</ol>'
];

const data = [
  { date: '2024-05-30', open: { from: '08:00am', to: '08:00pm' } },
  { date: '2024-05-31', open: { from: '08:00am', to: '08:00pm' } },
  { date: '2024-06-01', open: { from: '08:00am', to: '08:00pm' } }
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const hours2RangeList = (arr) => arr.map(
  ({ date, open: { from: start, to: end } }) => ({
    header: daysOfWeek[new Date(date).getDay()],
    highlighted: date === '2024-05-31',
    start, end,
  })
);


module.exports = RangeListComp(
  hours2RangeList(data)
);

