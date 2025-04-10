const formatHrTo24 = (hour, prd) => {
  const parsedHour = parseInt(hour, 10);
  const parsedMeridian = prd.toLowerCase();
  return [
    [parsedHour]
      .filter( (item) => isNaN(item) || (item === 12 && parsedMeridian === 'am') )
      .map( () => 0 ),
    [parsedHour]
      .filter( (item) => item < 12 && parsedMeridian === 'pm' )
      .map( (item) => item + 12 ),
    [parsedHour % 24]
  ].flat()[0];
};


function convertTo24HourFormat(timeString) {
  const [_, hr = '00', mn = '00', prd = 'am'] =
    /(\d{1,2}):(\d{2})(am|pm|:\d{2})/i.exec(timeString) || [];

  return `${formatHrTo24(hr, prd)}`.padStart(2, '0').concat(':', mn, ':00');
}


module.exports = convertTo24HourFormat('asdf2:23pmasdf');
// formatHrTo24('12', 'am')
