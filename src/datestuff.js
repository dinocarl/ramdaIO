const {
  add,
  always,
  compose,
  concat,
  cond,
  flip,
  identity,
  ifElse,
  invoker,
  not,
  tap,
  test,
  T
} = require("ramda");

const checkType = obj => Object.prototype.toString.call(obj).slice(8, -1);
const iz = type => obj =>
  typeof obj !== "undefined" && obj !== null && checkType(obj) === type;

const izNil = item => item == null;
const izEmptyArray = item => Array.isArray(item) && item.length === 0;
const izEmptyObject = item =>
  iz("Object")(item) && izEmptyArray(Object.keys(item));
const izEmpty = item =>
  izEmptyArray(item) || izEmptyObject(item) || item === "";
const cmplement = bool => !bool;

const isntNil = item => cmplement(izNil(item));
const isntEmpty = item => cmplement(izEmpty(item));

const isntNilOrEmpty = item => isntNil(item) && isntEmpty(item);

const nonNilJoin = (arr, glue) => arr.filter(isntNilOrEmpty).join(glue);

// Pattern for YYYY-MM-DD style dates
const ymdPattern = `(19|20)\\d\\d[- \\/.](0[1-9]|[12][0-9]|3[01])[- \\/.](0[1-9]|1[012])`;

const ymdOnlyPattern = `^${ymdPattern}$`;

const ymdOnlyRE = new RegExp(ymdOnlyPattern);

const formattedDate = dateStr =>
  new Intl.DateTimeFormat("en-US").format(dateStr);

const UTCStrOrIdent = ifElse(
  test(ymdOnlyRE),
  flip(concat)("T00:00:00"),
  identity
);

const getTime = invoker(0, "getTime");

const createDate = dateStr => new Date(dateStr);

const isValidDate = compose(
  not,
  isNaN,
  getTime
);

const frmatDate = compose(
  cond([[isValidDate, formattedDate], [T, always("")]]),
  createDate,
  UTCStrOrIdent
);

// Converts UTC or YYYY-MM-DD date string to m/d/YYYY or empty string
function formatDate(timestamp) {
  // Dates may be UTC or YYYY-MM-DD - convert the latter into the former
  let maybeUTCStr = ymdOnlyRE.test(timestamp)
    ? `${timestamp}T00:00:00`
    : timestamp;
  // need to validate that the above string is a date
  let maybeValidDate = new Date(maybeUTCStr);
  return !isNaN(maybeValidDate.getTime())
    ? new Intl.DateTimeFormat("en-US").format(maybeValidDate)
    : "";
}

const formatDateSpan = ({
  startDate,
  endDate,
  polymorphicEndDate = "Present"
}) =>
  nonNilJoin(
    [
      formatDate(startDate),
      polymorphicEndDate || endDate
        ? endDate
          ? formatDate(endDate)
          : polymorphicEndDate === true
          ? "Present"
          : polymorphicEndDate
        : null
    ],
    " - "
  );

module.exports =
  frmatDate('Jul 17, 2000');
