import { differenceInHours, differenceInMinutes, differenceInDays, differenceInWeeks } from 'date-fns';
const currentTime = new Date();

export const calculateRemaining = fromTime => {

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
}