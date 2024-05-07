<script>
  import LabeledInput from '$lib/components/LabeledInput.svelte';
  import { EURO, fullNameFormatter } from '$lib/Formatters';
  /** @type {import('./$types').PageData} */
  export let data;
  /** @type {import('./$types').ActionData} */
</script>

<div class="grid gap-4 grid-flow-col p-4">
  <div class="">
    <LabeledInput let:style tr="Klant">
      <input
        readonly
        name="serial"
        type="text"
        value={fullNameFormatter(data.repair.customer)}
        class={style + ' cursor-not-allowed '}
      />
    </LabeledInput>

    <LabeledInput let:style tr="OS Password">
      <input
        name="password"
        type="text"
        class={style}
        value={data.repair.password}
      />
    </LabeledInput>

    <div>
      <h2 class="fon">Meegeleverd door klant:</h2>
      <p class="prose">{data.repair.included}</p>
    </div>
    <br />
  </div>

  <div>
    <svg id="barcode">
      <line
        stroke-width="1"
        y2="1"
        x2="1"
        y1="1"
        x1="1"
        stroke="#000"
        fill="none"
      />
    </svg>
    <div>
      <LabeledInput let:style tr="email">
        <input
          readonly
          type="text"
          value={data.repair.customer.email}
          class={style + ' cursor-default'}
        />
      </LabeledInput>

      <LabeledInput let:style tr="telefoon">
        <input
          readonly
          type="text"
          value={data.repair.customer.phone}
          class={style + ' cursor-default'}
        />
      </LabeledInput>
    </div>
  </div>
</div>
<div class="grid gap-4 grid-flow-col p-4">
  <div>
    <h2 class="fon">Probleem:</h2>
    <p class="prose">{data.repair.issue}</p>
  </div>
</div>

<style>
  @media print {
    @page {
      margin: 0;
    }
  }
</style>
