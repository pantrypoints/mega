<script lang="ts">
  import type { PageData } from './$types';
  import { Search, ArrowUpDown, User, Heart, Brain, BicepsFlexed, Moon, FlaskConical, Orbit, Sun, HandFist, Flower, Sword } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { m } from '$lib/paraglide/messages.js';

  export let data: PageData;
  
  // Reactive destructuring - ONLY DO THIS ONCE
  $: ({ users = [], search = '', sort = 'dateCreated', direction = 'desc', error = null } = data);
  
  // Map for easy icon rendering
  const iconMap = {
    heart: Heart,
    brain: Brain, 
    body: BicepsFlexed,
    luna: Moon,
    mercury: FlaskConical,
    saturn: Orbit,
    apollo: Sun,
    jupiter: HandFist,
    venus: Flower,
    mars: Sword
  };
  
  const traitConfig = {
    heart:   { icon: Heart,        bg: 'bg-pink-100',   iconCol: 'text-red-500',    label: 'Heart' },
    brain:   { icon: Brain,        bg: 'bg-yellow-100', iconCol: 'text-yellow-600', label: 'Brain' },
    body:    { icon: BicepsFlexed, bg: 'bg-orange-100', iconCol: 'text-orange-700', label: 'Body' },
    luna:    { icon: Moon,         bg: 'bg-indigo-100', iconCol: 'text-indigo-600', label: 'Luna' },
    mercury: { icon: FlaskConical, bg: 'bg-green-100',  iconCol: 'text-green-700',  label: 'Mercury' },
    saturn:  { icon: Orbit,        bg: 'bg-purple-100', iconCol: 'text-purple-700', label: 'Saturn' },
    apollo:  { icon: Sun,          bg: 'bg-amber-100',  iconCol: 'text-amber-500',  label: 'Apollo' },
    jupiter: { icon: HandFist,     bg: 'bg-blue-100',   iconCol: 'text-blue-700',   label: 'Jupiter' },
    venus:   { icon: Flower,       bg: 'bg-rose-100',   iconCol: 'text-rose-500',   label: 'Venus' },
    mars:    { icon: Sword,        bg: 'bg-red-100',    iconCol: 'text-red-700',    label: 'Mars' }
  };
  
  /** Grabs the top 3 and ensures keys match the config above */
  function getTopTraits(user) {
    const traits = [
      { key: 'heart',   val: user.heart || 0 },
      { key: 'brain',   val: user.brain || 0 },
      { key: 'body',    val: user.body || 0 },
      { key: 'luna',    val: user.luna || 0 },
      { key: 'mercury', val: user.mercury || 0 },
      { key: 'saturn',  val: user.saturn || 0 },
      { key: 'apollo',  val: user.apollo || 0 },
      { key: 'jupiter', val: user.jupiter || 0 },
      { key: 'venus',   val: user.venus || 0 },
      { key: 'mars',    val: user.mars || 0 }
    ];
    return traits.sort((a, b) => b.val - a.val).slice(0, 3);
  }
  
  let currentSearch = search;
  
  /** Submits the search query by updating the URL */
  function handleSearch() {
    const params = new URLSearchParams(window.location.search);
    if (currentSearch) {
      params.set('search', currentSearch);
    } else {
      params.delete('search');
    }
    // Preserve sorting parameters
    params.set('sort', sort);
    params.set('direction', direction);
    goto(`/users?${params.toString()}`);
  }
  
  /** Updates the sorting order and direction */
  function handleSort(newSort: string) {
    const params = new URLSearchParams(window.location.search);
    let newDirection = 'asc';
    if (sort === newSort) {
      // If the same column is clicked, toggle direction
      newDirection = direction === 'asc' ? 'desc' : 'asc';
    } else {
      // If a new column is clicked, default to ascending
      newDirection = 'asc';
    }
    params.set('sort', newSort);
    params.set('direction', newDirection);
    // Preserve search term
    if (currentSearch) {
      params.set('search', currentSearch);
    }
    goto(`/users?${params.toString()}`);
  }
  
  /** Helper to render the sort arrow */
  function getSortArrow(key: string) {
    if (sort !== key) return '';
    return direction === 'asc' ? '▲' : '▼';
  }
</script>

<svelte:head>
  <title>Users - Circle App</title>
</svelte:head>


<div class="min-h-screen bg-gray-50 p-4 sm:p-8">
  <div class="w-full max-w-6xl mx-auto space-y-8">
    <!-- Header -->
    <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border-t-4 border-sky-500 mb-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-800">{m.users()}</h1>
          <p class="text-gray-500 mt-1">{m.browse()}</p>
        </div>
      </div>
      
      <!-- Search and Filter Bar -->
      <form on:submit|preventDefault={handleSearch} class="flex flex-col sm:flex-row gap-4">
        <!-- Search Input -->
        <div class="relative flex-grow">
          <input 
            type="search" 
            bind:value={currentSearch} 
            placeholder="{m.search_username()}" 
            class="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          />
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <!-- Search Button -->
        <button 
          type="submit" 
          class="sm:w-auto px-6 py-3 bg-sky-600 text-white rounded-xl font-semibold shadow-md hover:bg-sky-700 transition">
          {m.search()}
        </button>
      </form>
      

      <!-- Sort Controls -->
      <div class="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 pt-4 border-t border-gray-100">
        <span class="font-semibold self-center">{m.sort_by()}:</span>
        {#each ['dateCreated', 'username'] as key}
          <button 
            on:click={() => handleSort(key)}
            class="px-3 py-1.5 rounded-full transition duration-150 flex items-center gap-1"
            class:bg-teal-100={sort === key}
            class:text-teal-700={sort === key}
            class:bg-gray-100={sort !== key}
            class:hover:bg-teal-200={sort !== key}>
            {key === 'dateCreated' ? 'Newest' : 'Username'}
            <ArrowUpDown class="w-3 h-3" />
            <span class="ml-1">{getSortArrow(key)}</span>
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Error Display -->
    {#if error}
      <div class="bg-red-100 text-red-700 p-4 rounded-xl font-medium">
        {error}
      </div>
    {/if}
    
    <!-- User Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#if users.length === 0}
        <div class="col-span-full text-center py-10">
          <p class="text-gray-500">{m.nothing_found()}</p>
        </div>
      {:else}
        {#each users as user}
          <a href="/users/{user.slug}">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div class="h-48 overflow-hidden bg-gradient-to-br from-teal-100 to-sky-100 flex items-center justify-center">
                {#if user.avatar}
                  <img 
                    src={user.avatar} 
                    alt={user.username} 
                    class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" 
                  />
                {:else}
                  <div class="w-32 h-32 rounded-full bg-sky-500 flex items-center justify-center border-4 border-white shadow-lg">
                    <User class="w-16 h-16 text-white" />
                  </div>
                {/if}
              </div>
              
              <div class="p-6 space-y-3">
                <h3 class="text-xl font-bold text-gray-900 truncate">{user.username}</h3>
                
                <div class="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  {#each getTopTraits(user) as trait}
                    <div class="flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-700 rounded-full border border-gray-100">
                      <svelte:component this={iconMap[trait.key]} class="w-3 h-3" />
                      <span class="text-[10px] font-bold uppercase">{trait.key}</span>
                      <span class="text-[10px] opacity-70">{trait.val.toFixed(0)}</span>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </a>
        {/each}
      {/if}
    </div>
  </div>
</div>

