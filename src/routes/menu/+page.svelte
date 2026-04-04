<script lang='ts'>
  import { PiggyBank, Sun, Moon, HandHelping, HandCoins, ListChecks, Bell, MessageCircle, LogOut, ScrollText, ChartNoAxesCombined, CircleQuestionMark, Megaphone, Shirt, Utensils, Users, User, Tally5 } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import favicon from '$lib/assets/favicon.svg';
  import { enhance } from '$app/forms';
  import type { PageServerData } from './$types';

  import Lang from '$lib/components/Lang.svelte';
  import { m } from '$lib/paraglide/messages.js';
  
  // The `data` prop now includes `unreadMessageCount` from the layout load function
  let { data }: { data: PageServerData } = $props();
  
  // Access user data and ensure slug exists
  const user = data?.user;
  const userId = user?.id;
  const slug = user?.slug || user?.id; // Fallback to ID if no slug

  console.log('slug is' + slug);
    
  // Access unread message count from merged layout/page data
  const unreadCount = data.unreadMessageCount ?? 0;
  const hasUnread = unreadCount > 0;


  // let { data }: { data: any } = $props();
  // const user = data?.user;
  // const slug = user?.slug || user?.id;


  // 1. Start with undefined to avoid SSR mismatch
  let theme = $state<'light' | 'dark' | undefined>(undefined);
  
  // 2. Compute isDark based on the theme string
  let isDark = $derived(theme === 'dark');

  onMount(() => {
    theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    // Check storage or system preference
    // const saved = localStorage.getItem('theme');
    // const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Set initial state
    // theme = (saved as 'light' | 'dark') || (system ? 'dark' : 'light');
  });


  // 3. Sync theme to DOM whenever the 'theme' state changes
  $effect(() => {
    if (!theme) return; // Wait until onMount sets the theme

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });


  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

</script>





<div class="min-h-screen bg-sky-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors">
  <div class="w-full max-w-lg bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 relative transition-colors">
    
    <div class="absolute top-4 right-4">
      <button onclick={toggleTheme} class="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 transition-colors">
        {#if theme === 'dark'}
          <Sun class="text-amber-400" />
        {:else}
          <Moon class="text-slate-600" />
        {/if}
      </button>
    </div>


    <div class="text-center mb-4">
      <h1 class="text-3xl font-extrabold text-gray-800 dark:text-white mb-1">
        {m.welcome()}!
      </h1>
    </div>

    <div class="flex justify-center mb-6 dark:brightness-110">
      <img src={favicon} alt="Menu" class="w-16 h-16" />
    </div>
    
    <Lang />
    
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
      <!-- Products -->
      <a href="/products" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
        <div class="p-2 mb-1">
          <Shirt class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
        </div>
        <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.products()}
        </div>
      </a>
      
      <!-- Services -->
      <a href="/services" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
        <div class="p-2 mb-1">
          <Utensils class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
        </div>
        <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.services()}
        </div>
      </a>

      <!-- Wishes -->
      <a href="/wishes" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
        <div class="p-2 mb-1">
          <HandCoins class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
        </div>
        <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.wishes()}
        </div>
      </a>

      <!-- Requests -->
      <a href="/requests" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
        <div class="p-2 mb-1">
          <HandHelping class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
        </div>
        <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.requests()}
        </div>
      </a>

      <!-- User-specific cards -->
      {#if user}
        <!-- Posts -->
        <a href="/posts" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
          <div class="p-2 mb-1">
            <Megaphone class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
          </div>
          <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
            {m.posts()}
          </div>
        </a>

        <!-- Points -->
        <a href="/points" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
          <div class="p-2 mb-1">
            <Tally5 class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
          </div>
          <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
            {m.points()}
          </div>
        </a>

        <!-- Transactions -->
        <a href="/transactions" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
          <div class="p-2 mb-1">
            <ScrollText class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
          </div>
          <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
            {m.tx()}
          </div>
        </a>
        
        <!-- Chat -->
        <a href="/chat" class="relative bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
          {#if hasUnread}
            <div class="absolute top-2 right-2 p-1 bg-red-500 rounded-full animate-ping-once">
              <Bell class="w-5 h-5 text-yellow-300" />
            </div>
            <div class="p-2 mb-1">
              <Bell class="w-10 h-10 sm:w-12 sm:h-12 text-red-600 dark:text-red-400" />
            </div>
            <div class="text-xs font-bold text-red-600 dark:text-red-400 mb-1">
              ({unreadCount}) New Message
            </div>
          {:else}
            <div class="p-2 mb-1">
              <MessageCircle class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
            </div>
          {/if}
          <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap mt-1">
            Chat
          </div>
        </a>
        
        <!-- Users -->
        <a href="/users" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
          <div class="p-2 mb-1">
            <Users class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
          </div>
          <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
            {m.users()}
          </div>
        </a>
        
        <!-- Profile -->
        {#if slug}
          <a href="/users/{slug}" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
            <div class="p-2 mb-1">
              <User class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
            </div>
            <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
              {m.profile()}
            </div>
          </a>
        {/if}
        
        <!-- Quiz -->
        <a href="/quiz" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
          <div class="p-2 mb-1">
            <ListChecks class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
          </div>
          <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
            {m.personality_quiz()}
          </div>
        </a>
      {/if}
      
      <!-- Stats (always visible) -->
      <a href="/stats" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
        <div class="p-2 mb-1">
          <ChartNoAxesCombined class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
        </div>
        <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.stats()}
        </div>
      </a>

      <a href="/banker" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
        <div class="p-2 mb-1">
          <PiggyBank class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
        </div>
        <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.banker()}
        </div>
      </a>      
      
      <!-- How To Use 
      <a href="/how" class="bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center group">
        <div class="p-2 mb-1">
          <CircleQuestionMark class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
        </div>
        <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.how()}
        </div>
      </a>-->
    
      {#if user}   
        <!-- Logout Button -->
        <form method='post' action='?/logout' use:enhance class="contents">
          <button class="bg-red-50 dark:bg-red-900/30 border border-sky-200 dark:border-slate-700 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center w-full group">
            <div class="p-2 mb-1">
              <LogOut class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
            </div>
            <div class="text-gray-800 dark:text-slate-200 font-semibold text-xs sm:text-sm whitespace-nowrap">
              {m.sign_out()}
            </div>
          </button>
        </form>
      {:else}
        <a href="/login" class="bg-teal-500 dark:bg-teal-600 text-white p-3 rounded-2xl text-center flex flex-col items-center justify-center col-span-2 md:col-span-1 hover:bg-teal-600 dark:hover:bg-teal-700 transition-colors">
          <User class="w-10 h-10 mb-1" />
          <div class="font-bold">{m.sign_in()}</div>
        </a>  
      {/if}
    </div>
  </div>
</div>


<style>
  /* Custom animation for a single "pop" on the menu item */
  @keyframes ping-once {
    0% { transform: scale(0.2); opacity: 0; }
    50% { transform: scale(1.5); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
  
  /* Use a custom class since Tailwind's `animate-ping` runs infinitely */
  .animate-ping-once {
    animation: ping-once 1.5s ease-out;
  }
</style>  
