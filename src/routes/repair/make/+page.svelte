<script lang="ts">
  // @ts-ignore
  import Barcode from '$lib/components/Barcode.svelte';
  import Select from 'svelte-select';
  import { subscribe as onScan } from '$lib/components/onScan.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Fa from 'svelte-fa';
  import * as fa from '@fortawesome/free-solid-svg-icons';
  import PaginateButtons from '$lib/components/PaginateButtons.svelte';
  import LabeledInput from '$lib/components/LabeledInput.svelte';
  import { onMount } from 'svelte';
  import { fullNameFormatter } from '$lib/Formatters';
  import MakeCustomer from '../../customer/make/makeCustomer.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  /** @type {import('./$types').ActionData} */
  export let form;

  let createNewCustomer = false;

  onMount(() => {
    if (form?.success == true) {
      goto(`/repair/${form.repairId}`);
    }
  });

  onScan((data, event, iQuantity) => {
    console.log(data, event, iQuantity);

    goto(`/repair/${data}`);
  });

  const customerFilter = (label, filterText, option) =>
    `${option.firstName || ''} ${option.lastName || ''}`
      .trim()
      .toLowerCase()
      .includes(filterText.toLowerCase());
</script>

<div class="overflow-x-auto grid content-center justify-items-center gap-1">
  <div class="w-96">
    <form method="POST" action="?/create" class="form-control">
      <div class="form-control w-1/2">
        <label class="label cursor-pointer">
          <span class="label-text text-lg">Nieuwe klant</span>
          <input
            type="checkbox"
            class="toggle"
            bind:checked={createNewCustomer}
          />
        </label>
      </div>
      {#if createNewCustomer}
        <MakeCustomer />
        <div class="divider"></div>
      {:else}
        <!-- else content here -->
        <LabeledInput let:style tr="Klant">
          {#if data.customers.length > 0}
            <Select
              placeholder="Klant"
              items={data.customers}
              name="customer"
              id="customer"
              itemFilter={customerFilter}
              itemId="id"
              required
            >
              <svelte:fragment let:selection slot="selection">
                <b>{fullNameFormatter(selection)}</b>
              </svelte:fragment>
              <svelte:fragment slot="item" let:item let:index>
                <b>{fullNameFormatter(item)}</b>
              </svelte:fragment>
            </Select>
          {:else}
            <b>no Customers</b>
          {/if}
        </LabeledInput>
      {/if}

      <LabeledInput let:style tr="Ontvangen door">
        <select
          required
          name="receivedById"
          id="receivedById"
          class="select select-bordered w-full max-w-xs"
        >
          {#each data.employees as stat}
            <option value={stat.id}>{stat.name}</option>
          {:else}
            <option value="disabled" disabled>no options</option>
          {/each}
        </select>
      </LabeledInput>
      <LabeledInput let:style tr="Laatst gewerkt aan door">
        <select
          required
          name="employee"
          id="employee"
          class="select select-bordered w-full max-w-xs"
        >
          {#each data.employees as stat}
            <option value={stat.id}>{stat.name}</option>
          {:else}
            <option value="disabled" disabled>no options</option>
          {/each}
        </select>
      </LabeledInput>

      <LabeledInput let:style tr="Status">
        <select
          required
          name="status"
          id="status"
          class="select select-bordered w-full max-w-xs"
        >
          {#each data.statusses as stat}
            <option value={stat.id}>{stat.name}</option>
          {:else}
            <option value="disabled" disabled>no options</option>
          {/each}
        </select>
      </LabeledInput>

      <LabeledInput let:style tr="Status details" bordered={true}>
        <input name="details" type="text" class={style} />
      </LabeledInput>

      <LabeledInput let:style tr="OS Password" bordered={true}>
        <input name="password" type="text" class={style} />
      </LabeledInput>

      <LabeledInput let:style tl="Meegeleverd">
        <textarea
          rows="3"
          name="included"
          class="textarea textarea-bordered"
          placeholder="Meegeleverd"
        />
      </LabeledInput>
      <LabeledInput let:style tl="Probleem">
        <textarea
          name="issue"
          class="textarea textarea-bordered"
          placeholder="Probleem"
        />
      </LabeledInput>
      <button type="submit" class="btn btn-primary">Aanmaken</button>
    </form>
  </div>
</div>
