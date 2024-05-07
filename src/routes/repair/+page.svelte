<script lang="ts">
  // @ts-ignore
  import Barcode from '$lib/components/Barcode.svelte';
  import { subscribe as onScan } from '$lib/components/onScan.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Fa from 'svelte-fa';
  import * as fa from '@fortawesome/free-solid-svg-icons';
  import PaginateButtons from '$lib/components/PaginateButtons.svelte';
  import { EURO, fullNameFormatter } from '$lib/Formatters';

  /** @type {import('./$types').PageData} */
  export let data;
  console.log(data);
  onScan((data, event, iQuantity) => {
    console.log(data, event, iQuantity);

    goto(`/repair/${data}`);
  }, 'repairscan');
</script>

<div class="overflow-x-auto">
  <button
    class="btn btn-primary"
    on:click={() => {
      goto('/repair/make');
    }}>+ Nieuw</button
  >
  {#if data.repairs.length > 0}
    <!-- content here -->
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Klant</th>
          <th>Code</th>
          <th>Status</th>
          <th>Detail</th>
          <th>Ontvangen door</th>
          <th>Laatst gewerkt aan door</th>
          <th>Probleem</th>
          <th>Prijs</th>
        </tr>
      </thead>
      <tbody>
        {#each data.repairs as repair}
          <tr
            class="bg-base-200 cursor-pointer hover"
            on:click={() => {
              goto(`/repair/${repair.code}`);
            }}
          >
            <th>{repair.id}</th>
            <td>{fullNameFormatter(repair.customer)}</td>
            <td>{repair.code}</td>
            <td>{repair.status.name}</td>
            <td>{repair?.details || ''}</td>
            <td>{repair.receivedBy.name}</td>
            <td>{repair.employee.name}</td>
            <!-- <td><Barcode value={repair.code} component="img"/></td> -->
            <td>{repair.issue}</td>
            <td>{EURO.format(repair.price / 100)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <PaginateButtons bind:pagination={data.pagination} />
  {/if}
</div>
