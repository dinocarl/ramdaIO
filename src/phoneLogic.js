const {
  complement,
  compose,
  equals,
  isNil,
  join,
  juxt,
  last,
  reject,
  replace,
} = require("ramda");
const {
  isntEmpty,
  isntNil,
  validateBasic,
  validateNil,
} = require('./utils');

const isCaseA = equals('caseA');
const isntCaseA = complement(isCaseA);
const formatPhone = compose(
  replace(/[ -]/g, '.'),
  replace(/[()]/g, ''),
);

const assembleLinkPieces = ({
  brand,
  displayFirstName,
  firstName,
  officePhone,
  fallbackPhone,
}) => (
  reject(isNil,
    [
      isntCaseA(brand) && validateBasic(officePhone) ? 'Call' : null,
      isntCaseA(brand) && validateBasic(officePhone) && validateBasic(displayFirstName) ? displayFirstName : null,
      isntCaseA(brand) && validateBasic(officePhone) && validateBasic(firstName) && validateNil(displayFirstName) ? firstName : null,
      validateBasic(officePhone) ? formatPhone(officePhone) : null,
      isCaseA(brand) && validateBasic(fallbackPhone) && validateNil(officePhone) ? formatPhone(fallbackPhone) : null,
    ]
  )
);

const linkStrs = compose(
  juxt([
    join(' '), // linkText
    last, // dialNumber
  ]),
  assembleLinkPieces
);

module.exports =
  linkStrs({
    brand: 'caseB',
    displayFirstName: 'professor pericles',
    firstName: 'pericles',
    fallbackPhone: '(866) 111-1234',
    officePhone: '(233) 455-6677',
  });
