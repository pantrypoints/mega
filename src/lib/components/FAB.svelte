<!-- <script lang="ts">
  import { Bell } from 'lucide-svelte';
  import favicon from '$lib/assets/favicon.svg';

  let { unreadCount = 0, class: className = '' } =
    $props<{ unreadCount: number, user: any, class: string }>();

    export let unreadMessageCount;

    const showBell = $derived(unreadMessageCount > 0);

  const href = "/menu";
</script>


{#if showBell}
    <BellIcon />
{:else}
    <PlusIcon />
{/if}

 -->




<script lang="ts">
  import { Bell } from 'lucide-svelte';
  import favicon from '$lib/assets/favicon.svg';

  let { unreadCount = 0, class: className = '' } = $props<{ unreadCount: number, user: any, class: string }>();

  const isUnread = unreadCount > 0;
  
  const bgColor = isUnread ? 'bg-red-500 hover:bg-red-600' : 'bg-white hover:bg-gray-100';
  const shadow = isUnread ? 'shadow-red-500/50' : 'shadow-lg';
</script>

<a
  href="/menu"
  class="w-16 h-16 rounded-full flex items-center justify-center transition-all {bgColor} {shadow} {className} active:scale-95 border border-gray-100"
>
  {#if isUnread}

    <Bell class="w-7 h-7 text-white animate-pulse" />

    <div class="absolute top-0 right-0 w-6 h-6 bg-yellow-300 rounded-full text-xs font-bold flex items-center justify-center text-gray-800 border-2 border-red-500">
      {unreadCount > 99 ? '99+' : unreadCount}
    </div>
  {:else}

    <img src={favicon} alt="Menu" class="w-7 h-7" />
  {/if}
</a>

<style>
  /* Simple pulse for the Bell icon to draw attention */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  .animate-pulse {
    animation: pulse 1s infinite;
  }
</style>
