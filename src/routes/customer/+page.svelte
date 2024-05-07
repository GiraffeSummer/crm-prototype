<script lang="ts">
  // @ts-ignore
  import Barcode from '$lib/components/Barcode.svelte';
  import { subscribe as onScan } from '$lib/components/onScan.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Fa from 'svelte-fa';
  import * as fa from '@fortawesome/free-solid-svg-icons';
  import PaginateButtons from '$lib/components/PaginateButtons.svelte';
  import { DateFormat } from '$lib/Formatters';

  /** @type {import('./$types').PageData} */
  export let data;
  console.log(data);
  onScan((data, event, iQuantity) => {
    console.log(data, event, iQuantity);

    goto(`/customer/${data}`);
  });
</script>

<div class="overflow-x-auto">
  <button
    class="btn btn-primary"
    on:click={() => {
      goto('/customer/make');
    }}>+ Nieuw</button
  >
  {#if data.customers.length > 0}
    <!-- content here -->
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Voornaam</th>
          <th>Achternaam</th>
          <th>email</th>
          <th>telefoon</th>
          <th>reparaties</th>
          <th>#</th>
          <th>Aangemaakt op</th>
        </tr>
      </thead>
      <tbody>
        {#each data.customers as customer}
          <tr
            class="bg-base-200 cursor-pointer hover"
            on:click={() => {
              goto(`/customer/${customer.id}`);
            }}
          >
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{customer.repairs.length}</td>
            <th>{customer.id}</th>
            <td>{DateFormat.format(customer.createdAt)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <PaginateButtons bind:pagination={data.pagination} />
  {/if}
</div>
