const logMsg = (begin, end, pad) => `${begin.padEnd(pad, ' ')} -> ${end}`;

const prevStepName = (flowLookup, curr) => flowLookup[flowLookup[curr].prev]
  ? flowLookup[curr].prev
  : curr;

const nextStepName = (flowLookup, curr, completed, checked = new Set()) => (
  // prevent circular lookups
  flowLookup[curr].next && !checked.has(curr)
    ? completed[curr] && completed[flowLookup[curr].next]
      ? nextStepName(flowLookup, flowLookup[curr].next, completed, checked.add(curr))
      : flowLookup[curr].next
    : curr
);

const cmplStep = (flowLookup) => (data = {}) => ({curr, completed, history}) => {
  const maybeResetCompleted = flowLookup[curr].reset ? {} : completed;
  const nextStep = nextStepName(flowLookup, curr, maybeResetCompleted);

  return {
    curr: nextStep,
    completed: Object.assign(
      {},
      maybeResetCompleted,
      {[curr]: {ts: Date.now(), data}}),
    history: history.concat(logMsg(curr, nextStep, flowLookup.pad)),
  };
};

const prevStep = (flowLookup) => ({curr, completed, history}) => {
  const prevStep = prevStepName(flowLookup, curr);
  return {
    curr: prevStep,
    completed,
    history: history.concat(logMsg(curr, prevStep, flowLookup.pad)),
  };
};

const mvToStep = (flowLookup) => (target) => ({curr, completed, history}) => ({
  curr: target,
  completed,
  history: history.concat(logMsg(curr, target, flowLookup.pad)),
});


const userState = {
  curr: 'service',
  completed: {},
  history: [],
};

const bookingGraph = {
  service:   {                   next: 'slots',    reset: true },
  slots:     { prev: 'service',  next: 'formInfo'  },
  formInfo:  { prev: 'slots',    next: 'review'    },
  review:    { prev: 'formInfo', next: 'confirmed' },
  confirmed: { },
  pad:       8,
};

const cmplBookingStep = cmplStep(bookingGraph);
const prevBookingStep = prevStep(bookingGraph);
const mvToBookingStep = mvToStep(bookingGraph);

const mockSteps = [
  cmplBookingStep(),
  cmplBookingStep({selected: '11:10am'}),
  mvToBookingStep('slots'),
  cmplBookingStep({name: 'Jeffrey', dob: '2000-01-01'}),
  cmplBookingStep({selected: '10:10am'}),
  cmplBookingStep({selected: 'second'}),
  mvToBookingStep('service'),
  cmplBookingStep({name: 'Jeff', dob: '2000-01-01'}),
  cmplBookingStep({selected: '9:10am'}),
  prevBookingStep,
  cmplBookingStep({selected: '8:10am'}),
  cmplBookingStep({selected: 'first'}),
];

module.exports = mockSteps.reduceRight(
  (acc, fn, idx) => acc.concat(
    fn(acc[acc.length - 1])
  ),
  [userState]
);

// const mockStepThru = compose(
//   ...mockSteps
// );
// mockStepThru(userState);
