<script>
import { format, isPast, isFuture, differenceInHours, differenceInMinutes, differenceInDays, differenceInWeeks, isWithinInterval } from 'date-fns';

import { calculateRemaining, populateRemaining } from './dateUtils';

import allEventsRaw from './events';

import DateDisplay from './DateDisplay.svelte';
import ListTable from './ListTable.svelte';

$: currentMinute = (new Date()).getUTCMinutes();

$: allEvents = allEventsRaw.map(populateRemaining);

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

  return {...season, ...calculateRemaining(season.end, 'season')}
};


$: daily = nextDailyReset();

const nextDailyReset = () => {
  let dailyReset = new Date();
  dailyReset.setUTCHours(17);
  dailyReset.setUTCMinutes(0);
  dailyReset.setUTCSeconds(0);

  if(isPast(dailyReset)) {
    dailyReset.setUTCDate(dailyReset.getUTCDate() + 1);
  }
  
  return calculateRemaining(dailyReset, 'daily');
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
  const newCurrentMinute = (new Date()).getUTCMinutes();
  //console.log((new Date()).getUTCSeconds());
  if(newCurrentMinute === currentMinute) return;
  
  currentMinute = newCurrentMinute;
  
  daily = nextDailyReset();
  weekly = nextWeeklyReset();
  currentSeason = getCurrentSeason();
  allEvents = allEventsRaw.map(populateRemaining);
}, 1000);
</script>

<div class="md:flex">
  
  <div class="md:flex-1 m-5">
    <h3 class="text-xl text-left text-orange-600 bg-gray-900 p-1 pl-2">Daily Reset</h3>
    <div class="p-1">
      <DateDisplay {...daily} />
    </div>
  </div>

  <div class="md:flex-1 order-last m-5">
    <h3 class="text-xl text-left text-orange-600 bg-gray-900 p-1 pl-2">Weekly Reset</h3>
    <div class="p-1">
      <DateDisplay {...weekly} />
    </div>
  </div>

  <div class="md:flex-1 m-5 border border-gray-900  bg-gray-700">
    <h3 class="text-xl text-left text-orange-600 bg-gray-900 p-1 pl-2">{currentSeason.name}</h3>
    <div class="p-1">
      <DateDisplay {...currentSeason} />
    </div>
  </div>
  
</div>

<div class="p-5 text-left">
  <h3 class="text-xl text-orange-600">Event Listing</h3>

  <p>This is not a complete list of every minor or once-off event within the season. For example it does not include new content or weapon releases.</p>
</div>

<div class="md:flex text-left">
  <div class="md:flex-1 m-5 border border-gray-900 bg-gray-700">
    <h3 class="text-xl text-left text-orange-600 bg-gray-900 p-1 pl-2">Current Events</h3>
    
    <ListTable events={currentEvents} startOrEnd="end" />
  </div>

  <div class="md:flex-1 m-5 border border-gray-900 bg-gray-700">
    <h3 class="text-xl text-left text-orange-600 text-orange-600 bg-gray-900 p-1 pl-2">Future Events</h3>

    <ListTable events={futureEvents} startOrEnd="start" />
  </div>


</div>
<div class="px-1 py-0 hidden"><div class="px-5 py-3"></div></div>