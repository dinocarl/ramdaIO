const prpOr = (fallBack, obj, keyName) => (obj && keyName && obj[keyName]) ? obj[keyName] : fallBack;

const prp = (obj, keyName) => prpOr(undefined, obj, keyName);

const pth = (list, obj) => list.reduce(prp, obj);

const llGetPropByPath = (propName, currPath, linkedList) => pth([ ...currPath, 'head', propName ], linkedList);

const llGetNameByPath = (currPath, linkedList) => llGetPropByPath('name', currPath, linkedList);

const logMsg = (begin, end, pad = 10) => `${begin.padEnd(pad, ' ')} -> ${end}`;

const cmplStep = ({ll, meta}) => (data) => ({curr, completed, history}) => {
  const {name: currName, after, result} = pth([ ...curr, 'head' ], ll);
  const tailPath = [...curr, 'tail'];
  const maybeResetCompleted = meta.reset.includes(currName) ? {} : completed;
  const maybeResult = after ? result : {};
  return {
    curr: tailPath,
    completed: {
      ...maybeResetCompleted,
      [curr.join('.')]: {
        ...data,
        ...maybeResult
      }
    },
    history: [
      ...history,
      logMsg(currName, llGetNameByPath(tailPath, ll), meta.pad)
    ]
  };
};

const prevStep = ({ll, meta}) => ({curr, completed, history}) => {
  const currName = llGetNameByPath(curr, ll);
  const prevPath = curr.slice(0, -1);
  return {
    curr: prevPath,
    completed,
    history: [
      ...history,
      logMsg(currName, llGetNameByPath(prevPath, ll), meta.pad)
    ]
  };
};

const mvToStep = ({ll, meta}) => (targetPath) => ({curr, completed, history}) => ({
  curr: targetPath,
  completed,
  history: [
    ...history,
    logMsg(llGetNameByPath(curr, ll), llGetNameByPath(targetPath, ll), meta.pad)
  ]
});

const booking = {
  meta: { reset: ['service'], pad: 8 },
  ll: {
    head: {
      name: 'service',
      inputs: [{ type: 'Select', name: 'service_selector', label: 'First Name', options: ['A', 'B', 'C'], validation: 'oneOfOptions'}],
      after: [{ action: 'POST', url: 'getSlots' }],
      result: {options: ['10:00am', '11:00am', '12:00pm']}
    }, tail: {
      head: {
        name: 'slots',
        inputs: [{ type: 'Select', name: 'slot_selector', label: 'Select Time', options: 'prevResult', validation: 'oneOfOptions'}],
      }, tail: {
        head: {
          name: 'formInfo',
          inputs: [
            { type: 'Text', name: 'firstName', label: 'First Name', validation: 'validName' },
            { type: 'Text', name: 'lastName', label: 'Last Name', validation: 'validName' },
            { type: 'Date', name: 'dob', label: 'Date of Birth', validation: 'validBirthDate' },
            { type: 'Text', name: 'phone', label: 'Phone Number', validation: 'validPhone' },
            { type: 'Text', name: 'email', label: 'Email', validation: 'validEmail' },
          ]
        }, tail: {
          head: {
            name: 'review',
            inputs: [
              { type: 'ReviewCard', name: 'reviewCard1', valueOf: 'service' },
              { type: 'ReviewCard', name: 'reviewCard2', valueOf: 'slots' },
              { type: 'ReviewCard', name: 'reviewCard3', valueOf: 'formInfo' },
            ]
          }, tail: {
            head: { name: 'confirm' }, tail: null }}}}}
};

const userState = {
  curr: [],
  completed: {},
  history: [],
};

const cmplBookingStep = cmplStep(booking);
const prevBookingStep = prevStep(booking);
const mvToBookingStep = mvToStep(booking);

const mockSteps = [
  cmplBookingStep({useraction: 'approved'}),
  cmplBookingStep({fname: 'Sam', dob: '2000-01-01'}),
  cmplBookingStep({time: '9:10am'}),
  cmplBookingStep({service: 'second'}),
  mvToBookingStep([]),
  cmplBookingStep({fname: 'Sam', dob: '2000-01-01'}),
  cmplBookingStep({time: '9:10am'}),
  prevBookingStep,
  cmplBookingStep({time: '8:10am'}),
  cmplBookingStep({service: 'first'})
];

const dot = (f, g) => (a) => f(g(a));

const cmp = (list) => list.reduce(dot, (val) => val);

module.exports = cmp(mockSteps)(userState);
