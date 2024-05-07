<script lang="ts">
  import { base } from '$app/paths';
  import { goto, afterNavigate } from '$app/navigation';
  import Fa from 'svelte-fa';
  import * as fa from '@fortawesome/free-solid-svg-icons';

  let previousPage: string = base;
  export let route = null;

  afterNavigate(({ from }) => {
    previousPage = from?.url.pathname + from?.url.search || previousPage;
  });
</script>

<div>
  <button
    type="button"
    class="btn w-9"
    on:click={() => {
      console.log(route ?? previousPage)
      goto(route ?? previousPage);
    }}
    ><Fa icon={fa.faBackwardStep} />
  </button>
</div>
