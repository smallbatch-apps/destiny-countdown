<script>
import config from './config';

$: showAbout = true;


</script>

<div class="text-left text-sm bg-gray-800 p-5 rounded mb-5 flex hidden">
  <div class="flex-1 p-5">
    <h3 class="text-lg text-orange-600 mb-2">What's this for?</h3>

    <p class="pb-3">The question "when is the reset" shouldn't be a hard one to answer but it is for people in oddish timezones.</p>
    
    <p class="pb-3">It doesn't help me to know the reset time in 5am Wednesday Morning, Pacific Mountain Time, when I'm an Australian living in Bangkok.</p>
    
    <p class="pb-3">Also, I'm playing with a friend in Australia who doesn't have daylight savings time, and another one who does. Trying to calculate around timezones and datelines is a PITA for something that could be answered as "an hour and a half" and be universally true.</p>

  </div>

  <div class="flex-1 p-5">

    <h3 class="text-lg text-orange-600 mb-2">Why do you need to know the reset times?</h3>

    <p class="pb-3">I am often not sure if I have time to get in a few bounties before the reset, if I can finish this quest, etc.</p>

    <p class="pb-3">It's also useful to know how long is left in the season.</p>

    <h3 class="text-lg text-orange-600 mb-2">How accurate is it?</h3>

    <p class="pb-3">It's actually based on your computer clock, so there's that. I wouldn't trust it within a few minutes.</p>

    <p>Also, by design it's optimistic. For example it assumes a season finishes and a new one begins, with no downtime. Ditto for weekly resets. It doesn't take into account server maintenence, hotfixes, or patching. It's really just intended as a place to quickly check to see if you've got time for a <em>whatever</em> before the reset.</p>

  </div>


</div>