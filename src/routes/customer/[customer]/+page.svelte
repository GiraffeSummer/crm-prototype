<script>
  import Backhome from '$lib/components/Backhome.svelte';
  import LabeledInput from '$lib/components/LabeledInput.svelte';
  import AlertIcon from '$lib/components/AlertIcon.svelte';
  import { fullNameFormatter } from '$lib/Formatters';
  import Select from 'svelte-select';
  import Barcode from '$lib/components/Barcode.svelte';
  /** @type {import('./$types').PageData} */
  export let data;
  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<div class="print:hidden">
  <Backhome route={`/customer`} />
</div>

<div class="">
  <form method="POST" action="?/edit" class="form-control">
    <input type="hidden" name="customerId" value={data.customer.id} />

      <LabeledInput let:style tr="Voornaam" bordered={true}>
        <input
          type="text"
          name="firstName"
          value={data.customer.firstName}
          class={style + ' cursor-default'}
        />
      </LabeledInput>
      <LabeledInput let:style tr="Achternaam" bordered={true}>
        <input
          type="text"
          name="lastName"
          value={data.customer.lastName}
          class={style + ' cursor-default'}
        />
      </LabeledInput>
    <div class="grid gap-2 grid-flow-col p-1">
      <LabeledInput let:style tr="Email" bordered={true}>
        <input
          name="email"
          type="text"
          class={style}
          bind:value={data.customer.email}
        />
      </LabeledInput>

      <div>
        {#if data.customer.repairs.length > 0}
          <!-- content here -->
          <a href="/repair?customer={data.customer.id}" class="btn btn-primary"
            >Reparaties: {data.customer.repairs.length}</a
          >
        {:else}
          <button class="btn btn-disabled"
            >Reparaties: {data.customer.repairs.length}</button
          >
        {/if}
      </div>
    </div>
    <LabeledInput let:style tr="Telefoon" bordered={true}>
      <input
        name="phone"
        type="text"
        class={style}
        bind:value={data.customer.phone}
      />
    </LabeledInput>

    <LabeledInput let:style tr="Details">
      <textarea
        name="details"
        class="textarea textarea-bordered"
        bind:value={data.customer.details}
        placeholder="Details"
      />
    </LabeledInput>

    <button type="submit" class="btn btn-primary print:hidden">Update</button>
  </form>
</div>
