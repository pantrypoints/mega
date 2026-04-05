<script lang="ts">
  import type { PageData } from './$types';
  import { CheckCircle, ArrowRight, Home, FileText, User, Users, ArrowUpRight, ArrowDownRight } from 'lucide-svelte';
  import { m } from '$lib/paraglide/messages.js';

  export let data: PageData;
  const { transaction, totalPoints, giver, getter } = data;
  
</script>

<svelte:head>
  <title>Transaction Successful</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 dark:bg-black flex flex-col items-center justify-center p-4 sm:p-8">
  <div class="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-2xl border-t-4 border-teal-500 dark:border-teal-600 text-center">
    
    <!-- Success Icon -->
    <div class="mb-6">
      <div class="inline-flex items-center justify-center w-24 h-24 bg-teal-100 dark:bg-teal-900/50 rounded-full animate-bounce">
        <CheckCircle class="w-16 h-16 text-teal-600 dark:text-teal-400" />
      </div>
    </div>

    <!-- Success Message -->
    <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
      {m.transaction_successful()}
    </h1>
    <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
      {m.transaction_created()}
    </p>

    <!-- Participants Section -->
    <div class="mb-8">
      <div class="flex items-center justify-center space-x-8">

        <!-- Giver -->
        <div class="text-center">
          <div class="mb-3">
            <img 
              src={giver.avatar} 
              alt="Seller"
              class="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-teal-400 dark:border-teal-500"
            />
          </div>
          <div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">{m.giver()}</div>
            <div class="font-bold text-lg text-gray-900 dark:text-white">
              {giver.username}
            </div>
          </div>
        </div>

        <!-- Arrow between participants -->
        <div class="relative">
          <div class="w-12 h-1 bg-gray-300 dark:bg-gray-700"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-2">
            <ArrowRight class="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
        </div>

        <!-- Getter -->
        <div class="text-center">
          <div class="mb-3">
            <img 
              src={getter.avatar} 
              alt="Buyer"
              class="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-teal-400 dark:border-teal-500"
            />
          </div>
          <div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">{m.getter()}</div>
            <div class="font-bold text-lg text-gray-900 dark:text-white">
              {getter.username}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Details Card -->
    <div class="bg-gradient-to-br from-teal-50 to-sky-50 dark:from-teal-950/30 dark:to-sky-950/30 rounded-2xl p-8 mb-8 border-2 border-teal-200 dark:border-teal-800">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{transaction.name}</h2>
        <p class="text-gray-600 dark:text-gray-400">{m.transaction_id()}: #{transaction.id}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-left">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">{m.amount()}</div>
          <div class="font-bold text-lg text-gray-900 dark:text-white">
            {transaction.amount} {transaction.measure}
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">{m.category()}</div>
          <div class="font-bold text-lg text-gray-900 dark:text-white">
            {transaction.category}
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">{m.kind()}</div>
          <div class="font-bold text-lg uppercase text-gray-900 dark:text-white">
            {transaction.kind === 'exchange' ? m.exchange() : m.donation()}
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">{m.status()}</div>
          <div class="font-bold text-lg uppercase text-orange-600 dark:text-orange-400">
            {transaction.status}
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">{m.date_created()}</div>
          <div class="font-bold text-lg text-gray-900 dark:text-white">
            {new Date(transaction.dateCreated).toLocaleDateString()}
          </div>
        </div>
      </div>

      <!-- Total Points Highlight -->
      <div class="bg-gradient-to-r from-teal-500 to-sky-500 dark:from-teal-600 dark:to-sky-600 rounded-2xl p-6 shadow-lg">
        <div class="text-white text-sm font-semibold mb-2">{m.total_points()}</div>
        <div class="text-white text-5xl sm:text-6xl font-extrabold mb-1">
          {totalPoints.toFixed(2)}
        </div>
        <div class="text-teal-50 dark:text-teal-100 text-lg">{m.points()}</div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-3">
      <a
        href="/transactions/{transaction.id}"
        class="inline-flex items-center justify-center gap-2 w-full bg-teal-600 dark:bg-teal-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition duration-200 active:scale-[.99] transform"
      >
        <FileText class="w-5 h-5" />
        {m.view_transaction_details()}
      </a>

      <a
        href="/"
        class="inline-flex items-center justify-center gap-2 w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-4 rounded-2xl font-bold text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
      >
        <Home class="w-5 h-5" />
        {m.go_to_home()}
      </a>
    </div>

    <!-- Info Note -->
    <div class="mt-8 p-4 bg-sky-50 dark:bg-sky-950/50 rounded-xl border border-sky-200 dark:border-sky-800">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {m.transaction_pending_note()} <span class="font-semibold text-orange-600 dark:text-orange-400">{m.pending()}</span>.
        {m.transaction_pending_info()}
      </p>
    </div>
  </div>
</div>