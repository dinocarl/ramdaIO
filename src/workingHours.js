const examples = [{
  weeklyHours: {
    MonOpen: '08:00', MonClose: '20:00',
    TueOpen: '08:00', TueClose: '20:00',
    WedOpen: '08:00', WedClose: '20:00',
    ThuOpen: '08:00', ThuClose: '20:00',
    FriOpen: '08:00', FriClose: '20:00',
  },
  exceptions: {
    '2024-07-04': { ThuOpen: 'closed', ThuClose: 'closed', ThuException: 'fullDayClosure', ThuReason: 'National Holiday' },
    '2024-07-16': { TueOpen: '08:00', TueClose: '16:00', TueException: 'earlyClosure', TueReason: 'Absent provider' },
    '2024-07-18': { FriOpen: '10:00', FriClose: '20:00', FriException: 'lateOpening', FriReason: 'Absent provider' }
  }
}];

const sampleDates = [
  '2024-07-04',
  '2024-07-16',
  '2024-07-17',
  '2024-07-18',
];

module.exports = sampleDates.map(
  (sampleDate) => examples.map(
    ({weeklyHours, exceptions}) => Object.assign({}, weeklyHours, exceptions?.[sampleDate] ?? {})
  )
);
