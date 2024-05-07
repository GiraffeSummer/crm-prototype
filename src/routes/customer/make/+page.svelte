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
  import MakeCustomer from './makeCustomer.svelte';
  /** @type {import('./$types').PageData} */
  export let data;
  /** @type {import('./$types').ActionData} */
  export let form;

  onMount(() => {
    if (form?.success == true) {
      goto(`/customer/${form.customerId}`);
    }
  });

  onScan((data, event, iQuantity) => {
    console.log(data, event, iQuantity);

    goto(`/customer/${data}`);
  });
</script>

<div class="overflow-x-auto grid content-center justify-items-center gap-1">
  <div class="w-96">
    <form method="POST" action="?/create" class="form-control">
      <MakeCustomer />
      <button type="submit" class="btn btn-primary print:hidden">Aanmaken</button>
    </form>
  </div>
</div>
