<script lang='ts'>
  import favicon from '$lib/assets/favicon.svg';
  import { enhance } from '$app/forms';
  import type { PageServerData } from './$types';
  import { HandHelping, HandCoins, ListChecks, Bell, MessageCircle, LogOut, ScrollText, ChartNoAxesCombined, CircleQuestionMark, Megaphone, Shirt, Utensils, Users, User, Tally5 } from 'lucide-svelte';
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
</script>

<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
  <div class="w-full max-w-lg bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 transform transition duration-500 hover:shadow-3xl">
    
    <!-- User Info and Logout -->
    <div class="text-center mb-4">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-1">
        {m.welcome()}
        <span class="text-sky-600">{data.user.username}</span>!
      </h1>
    </div>
    
    <!-- Centered SVG Icon -->
    <div class="flex justify-center mb-6">
      <img src={favicon} alt="Menu" class="" />
    </div>
    
    <Lang />
    
    <!-- Menu Grid: Optimized for mobile (2 columns default, 3 on medium screens) -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
      
      <!-- 1. Posts Card -->
      <a href="/posts" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
        <div class="p-2 mb-1">
          <Megaphone class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.posts()}
        </div>
      </a>
      
      <!-- 2. Products Card -->
      <a href="/products" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
        <div class="p-2 mb-1">
          <Shirt class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.products()}
        </div>
      </a>
      
      <!-- 3. Services Card -->
      <a href="/services" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
        <div class="p-2 mb-1">
          <Utensils class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.services()}
        </div>
      </a>


      <a href="/wishes" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
        <div class="p-2 mb-1">
          <HandCoins class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.services()}
        </div>
      </a>

      <a href="/requests" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
        <div class="p-2 mb-1">
          <HandHelping class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.services()}
        </div>
      </a>


      <!-- 4. Points Card (Tally5) -->
      <a href="/points" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
        <div class="p-2 mb-1">
          <Tally5 class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.points()}
        </div>
      </a>
      
      <!-- 5. Scroll Card -->
      <a href="/transactions" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
        <div class="p-2 mb-1">
          <ScrollText class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.tx()}
        </div>
      </a>
      
      <!-- 6. Chat Card (MessageCircle) -->
      <a href="/chat" class="relative bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center"
        class:bg-red-50={hasUnread}
        class:border-red-400={hasUnread}
      >
        <!-- Conditional Animated Bell -->
        {#if hasUnread}
          <div class="absolute top-2 right-2 p-1 bg-red-500 rounded-full animate-ping-once">
            <Bell class="w-5 h-5 text-yellow-300" />
          </div>
          <div class="p-2 mb-1">
            <Bell class="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
          </div>
          <div class="text-xs font-bold text-red-600 mb-1">
            ({unreadCount}) New Message
          </div>
        {:else}
          <div class="p-2 mb-1">
            <MessageCircle class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
          </div>
        {/if}
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap mt-1">
          Chat
        </div>
      </a>
      
      <!-- 7. Users Card (Shops) -->
      <a href="/users" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
        <div class="p-2 mb-1">
          <Users class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.users()}
        </div>
      </a>
      
      <!-- 8. Profile Card -->
      {#if slug}
        <a href="/users/{slug}" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
          <div class="p-2 mb-1">
            <User class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
          </div>
          <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
            {m.profile()}
        </div>
        </a>
      {/if}
      
      <!-- 9. Quiz Card -->
      <a href="/quiz" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
        <div class="p-2 mb-1">
          <ListChecks class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.personality_quiz()}
        </div>
      </a>
      
      <!-- 10. Stats Card -->
      <a href="/stats" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
        <div class="p-2 mb-1">
          <ChartNoAxesCombined class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.stats()}
        </div>
      </a>
      
      <!-- 11. How To Use Card -->
      <a href="/how" class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center">
        <div class="p-2 mb-1">
          <CircleQuestionMark class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
          {m.how()}
        </div>
      </a>
      
      <!-- 12. Logout Button (Form) - Still needs to be a form/button -->
      <form method='post' action='?/logout' use:enhance class="contents">
        <button class="bg-red-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center w-full">
          <div class="p-2 mb-1">
            <LogOut class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
          </div>
          <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
            {m.sign_out()}
          </div>
        </button>
      </form>
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