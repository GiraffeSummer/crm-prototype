<script>
  import LabeledInput from '$lib/components/LabeledInput.svelte';
</script>

<LabeledInput let:style tr="Voornaam" bordered={true}>
  <input type="text" name="firstName" class={style + ' cursor-default'} />
</LabeledInput>
<LabeledInput let:style tr="Achternaam" bordered={true}>
  <input type="text" name="lastName" class={style + ' cursor-default'} />
</LabeledInput>
<div class="grid gap-2 grid-flow-col p-1">
  <LabeledInput let:style tr="Email" bordered={true}>
    <input name="email" type="text" class={style} />
  </LabeledInput>
</div>
<LabeledInput let:style tr="Telefoon" bordered={true}>
  <input name="phone" type="text" class={style} />
</LabeledInput>

<LabeledInput let:style tr="Details">
  <textarea
    name="details"
    class="textarea textarea-bordered"
    placeholder="Details"
  />
</LabeledInput>