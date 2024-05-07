<script>
  import '../app.css';
  import 'svelte-select/tailwind.css';
  import OnScan from '$lib/components/onScan.svelte';
  import { page } from '$app/stores';
</script>

<OnScan />

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" href="/">Logo</a>
    <div class="pl-8">
      {$page.url.pathname.split('/')[1]?.toUpperCase() || ''}
    </div>
  </div>
  <div class="flex-none print:hidden">
    <ul class="menu menu-horizontal px-1">
      <!-- <li><a href="/batch">Products (WIP)</a></li> -->
      <li><a href="/repair">Reparaties</a></li>
      <li><a href="/customer">Klanten</a></li>
      <li><a href="/cheatsheet">Cheat Sheets</a></li>
    </ul>
  </div>
</div>
<slot />
