<script lang="ts">
  import type { PageData } from './$types';
  import { ArrowUpDown, ChevronLeft, ChevronRight, User, Calendar, Star, Tag, Package } from 'lucide-svelte';
  import { m } from '$lib/paraglide/messages.js';

  export let data: PageData;
  
  const { transactions, currentUserId } = data;
  
  // Tab state
  let activeTab: 'all' | 'giver' | 'getter' = 'all';
  
  // Sorting state
  let sortBy: 'partner' | 'date' | 'points' = 'date';
  let sortOrder: 'asc' | 'desc' = 'desc';
  
  // Pagination state
  let currentPage = 1;
  const itemsPerPage = 10;
  
  // Filter transactions by tab
  $: filteredTransactions = transactions.filter(t => {
    if (activeTab === 'giver') return t.isGiver;
    if (activeTab === 'getter') return !t.isGiver;
    return true; // 'all'
  });
  
  // Sort transactions
  $: sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'partner') {
      comparison = a.partnerUsername.localeCompare(b.partnerUsername);
    } else if (sortBy === 'date') {
      const dateA = new Date(a.dateCreated || 0).getTime();
      const dateB = new Date(b.dateCreated || 0).getTime();
      comparison = dateA - dateB;
    } else if (sortBy === 'points') {
      comparison = a.points - b.points;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  // Paginate transactions
  $: totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  $: paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Reset to page 1 when tab or sort changes
  $: if (activeTab || sortBy || sortOrder) {
    currentPage = 1;
  }
  
  function toggleSort(field: 'partner' | 'date' | 'points') {
    if (sortBy === field) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = field;
      sortOrder = 'desc';
    }
  }
  
  function getStatusColor(status: string) {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-300';
      case 'transferred': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  }
</script>


<svelte:head>
  <title>Transaction History - Circle App</title>
</svelte:head>


