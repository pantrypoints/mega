<script lang="ts">
  import type { PageData } from './$types';
  import { CheckCircle, ArrowRight, Home, FileText, User, Users, ArrowUpRight, ArrowDownRight } from 'lucide-svelte';
  
  export let data: PageData;
  const { transaction, totalPoints, giver, getter } = data;
  
</script>

<svelte:head>
  <title>Transaction Successful</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 sm:p-8">
  <div class="w-full max-w-2xl bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border-t-4 border-teal-500 text-center">
    <!-- Success Icon -->
    <div class="mb-6">
      <div class="inline-flex items-center justify-center w-24 h-24 bg-teal-100 rounded-full animate-bounce">
        <CheckCircle class="w-16 h-16 text-teal-600" />
      </div>
    </div>

    <!-- Success Message -->
    <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
      Transaction Successful!
    </h1>
    <p class="text-xl text-gray-600 mb-8">
      The barter transaction has been created
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
              class="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-teal-400"
            />
          </div>
          <div>
            <div class="text-sm text-gray-500 mb-1">Giver</div>
            <div class="font-bold text-lg text-gray-900">
                {giver.username}
            </div>
          </div>
        </div>

        <!-- Arrow between participants -->
        <div class="relative">
          <div class="w-12 h-1 bg-gray-300"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2">
            <ArrowRight class="w-6 h-6 text-teal-600" />
          </div>
        </div>

        <!-- Getter -->
        <div class="text-center">
          <div class="mb-3">
            <img 
              src={getter.avatar} 
              alt="Seller"
              class="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-teal-400"
            />
          </div>
          <div>
            <div class="text-sm text-gray-500 mb-1">Giver</div>
            <div class="font-bold text-lg text-gray-900">
                {getter.username}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Details Card -->
    <div class="bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl p-8 mb-8 border-2 border-teal-200">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{transaction.name}</h2>
        <p class="text-gray-600">Transaction ID: #{transaction.id}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-left">
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-sm text-gray-500 mb-1">Amount</div>
          <div class="font-bold text-lg text-gray-900">
            {transaction.amount} {transaction.measure}
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-sm text-gray-500 mb-1">Category</div>
          <div class="font-bold text-lg text-gray-900">
            {transaction.category}
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-sm text-gray-500 mb-1">Kind</div>
          <div class="font-bold text-lg uppercase">
            {transaction.kind}
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-sm text-gray-500 mb-1">Status</div>
          <div class="font-bold text-lg uppercase">
            {transaction.status}
          </div>
        </div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-sm text-gray-500 mb-1">Date Created</div>
          <div class="font-bold text-lg text-gray-900">
            {new Date(transaction.dateCreated).toLocaleDateString()}
          </div>
        </div>
      </div>

      <!-- Total Points Highlight -->
      <div class="bg-gradient-to-r from-teal-500 to-sky-500 rounded-2xl p-6 shadow-lg">
        <div class="text-white text-sm font-semibold mb-2">TOTAL POINTS</div>
        <div class="text-white text-5xl sm:text-6xl font-extrabold mb-1">
          {totalPoints.toFixed(2)}
        </div>
        <div class="text-teal-50 text-lg">points</div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-3">
      <a
        href="/transactions/{transaction.id}"
        class="inline-flex items-center justify-center gap-2 w-full bg-teal-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-teal-700 transition duration-200 active:scale-[.99] transform"
      >
        <FileText class="w-5 h-5" />
        View Transaction Details
      </a>

      <a
        href="/"
        class="inline-flex items-center justify-center gap-2 w-full bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold text-lg hover:bg-gray-300 transition duration-200"
      >
        <Home class="w-5 h-5" />
        Go to Home
      </a>
    </div>

    <!-- Info Note -->
    <div class="mt-8 p-4 bg-sky-50 rounded-xl border border-sky-200">
      <p class="text-sm text-gray-600">
        This transaction is currently <span class="font-semibold text-orange-600">pending</span>.
        Both parties can view and manage this transaction in their transaction history.
      </p>
    </div>
  </div>
</div>