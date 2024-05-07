<script context="module" lang="ts">
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';
  const listeners = writable([]);

  export function subscribe(
    func: (scancode: string, event: CustomEvent, iQuantity: any) => void,
    key: number | string | null = null,
  ) {
    listeners.update((n) => {
      const _key = key || Object.keys(n).length;
      n[_key] = func;
      return n;
    });
  }
  export { goto };
</script>

<script lang="ts">
  import onScan from 'onscan.js';
  import { onMount } from 'svelte';

  onMount(() => {
    try {
      onScan.attachTo(document);
      //@ts-ignore
      document.addEventListener(
        'scan',
        function (scanEvent: CustomEvent, iQuantity) {
          for (const [key, event] of Object.entries($listeners)) {
            event(scanEvent.detail.scanCode, scanEvent, iQuantity ?? 1);
          }
        },
      );
    } catch (error) {}
  });
</script>
