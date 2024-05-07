<script lang="ts">
  export let tl: undefined | string = undefined;
  export let tr: undefined | string = undefined;
  export let bl: undefined | string = undefined;
  export let br: undefined | string = undefined;

  export let bordered: boolean = false;

  let style = `input ${bordered ? 'input-bordered' : ''} w-full max-w-xs`;
</script>

<div class="form-control w-full max-w-xs">
  <label class="label">
    {#if tl}
      <span class="label-text">{tl}</span>
    {/if}
    {#if tr}
      <span class="label-text-alt">{tr}</span>
    {/if}
  </label>

  <slot {style} />

  <label class="label">
    {#if bl}
      <span class="label-text-alt">{bl}</span>
    {/if}
    {#if br}
      <span class="label-text-alt">{br}</span>
    {/if}
  </label>
</div>
