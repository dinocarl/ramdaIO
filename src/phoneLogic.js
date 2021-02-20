#!/usr/bin/env node
"use strict";

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
  basicValidations,
  nilChecks,
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
      isntCaseA(brand) && basicValidations(officePhone) ? 'Call' : null,
      isntCaseA(brand) && basicValidations(officePhone) && basicValidations(displayFirstName) ? displayFirstName : null,
      isntCaseA(brand) && basicValidations(officePhone) && basicValidations(firstName) && nilChecks(displayFirstName) ? firstName : null,
      basicValidations(officePhone) ? formatPhone(officePhone) : null,
      isCaseA(brand) && basicValidations(fallbackPhone) && nilChecks(officePhone) ? formatPhone(fallbackPhone) : null,
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
