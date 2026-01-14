const facilityDetails = {
  clinicType: 'UNIVERSITY',
  apptTypes: ['Illness', 'Injury', 'ox-standard']
};

const VALID_TYPES = [
  { key: 'Illness', label: 'Illness', disabled: false },
  { key: 'Injury',  label: 'Injury', disabled: false },
  { key: 'School / Sport Physical', label: 'School or sport physical', disabled: false },
  { key: 'Workplace', label: 'Workplace screening or exam', disabled: false },
  { key: 'OTHER', label: 'Other', disabled: false },
];

const disableApptTypeForHeroBtns = (apptTypesSet, clinicType, lcApptType) =>
  (lcApptType === 'workplace' && !(apptTypesSet.has('om-complex') || apptTypesSet.has('om-standard')))
    || (lcApptType !== 'other' && lcApptType !== 'workplace' && !apptTypesSet.has(lcApptType))
    || (lcApptType === 'other' && clinicType !== 'UNIVERSITY' && !apptTypesSet.has('illness'))
    || (lcApptType === 'other' && clinicType === 'UNIVERSITY')

const disableApptTypeForDropdown = (apptTypesSet, clinicType, lcApptType) =>
  disableApptTypeForHeroBtns(apptTypesSet, clinicType, lcApptType)
    || (lcApptType === 'injury' && clinicType === 'UNIVERSITY')

// standalone fn to determine whether a particular appt type is available based on provided context
const availableValidType = (apptTypesSet, clinicType, disablingFn) => ({key, label}) => ((lcApptType) => ({
  key,
  // label,
  disabled: disablingFn(apptTypesSet, clinicType, lcApptType)
}))(key.toLowerCase());


module.exports = VALID_TYPES.map(
  availableValidType(
    new Set(facilityDetails.apptTypes.map((key) => key.toLowerCase())),
    facilityDetails.clinicType,
    disableApptTypeForHeroBtns
  )
);
