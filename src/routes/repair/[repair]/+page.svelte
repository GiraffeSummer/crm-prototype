<script>
  import Backhome from "$lib/components/Backhome.svelte";
  import JsBarcode from "jsbarcode";
  import LabeledInput from "$lib/components/LabeledInput.svelte";
  import AlertIcon from "$lib/components/AlertIcon.svelte";
  import { EURO, fullNameFormatter, formatCurrency } from "$lib/Formatters";
  import Select from "svelte-select";
  import { subscribe as onScan, goto } from "$lib/components/onScan.svelte";
  import Barcode from "$lib/components/Barcode.svelte";
  import Fa from "svelte-fa";
  import * as fa from "@fortawesome/free-solid-svg-icons";
  /** @type {import('./$types').PageData} */
  export let data;
  /** @type {import('./$types').ActionData} */
  export let form;

  function printPage() {
    return () => {
      const printWindow = window.open(
        `/repair/${data.repair.code}/print`,
        "Print",
        "left=200, top=200, width=950, height=500, toolbar=0, resizable=0",
      );

      printWindow.addEventListener(
        "load",
        function () {
          const printOptions = {
            width: 2,
            height: 30,
            fontSize: 14,
          };
          JsBarcode(
            printWindow.document.querySelector("#barcode"),
            data.repair.code,
            printOptions,
          );
          const chrome = Boolean(printWindow.chrome);
          if (chrome) {
            printWindow.print();
            setTimeout(function () {
              printWindow.close();
            }, 500);
          } else {
            printWindow.print();
            printWindow.close();
          }
        },
        true,
      );
    };
  }

  function printImg(tag) {
    return () => {
      const source = document.querySelector(tag).src;
      const pwa = window.open("about:blank", "_new");
      pwa.document.open();
      pwa.document.write(
        `<html><head><${"script"}>
          function loaded(){
          setTimeout('startprint()', 10);}
          function startprint(){window.print();window.close()}
          </${"script"}></head><body onload='loaded()'>
            <div style="font-family: monospace; text-align: center;">${data.repair.code}</div>
            <img src='${source}' />
            <style>@media print {@page {margin: 0;}body {margin: 1.6cm;}}</style></body></html>`,
      );
      pwa.document.close();
    };
  }

  const customerFilter = (label, filterText, option) =>
    `${option.firstName || ""} ${option.lastName || ""}`
      .trim()
      .toLowerCase()
      .includes(filterText.toLowerCase());

  onScan((data, event, iQuantity) => {
    console.log(data, event, iQuantity);

    goto(`/repair/${data}`);
  }, "repairscan");
</script>

<div class="print:hidden">
  <Backhome route={`/repair`} />
</div>

