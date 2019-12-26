<script>
import DateDisplay from './DateDisplay.svelte';
export let events = [];
export let startOrEnd = 'start';
</script>

<table class="table-fixed w-full">
<thead>
  <tr>
    <th class="w-2/5 px-5 py-2">Event</th>
    <th class="w-3/5 px-5 py-2 text-center">
    {#if startOrEnd === 'start'}Starts{:else}Finishes{/if}
    </th>
  </tr>
</thead>
<tbody>
{#each events as event}
  <tr>
    <td class="px-5 py-2">{event.name}</td>
    <td class="px-5 py-2">
    {#if startOrEnd === 'start'}
      <DateDisplay px="1" py="0" {...event.startObject} />
    {:else}
      <DateDisplay px="1" py="0" {...event.endObject} />
    {/if}
    </td>
  </tr>
  {/each}
</tbody>
</table>
