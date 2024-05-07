<script>
  import Fa from 'svelte-fa';
  import * as fa from '@fortawesome/free-solid-svg-icons';
  import { navigateToPage, navigateToPageMod } from '$lib/clientPagination';

  export let pagination
</script>

<div class="grid content-center columns-3">
  <div class="join">
    <button
      on:click={navigateToPage(1)}
      class="join-item btn {pagination.page == 1 ? 'btn-disabled' : ''}"
      ><Fa icon={fa.faBackwardFast} /></button
    >

    <button
      on:click={navigateToPageMod(-1)}
      class="join-item btn {pagination.page == 1 ? 'btn-disabled' : ''}"
      ><Fa icon={fa.faBackwardStep} /></button
    >

    <button class="join-item btn btn-disabled"
      >{pagination.page}/{pagination.maxPages}</button
    >

    <button
      on:click={navigateToPageMod(1)}
      class="join-item btn {pagination.page + 1 > pagination.maxPages
        ? 'btn-disabled'
        : ''}"><Fa icon={fa.faForwardStep} /></button
    >

    <button
      on:click={navigateToPage(pagination.maxPages)}
      class="join-item btn {pagination.page == pagination.maxPages
        ? 'btn-disabled'
        : ''}"><Fa icon={fa.faForwardFast} /></button
    >
  </div>
</div>
