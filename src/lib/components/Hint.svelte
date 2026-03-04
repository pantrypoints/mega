<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { Sparkles } from 'lucide-svelte';
  import * as m from '$lib/paraglide/messages.js';

  let visible = $state(false);

  onMount(() => {
    // Check if user has already dismissed it
    if (localStorage.getItem('hide_menu_balloon') !== 'true') {
      // Small delay so it pops in after the page loads
      setTimeout(() => (visible = true), 800);
    }
  });

  function dismiss() {
    visible = false;
    localStorage.setItem('hide_menu_balloon', 'true');
  }
</script>

{#if visible}
  <div 
    transition:scale={{ start: 0.8, duration: 400 }}
    class="fixed bottom-28 right-6 z-[10001] flex flex-col items-center pointer-events-none">
    <div 
      class="animate-float pointer-events-auto relative flex cursor-pointer items-center gap-3 rounded-2xl border border-white/20 bg-sky-700 px-5 py-3 shadow-2xl"
      onclick={dismiss}
            onkeydown={(e) => e.key === 'Enter' && dismiss()}
            role="button"
            tabindex="0">
      <Sparkles class="h-5 w-5 text-amber-400 shrink-0" />
      <p class="text-[11px] font-black uppercase tracking-widest text-white">
        {m.fab()}
      </p>

      <div class="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-white/10 bg-sky-700"></div>
    </div>
  </div>
{/if}

<style>
  /* Gentle floating animation */
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-12px);
    }
  }

  .animate-float {
    /* 'ease-in-out' makes the transition at the top and bottom of the jump feel soft */
    animation: float 2s ease-in-out infinite;
  }
</style>