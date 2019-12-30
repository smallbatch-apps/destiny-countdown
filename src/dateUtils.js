import { differenceInHours, differenceInMinutes, differenceInDays, differenceInWeeks } from 'date-fns';

export const calculateRemaining = (fromTime, type = null) => {
  const currentTime = new Date();
  
  const weeksRemaining = differenceInWeeks(fromTime, currentTime, {rounding: "floor"});

  const daysRemaining = differenceInDays(fromTime, currentTime, {rounding: "floor"}) % 7;
  const hoursRemaining = differenceInHours(fromTime, currentTime, {rounding: "floor"}) % 24;
  const minutesRemaining = differenceInMinutes(fromTime, currentTime, {rounding: "floor"}) % 60;
  
  return {
    weeksRemaining,
    daysRemaining,
    hoursRemaining,
    minutesRemaining
  }

  // if (type === 'daily' || type === 'season') {
  //   console.log('VVVVVVV');
  //   console.log(type);
  //   console.log(currentTime.toUTCString());
  //   console.log(fromTime.toUTCString());
  //   console.log(minutesRemaining);
  //   console.log('^^^^^^');
  // }
  
  return returnValue;
}

export const populateRemaining = event => {
  if (event.start)  event.startObject = calculateRemaining(event.start);
  if (event.end) event.endObject = calculateRemaining(event.end);
  return event;
}