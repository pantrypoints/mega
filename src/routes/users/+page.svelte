<script lang="ts">
  import type { PageData } from './$types';
  import { Search, ArrowUpDown, User } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  export let data: PageData;

  $: ({ users = [], search = '', sort = 'dateCreated', direction = 'desc', error = null } = data);

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
    <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border-t-4 border-teal-500 mb-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-800">Users</h1>
          <p class="text-gray-500 mt-1">Browse community members</p>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <form on:submit|preventDefault={handleSearch} class="flex flex-col sm:flex-row gap-4">
        <!-- Search Input -->
        <div class="relative flex-grow">
          <input
            type="search"
            bind:value={currentSearch}
            placeholder="Search by username..."
            class="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
          />
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <!-- Search Button -->
        <button
          type="submit"
          class="sm:w-auto px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold shadow-md hover:bg-teal-700 transition"
        >
          Search
        </button>
      </form>

      <!-- Sort Controls -->
      <div class="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 pt-4 border-t border-gray-100">
        <span class="font-semibold self-center">Sort by:</span>
        {#each ['dateCreated', 'username'] as key}
          <button
            on:click={() => handleSort(key)}
            class="px-3 py-1.5 rounded-full transition duration-150 flex items-center gap-1"
            class:bg-teal-100={sort === key}
            class:text-teal-700={sort === key}
            class:bg-gray-100={sort !== key}
            class:hover:bg-teal-200={sort !== key}
          >
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

    <!-- User List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#if users.length === 0}
        <p class="text-gray-500 text-center col-span-full py-10">
          No users found matching your criteria. Try adjusting your search!
        </p>
      {:else}
        {#each users as user (user.id)}
          <a href="/users/{user.id}">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
              <!-- User Avatar -->
              <div class="h-48 overflow-hidden bg-gradient-to-br from-teal-100 to-sky-100 flex items-center justify-center">
                {#if user.avatar}
                  <img
                    src={user.avatar}
                    alt={user.username}
                    class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                {:else}
                  <div class="w-32 h-32 rounded-full bg-teal-500 flex items-center justify-center border-4 border-white shadow-lg">
                    <User class="w-16 h-16 text-white" />
                  </div>
                {/if}
              </div>

              <!-- User Info -->
              <div class="p-6 space-y-3">
                <h3 class="text-xl font-bold text-gray-900 truncate">{user.username}</h3>
                <p class="text-sm text-teal-600 font-medium">@{user.codename}</p>
                
                {#if user.location}
                  <p class="text-sm text-gray-500">{user.location}</p>
                {/if}

                <!-- Attribute Points Preview -->
                <div class="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 bg-pink-50 text-pink-600 rounded-full font-medium">
                      ❤️ {user.heart?.toFixed(0) || 0}
                    </span>
                    <span class="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full font-medium">
                      🧠 {user.brain?.toFixed(0) || 0}
                    </span>
                    <span class="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded-full font-medium">
                      💪 {user.body?.toFixed(0) || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        {/each}
      {/if}
    </div>
  </div>
</div>