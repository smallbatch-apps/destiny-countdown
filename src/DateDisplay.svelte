<script>
  export let weeksRemaining = 0;
  $: weeksLabel = weeksRemaining === 1 ? 'wk' : 'wks'; 
  $: displayWeeks = weeksRemaining > 0;
  
  export let daysRemaining = 0;
  $: daysLabel = daysRemaining === 1 ? 'day' : 'days';
  $: displayDays = daysRemaining > 0 || displayWeeks;

  export let hoursRemaining = 0;
  $: hoursLabel = hoursRemaining === 1 ? 'hr' : 'hrs';
  $: displayHours = hoursRemaining > 0 || displayDays;
  
  export let minutesRemaining = 0;
  $: minutesLabel = minutesRemaining === 1 ? 'min' : 'mins';

  export let py = 3;
  export let px = 5;
</script>
 
<div class="flex justify-center">

  {#if displayWeeks}
    <div class="px-{px} py-{py}">{weeksRemaining} <span class="text-xs">{weeksLabel}</span></div>
  {/if}
  {#if displayDays}
    <div class="px-{px} py-{py}">{daysRemaining} <span class="text-xs">{daysLabel}</span></div>
  {/if}
  {#if displayHours}
    <div class="px-{px} py-{py}">{hoursRemaining} <span class="text-xs">{hoursLabel}</span></div>
  {/if}

  <div class="px-{px} py-{py}">{minutesRemaining} <span class="text-xs">{minutesLabel}</span></div>
</div>