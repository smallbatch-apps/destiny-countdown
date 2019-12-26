<script>
import { format, isPast, isFuture, differenceInHours, differenceInMinutes, differenceInDays, differenceInWeeks, isWithinInterval } from 'date-fns';

import { calculateRemaining } from './dateUtils';
import allEventsRaw from './events';

import DateDisplay from './DateDisplay.svelte';
import ListTable from './ListTable.svelte';

$: allEvents = allEventsRaw.map(event => {
  if (event.start)  event.startObject = calculateRemaining(event.start);
  if (event.end) event.endObject = calculateRemaining(event.end);
  return event;
});

$: currentEvents = allEvents.filter(({start, end}) => {
  return isWithinInterval(new Date(), { start, end });
});

$: futureEvents = allEvents.filter(({start}) => {
  return isFuture(start);
});

$: currentSeason = getCurrentSeason();

const getCurrentSeason = () => {
  const currentTime = new Date();
  const season = allEvents.find(({start, end, type}) => {
    return type === 'season' && isWithinInterval(currentTime, { start, end });
  });

  return {...season, ...calculateRemaining(season.end)}
};


$: daily = nextDailyReset();

const nextDailyReset = () => {

  const currentTime = new Date();
  
  let dailyReset = new Date();
  dailyReset.setUTCHours(18);
  dailyReset.setUTCMinutes(0);
  dailyReset.setUTCSeconds(0);

  if(isPast(dailyReset)) {
    dailyReset.setUTCDate(dailyReset.getUTCDate() + 1);
  }

  return calculateRemaining(dailyReset);
}

$: weekly = nextWeeklyReset();

const nextWeeklyReset = () => {
  const currentTime = new Date();

  let daysUntilReset = 2 - currentTime.getUTCDay();

  if(daysUntilReset < 0) {
    daysUntilReset = 7 + daysUntilReset;
  }
  
  let weeklyReset = new Date();
  //const daysUntilTuesday = 
  weeklyReset.setUTCDate(currentTime.getUTCDate() + daysUntilReset);
  weeklyReset.setUTCHours(17);
  weeklyReset.setUTCMinutes(0);
  weeklyReset.setUTCSeconds(0);

  if(isPast(weeklyReset)) {
    weeklyReset.setUTCDate(weeklyReset.getUTCDate() + 7);
  }
  
  return calculateRemaining(weeklyReset);
}

setInterval(() => {
  daily = nextDailyReset();
  weekly = nextWeeklyReset();
}, 30000);
</script>


<p><strong>Note:</strong> Tuesday's daily reset will be replaced by the weekly reset time</p>


<div class="md:flex">
  
  <div class="md:flex-1 m-5">
    <h3 class="text-xl text-left bg-indigo-900 p-1 pl-2">Daily Reset</h3>
    <div class="p-1">
      <DateDisplay {...daily} />
    </div>
  </div>

  <div class="md:flex-1 order-last m-5">
    <h3 class="text-xl text-left bg-indigo-900 p-1 pl-2">Weekly Reset</h3>
    <div class="p-1">
      <DateDisplay {...weekly} />
    </div>
  </div>

  <div class="md:flex-1 m-5 border border-indigo-900 bg-indigo-700">
    <h3 class="text-xl text-left bg-indigo-900 p-1 pl-2">{currentSeason.name}</h3>
    <div class="p-1">
      <DateDisplay {...currentSeason} />
    </div>
  </div>
  
</div>

<div class="p-5 text-left">
  <h3 class="text-xl">Event Listing</h3>

  <p>This is not a complete list of every minor or once-off event within the season. For example it does not include new content or weapon releases.</p>
</div>

<div class="md:flex text-left">
  <div class="md:flex-1 m-5 border border-indigo-900 bg-indigo-700">
    <h3 class="text-xl text-left bg-indigo-900 p-1 pl-2">Current Events</h3>
    
    <ListTable events={currentEvents} startOrEnd="end" />
  </div>

  <div class="md:flex-1 m-5 border border-indigo-900 bg-indigo-700">
    <h3 class="text-xl text-left bg-indigo-900 p-1 pl-2">Future Events</h3>

    <ListTable events={futureEvents} startOrEnd="start" />
  </div>


</div>