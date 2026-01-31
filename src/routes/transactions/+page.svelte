<script lang="ts">
  import type { PageData } from './$types';
  import { ArrowUpDown, ChevronLeft, ChevronRight, User, Calendar, Star, Tag, Package } from 'lucide-svelte';
  
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

<div class="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-4 sm:p-6 lg:p-8">
  <div class="max-w-6xl mx-auto">
    
    <!-- Header -->
    <div class="mb-8 text-center">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
        Transaction History
      </h1>
      <p class="text-lg text-gray-600">
        View and manage all your barter transactions
      </p>
    </div>

    <!-- Main Content Card -->
    <div class="bg-white rounded-3xl shadow-2xl border-t-4 border-sky-500 overflow-hidden">
      
      <!-- Tabs -->
      <div class="border-b border-gray-200 bg-gray-50">
        <div class="flex">
          <button
            on:click={() => activeTab = 'all'}
            class="flex-1 px-6 py-4 text-center font-semibold transition-all duration-200"
            class:bg-white={activeTab === 'all'}
            class:text-teal-600={activeTab === 'all'}
            class:border-b-2={activeTab === 'all'}
            class:border-teal-600={activeTab === 'all'}
            class:text-gray-600={activeTab !== 'all'}
            class:hover:bg-gray-100={activeTab !== 'all'}
          >
            All Transactions
            <span class="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200">
              {transactions.length}
            </span>
          </button>
          
          <button
            on:click={() => activeTab = 'giver'}
            class="flex-1 px-6 py-4 text-center font-semibold transition-all duration-200"
            class:bg-white={activeTab === 'giver'}
            class:text-teal-600={activeTab === 'giver'}
            class:border-b-2={activeTab === 'giver'}
            class:border-teal-600={activeTab === 'giver'}
            class:text-gray-600={activeTab !== 'giver'}
            class:hover:bg-gray-100={activeTab !== 'giver'}
          >
            As Seller
            <span class="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200">
              {transactions.filter(t => t.isGiver).length}
            </span>
          </button>
          
          <button
            on:click={() => activeTab = 'getter'}
            class="flex-1 px-6 py-4 text-center font-semibold transition-all duration-200"
            class:bg-white={activeTab === 'getter'}
            class:text-teal-600={activeTab === 'getter'}
            class:border-b-2={activeTab === 'getter'}
            class:border-teal-600={activeTab === 'getter'}
            class:text-gray-600={activeTab !== 'getter'}
            class:hover:bg-gray-100={activeTab !== 'getter'}
          >
            As Buyer
            <span class="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200">
              {transactions.filter(t => !t.isGiver).length}
            </span>
          </button>
        </div>
      </div>

      <!-- Sort Controls -->
      <div class="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
        <div class="flex flex-wrap gap-2 items-center">
          <span class="text-sm font-semibold text-gray-700 mr-2">Sort by:</span>
          
          <button
            on:click={() => toggleSort('partner')}
            class="inline-flex items-center gap-1 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200"
            class:bg-sky-600={sortBy === 'partner'}
            class:text-white={sortBy === 'partner'}
            class:bg-gray-200={sortBy !== 'partner'}
            class:text-gray-700={sortBy !== 'partner'}
            class:hover:bg-teal-700={sortBy === 'partner'}
            class:hover:bg-gray-300={sortBy !== 'partner'}
          >
            <User class="w-4 h-4" />
            Partner
            {#if sortBy === 'partner'}
              <ArrowUpDown class="w-3 h-3" />
            {/if}
          </button>
          
          <button
            on:click={() => toggleSort('date')}
            class="inline-flex items-center gap-1 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200"
            class:bg-sky-600={sortBy === 'date'}
            class:text-white={sortBy === 'date'}
            class:bg-gray-200={sortBy !== 'date'}
            class:text-gray-700={sortBy !== 'date'}
            class:hover:bg-teal-700={sortBy === 'date'}
            class:hover:bg-gray-300={sortBy !== 'date'}
          >
            <Calendar class="w-4 h-4" />
            Date
            {#if sortBy === 'date'}
              <ArrowUpDown class="w-3 h-3" />
            {/if}
          </button>
          
          <button
            on:click={() => toggleSort('points')}
            class="inline-flex items-center gap-1 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200"
            class:bg-sky-600={sortBy === 'points'}
            class:text-white={sortBy === 'points'}
            class:bg-gray-200={sortBy !== 'points'}
            class:text-gray-700={sortBy !== 'points'}
            class:hover:bg-teal-700={sortBy === 'points'}
            class:hover:bg-gray-300={sortBy !== 'points'}
          >
            <Star class="w-4 h-4" />
            Points
            {#if sortBy === 'points'}
              <ArrowUpDown class="w-3 h-3" />
            {/if}
          </button>
        </div>
      </div>

      <!-- Transaction List -->
      <div class="divide-y divide-gray-200">
        {#if paginatedTransactions.length === 0}
          <div class="p-12 text-center">
            <Package class="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p class="text-xl font-semibold text-gray-500 mb-2">No transactions found</p>
            <p class="text-gray-400">
              {#if activeTab === 'giver'}
                You haven't sold any items yet
              {:else if activeTab === 'getter'}
                You haven't purchased any items yet
              {:else}
                Start making transactions to see them here
              {/if}
            </p>
          </div>
        {:else}
          {#each paginatedTransactions as transaction (transaction.id)}
            <a
              href="/transactions/{transaction.id}"
              class="block p-4 sm:p-6 hover:bg-sky-50 transition-all duration-200 group"
            >
              <div class="flex flex-col sm:flex-row gap-4">
                
                <!-- Details -->
                <div class="flex-1 min-w-0 flex flex-col sm:flex-row gap-4">
                  
                  <!-- Part 1: Avatar, Username & Status -->
                  <div class="flex items-center gap-3 sm:w-1/4">
                    <img
                      src={transaction.partnerAvatar || '/user.svg'}
                      alt={transaction.partnerUsername}
                      class="w-24 h-24 rounded-full object-cover border-2 border-teal-400 flex-shrink-0"
                    />
                    <div class="min-w-0 flex-1">
                      <p class="font-bold text-gray-900 truncate">
                        {transaction.partnerUsername}
                      </p>
                      <p class="text-xs text-gray-500 mb-1">
                        {transaction.isGiver ? 'Receiver' : 'Giver'}
                      </p>
                      <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full border {getStatusColor(transaction.status)}">
                        {transaction.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <!-- Part 2: Transaction Name, Date, Kind, Measure, Amount -->
                  <div class="flex-1 sm:w-1/2">
                    <h3 class="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-2">
                      {transaction.name}
                    </h3>
                    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                      <div class="flex items-center">
                        <Calendar class="w-4 h-4 mr-1 text-teal-600" />
                        <span>{new Date(transaction.dateCreated || '').toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        })}</span>
                      </div>
                      <div class="flex items-center">
                        <Tag class="w-4 h-4 mr-1 text-teal-600" />
                        <span class="font-semibold">{transaction.kind}</span>
                      </div>
                      <div class="flex items-center">
                        <Package class="w-4 h-4 mr-1 text-teal-600" />
                        <span>{transaction.amount} {transaction.measure}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Part 3: Points -->
                  <div class="flex items-center justify-end sm:w-1/4 sm:flex-col sm:items-end sm:justify-center">
                    <div class="flex items-center sm:mb-2">
                      <span class="text-2xl sm:text-3xl font-extrabold text-teal-700">
                        {transaction.points.toFixed(2)}
                      </span>
                    </div>
                    <span class="text-gray-500 text-sm ml-2 sm:ml-0">points</span>
<!--                     {#if transaction.isGiver}
                      <span class="ml-3 sm:ml-0 sm:mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        you are giver
                      </span>
                    {:else}
                      <span class="ml-3 sm:ml-0 sm:mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        you are receiver
                      </span>
                    {/if} -->
                  </div>
                  
                </div>
                
              </div>
            </a>
          {/each}
        {/if}
      </div>

      <!-- Pagination -->
      {#if totalPages > 1}
        <div class="p-6 bg-gray-50 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedTransactions.length)} of {sortedTransactions.length} transactions
            </div>
            
            <div class="flex gap-2">
              <button
                on:click={() => currentPage = Math.max(1, currentPage - 1)}
                disabled={currentPage === 1}
                class="inline-flex items-center px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200"
                class:bg-gray-200={currentPage === 1}
                class:text-gray-400={currentPage === 1}
                class:cursor-not-allowed={currentPage === 1}
                class:bg-teal-600={currentPage !== 1}
                class:text-white={currentPage !== 1}
                class:hover:bg-teal-700={currentPage !== 1}
              >
                <ChevronLeft class="w-4 h-4 mr-1" />
                Previous
              </button>
              
              <div class="flex items-center gap-1">
                {#each Array(totalPages) as _, i}
                  {#if totalPages <= 7 || i === 0 || i === totalPages - 1 || (i >= currentPage - 2 && i <= currentPage)}
                    <button
                      on:click={() => currentPage = i + 1}
                      class="w-10 h-10 rounded-xl font-semibold text-sm transition-all duration-200"
                      class:bg-teal-600={currentPage === i + 1}
                      class:text-white={currentPage === i + 1}
                      class:bg-gray-200={currentPage !== i + 1}
                      class:text-gray-700={currentPage !== i + 1}
                      class:hover:bg-teal-700={currentPage === i + 1}
                      class:hover:bg-gray-300={currentPage !== i + 1}
                    >
                      {i + 1}
                    </button>
                  {:else if i === 1 || i === totalPages - 2}
                    <span class="px-2 text-gray-400">...</span>
                  {/if}
                {/each}
              </div>
              
              <button
                on:click={() => currentPage = Math.min(totalPages, currentPage + 1)}
                disabled={currentPage === totalPages}
                class="inline-flex items-center px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200"
                class:bg-gray-200={currentPage === totalPages}
                class:text-gray-400={currentPage === totalPages}
                class:cursor-not-allowed={currentPage === totalPages}
                class:bg-teal-600={currentPage !== totalPages}
                class:text-white={currentPage !== totalPages}
                class:hover:bg-teal-700={currentPage !== totalPages}
              >
                Next
                <ChevronRight class="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      {/if}

    </div>
  </div>
</div>