<div class="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 dark:from-slate-950 dark:to-slate-900 p-4 sm:p-6 lg:p-8 transition-colors">
  <div class="max-w-6xl mx-auto">
    
    <div class="mb-8 text-center">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
        {m.tx_history()}
      </h1>
      <p class="text-lg text-gray-600 dark:text-slate-400">
        {m.tx_manage()}
      </p>
    </div>

    <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-t-4 border-sky-500 overflow-hidden transition-colors">
      
      <div class="border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50">
        <div class="flex">
          {#each ['all', 'giver', 'getter'] as tabType}
            <button
              on:click={() => activeTab = tabType}
              class="flex-1 px-6 py-4 text-center font-semibold transition-all duration-200"
              class:bg-white={activeTab === tabType}
              class:dark:bg-slate-900={activeTab === tabType}
              class:text-sky-600={activeTab === tabType}
              class:dark:text-sky-400={activeTab === tabType}
              class:border-b-2={activeTab === tabType}
              class:border-sky-600={activeTab === tabType}
              class:text-gray-600={activeTab !== tabType}
              class:dark:text-slate-400={activeTab !== tabType}
              class:hover:bg-gray-100={activeTab !== tabType}
              class:dark:hover:bg-slate-800={activeTab !== tabType}>
              {tabType === 'all' ? m.tx_all() : tabType === 'giver' ? m.as_seller() : m.as_buyer()}
              <span class="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-slate-700 dark:text-slate-300">
                {#if tabType === 'all'}{transactions.length}
                {:else if tabType === 'giver'}{transactions.filter(t => t.isGiver).length}
                {:else}{transactions.filter(t => !t.isGiver).length}{/if}
              </span>
            </button>
          {/each}
        </div>
      </div>

      <div class="p-4 sm:p-6 bg-gray-50 dark:bg-slate-800/30 border-b border-gray-200 dark:border-slate-800">
        <div class="flex flex-wrap gap-2 items-center">
          <span class="text-sm font-semibold text-gray-700 dark:text-slate-300 mr-2">Sort by:</span>
          
          {#each ['partner', 'date', 'points'] as sortType}
            <button
              on:click={() => toggleSort(sortType)}
              class="inline-flex items-center gap-1 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200"
              class:bg-sky-600={sortBy === sortType}
              class:text-white={sortBy === sortType}
              class:bg-gray-200={sortBy !== sortType}
              class:dark:bg-slate-800={sortBy !== sortType}
              class:text-gray-700={sortBy !== sortType}
              class:dark:text-slate-300={sortBy !== sortType}
              class:hover:bg-sky-700={sortBy === sortType}
              class:hover:bg-gray-300={sortBy !== sortType}
              class:dark:hover:bg-slate-700={sortBy !== sortType}>
              {#if sortType === 'partner'}<User class="w-4 h-4" />{/if}
              {#if sortType === 'date'}<Calendar class="w-4 h-4" />{/if}
              {#if sortType === 'points'}<Star class="w-4 h-4" />{/if}
              {m[sortType] ? m[sortType]() : sortType}
              {#if sortBy === sortType}<ArrowUpDown class="w-3 h-3" />{/if}
            </button>
          {/each}
        </div>
      </div>

      <div class="divide-y divide-gray-200 dark:divide-slate-800">
        {#if paginatedTransactions.length === 0}
          <div class="p-12 text-center">
            <Package class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-slate-700" />
            <p class="text-xl font-semibold text-gray-500 dark:text-slate-400 mb-2">{m.nothing()}</p>
          </div>
        {:else}
          {#each paginatedTransactions as transaction (transaction.id)}
            <a href="/transactions/{transaction.id}"
              class="block p-4 sm:p-6 hover:bg-sky-50 dark:hover:bg-sky-950/20 transition-all duration-200 group">
              <div class="flex flex-col sm:flex-row gap-4">
                
                <div class="flex-1 min-w-0 flex flex-col sm:flex-row gap-4">
                  
                  <div class="flex items-center gap-3 sm:w-1/4">
                    <img
                      src={transaction.partnerAvatar || '/user.svg'}
                      alt={transaction.partnerUsername}
                      class="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-teal-400 dark:border-teal-500 flex-shrink-0"
                    />
                    <div class="min-w-0 flex-1">
                      <p class="font-bold text-gray-900 dark:text-white truncate">
                        {transaction.partnerUsername}
                      </p>
                      <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">
                        {transaction.isGiver ? 'Receiver' : 'Giver'}
                      </p>
                      <span class="inline-block px-2 py-1 text-[10px] font-bold rounded-full border dark:bg-slate-800 {getStatusColor(transaction.status)}">
                        {transaction.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div class="flex-1 sm:w-1/2">
                    <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mb-2">
                      {transaction.name}
                    </h3>
                    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-slate-400">
                      <div class="flex items-center">
                        <Calendar class="w-4 h-4 mr-1 text-teal-600 dark:text-teal-400" />
                        <span>{new Date(transaction.dateCreated).toLocaleDateString()}</span>
                      </div>
                      <div class="flex items-center">
                        <Tag class="w-4 h-4 mr-1 text-teal-600 dark:text-teal-400" />
                        <span class="font-semibold">{transaction.kind}</span>
                      </div>
                      <div class="flex items-center">
                        <Package class="w-4 h-4 mr-1 text-teal-600 dark:text-teal-400" />
                        <span>{transaction.amount} {transaction.measure}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-end sm:w-1/4 sm:flex-col sm:items-end sm:justify-center">
                    <div class="flex items-center">
                      <span class="text-2xl sm:text-3xl font-extrabold text-teal-700 dark:text-teal-400">
                        {transaction.points.toFixed(2)}
                      </span>
                    </div>
                    <span class="text-gray-500 dark:text-slate-500 text-sm ml-2 sm:ml-0">points</span>
                  </div>
                </div>
              </div>
            </a>
          {/each}
        {/if}
      </div>

      {#if totalPages > 1}
        <div class="p-6 bg-gray-50 dark:bg-slate-800/30 border-t border-gray-200 dark:border-slate-800">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600 dark:text-slate-400 hidden sm:block">
              Showing {sortedTransactions.length} transactions
            </div>
            
            <div class="flex gap-2 mx-auto sm:mx-0">
              <button
                on:click={() => currentPage = Math.max(1, currentPage - 1)}
                disabled={currentPage === 1}
                class="inline-flex items-center px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200"
                class:bg-gray-200={currentPage === 1}
                class:dark:bg-slate-800={currentPage === 1}
                class:text-gray-400={currentPage === 1}
                class:bg-teal-600={currentPage !== 1}
                class:text-white={currentPage !== 1}>
                <ChevronLeft class="w-4 h-4 mr-1" />
              </button>
              
              <button
                on:click={() => currentPage = Math.min(totalPages, currentPage + 1)}
                disabled={currentPage === totalPages}
                class="inline-flex items-center px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200"
                class:bg-gray-200={currentPage === totalPages}
                class:dark:bg-slate-800={currentPage === totalPages}
                class:text-gray-400={currentPage === totalPages}
                class:bg-teal-600={currentPage !== totalPages}
                class:text-white={currentPage !== totalPages}>
                <ChevronRight class="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      {/if}

    </div>
  </div>
</div>