<div class="grid gap-4 grid-flow-col p-4">
  <div class="">
    <form method="POST" action="?/edit" class="form-control">
      <input type="hidden" name="repairId" value={data.repair.id} />

      <LabeledInput let:style tr="Klant">
        <input
          readonly
          name="serial"
          type="text"
          value={fullNameFormatter(data.repair.customer)}
          class={style + " cursor-not-allowed input-bordered"}
        />
      </LabeledInput>

      <LabeledInput let:style tr="Aangenomen door">
        <select
          required
          name="receivedById"
          id="receivedById"
          bind:value={data.repair.receivedById}
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
          bind:value={data.repair.employeeId}
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
          bind:value={data.repair.statusId}
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

      <LabeledInput let:style tr="Details" bordered={true}>
        <input
          name="details"
          type="text"
          class={style}
          bind:value={data.repair.details}
        />
      </LabeledInput>

      <LabeledInput let:style tr="OS Password" bordered={true}>
        <input
          name="password"
          type="text"
          class={style}
          bind:value={data.repair.password}
        />
      </LabeledInput>
      <div class="print:hidden">
        <LabeledInput let:style tl="Meegeleverd">
          <textarea
            rows="3"
            name="included"
            bind:value={data.repair.included}
            class="textarea textarea-bordered print:hidden"
            placeholder="Included"
          />
        </LabeledInput>

        <LabeledInput let:style tl="Probleem">
          <textarea
            rows="5"
            bind:value={data.repair.issue}
            name="issue"
            class="textarea textarea-bordered print:hidden"
            placeholder="Issue"
          />
        </LabeledInput>
      </div>

      <div class="col-span-1">
        <label class="hidden print:block" for="">Meegeleverd</label>
        <p class="hidden print:block prose">{data.repair.included}</p>
      </div>

      <button type="submit" class="btn btn-primary print:hidden">Update</button>
    </form>
  </div>

  <div class="">
    <Barcode
      component={"img"}
      value={data.repair.code}
      text={fullNameFormatter(data.repair.customer)}
    ></Barcode>
    <button class="btn btn-neutral print:hidden" on:click={printImg("#barcode")}
      ><Fa icon={fa.faPrint} /></button
    >
    <div>
      <LabeledInput let:style tr="Voornaam">
        <input
          readonly
          type="text"
          value={data.repair.customer.firstName}
          class={style + " cursor-default"}
        />
      </LabeledInput>
      <LabeledInput let:style tr="Achternaam">
        <input
          readonly
          type="text"
          value={data.repair.customer.lastName}
          class={style + " cursor-default"}
        />
      </LabeledInput>
      <LabeledInput let:style tr="email">
        <input
          readonly
          type="text"
          value={data.repair.customer.email}
          class={style + " cursor-default"}
        />
      </LabeledInput>

      <LabeledInput let:style tr="telefoon">
        <input
          readonly
          type="text"
          value={data.repair.customer.phone}
          class={style + " cursor-default"}
        />
      </LabeledInput>

      <button
        class="btn btn-neutral print:hidden"
        on:click={printPage()}
        title="print full">Print <Fa icon={fa.faPrint} /></button
      >

      <div class="col-span-1">
        <label class="hidden print:block" for="">Probleem</label>
        <p class="hidden print:block prose">{data.repair.issue}</p>
      </div>
    </div>
  </div>
  <div class="hidden print:block"></div>
</div>

<!-- repair Items: -->
<div>
  <form action="" class="form-control" method="post">
    <input type="hidden" name="repairId" value={data.repair.id} />
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Naam</th>
          <th>Prijs</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each data.repair.items as repairItem}
          <tr class="bg-base-200 hover">
            <th>{repairItem.child ? " •   " : ""}{repairItem.name}</th>
            <td>{EURO.format(repairItem.price / 100) ?? ""}</td>
            <td>
              <form action="?/removeitem" method="post">
                <input type="hidden" name="itemId" value={repairItem.id} />
                <button class="btn btn-error print:hidden" title="delete"
                  >-</button
                >
              </form></td
            >
            <!-- Fix delete specific id -->
          </tr>
        {/each}
        <tr class="print:hidden">
          <td
            ><label class="input input-bordered flex items-center gap-2">
              <input type="checkbox" name="child" id="child" /><label
                for="child"
                >child -
              </label>Naam
              <input type="text" class="grow" placeholder="Naam" name="name" />
            </label></td
          >
          <td
            ><label class="input input-bordered flex items-center gap-2">
              Prijs
              <input
                on:input={formatCurrency}
                type="text"
                class="grow"
                placeholder="Prijs"
                name="price"
              />
            </label></td
          >
          <td>
            <button
              class="btn btn-secondary print:hidden"
              formaction="?/additem">+</button
            >
          </td>
        </tr>
        <tr>
          <th><b>Totaal</b></th>
          <td
            >{EURO.format(
              data.repair.items.reduce((c, i) => c + i.price, 0) / 100,
            )}</td
          >
        </tr>
      </tbody>
    </table>
  </form>
</div>

<style>
  /*@media print {
    @page {
      margin: 0;
    }
    body {
      margin: 1.6cm;
    }
  }*/
</style>
