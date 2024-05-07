<script lang="ts">
  let barcode = '#barcode';
  export let value;
  export let marginLeft: undefined | number = undefined;
  export let component: 'img' | 'svg' = 'svg';

  export let text: string | undefined = undefined;
  import JsBarcode from 'jsbarcode';
  import { onMount, tick, afterUpdate } from 'svelte';
  $: options = {
    width: 1,
    height: 30,
    //format: "",
    text: text,
    fontSize: 14,
    marginLeft,
    displayValue: text != undefined,
  };

  const defaultOptions = {};

  onMount(async () => {
    await tick();
    JsBarcode(barcode, value, options);
  });
  afterUpdate(async () => {
    await tick();
    JsBarcode(barcode, value, Object.assign(defaultOptions, options));
  });
</script>

<div class="wrapper">
  {#if component == 'img'}
    <img id="barcode" />
  {:else}
    <svg id="barcode" />
  {/if}
</div>
