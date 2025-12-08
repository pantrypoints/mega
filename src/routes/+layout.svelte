<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import FAB from '$lib/components/FAB.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { invalidate, invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';

  let { data, children } = $props();

  // 💡 The unreadMessageCount is now guaranteed to be in the data thanks to +layout.server.ts
  const unreadCount = data.unreadMessageCount ?? 0;

  // IMPLEMENT 10-SECOND POLLING
  let interval: ReturnType<typeof setInterval>;

  onMount(() => {
    interval = setInterval(() => {
      // Invalidate all load functions to re-fetch unreadMessageCount from the server
      // invalidateAll();
      invalidate(() => true);      // <--- CRITICAL FIX
    }, 8000); // 8 seconds
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
    // clearInterval(interval);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} sizes="any" type="image/svg+xml">
</svelte:head>

<!-- Page content -->
<div class="min-h-screen relative">
  {@render children()}
</div>


<FAB unreadCount={unreadCount} user={data.user} class="fixed bottom-6 right-6 z-[9999]" />
