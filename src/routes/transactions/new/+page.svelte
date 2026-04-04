<script lang="ts">
  import type { PageData } from './$types';
  import { Handshake, ArrowLeft, User, Lock, Package, Star } from 'lucide-svelte';
  import { enhance } from '$app/forms';
  
  export let data: PageData;
  export let form;
  
  const { product, giver } = data;
  
  // Preserve form values on error
  let codename = form?.codename || '';
  let pin = '';
  let amount = form?.amount ? parseFloat(form.amount) : 1;
  let selectedKind: string = '';

  $: totalPoints = product.points * amount;
</script>

<svelte:head>
  <title>New Transaction - {product.name}</title>
</svelte:head>






<div class="min-h-screen bg-sky-50 dark:bg-slate-950 flex flex-col items-center p-4 sm:p-8 transition-colors">
  <div class="w-full max-w-4xl bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 dark:border-teal-600 transition-colors">
    
    <a 
      href="/products/{product.id}" 
      class="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition mb-6 font-medium"
    >
      <ArrowLeft class="w-4 h-4 mr-1" />
      Back to Product
    </a>

    <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
      New Barter Transaction
    </h1>
    
    <p class="text-xl text-gray-600 dark:text-slate-400 mb-8">
      Enter buyer details to proceed
    </p>

    <!-- Product Summary -->
    <div class="bg-teal-50 dark:bg-teal-950/30 rounded-2xl p-6 mb-8 border-l-4 border-teal-400 dark:border-teal-600 transition-colors">
      <div class="flex items-start gap-4">
        {#if product.photo}
          <img 
            src={product.photo} 
            alt={product.name}
            class="w-24 h-24 rounded-xl object-cover shadow-md"
          />
        {/if}
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h2>
          <div class="flex items-center gap-4 text-gray-700 dark:text-slate-300">
            <div class="flex items-center">
              <Star class="w-5 h-5 text-orange-500 dark:text-orange-400 mr-1" />
              <span class="font-bold dark:text-white">{product.points}</span>
              <span class="text-sm ml-1 dark:text-slate-400">points/{product.measure}</span>
            </div>
            <div class="text-sm">
              <span class="font-semibold dark:text-slate-300">Category:</span> 
              <span class="dark:text-slate-400">{product.category}</span>
            </div>
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-600 dark:text-slate-400">
            <span class="font-semibold dark:text-slate-300">Seller:</span>
            <img 
              src={giver.avatar || '/user.svg'} 
              alt="Seller" 
              class="w-6 h-6 rounded-full mx-2 object-cover"
            />
            <span>{giver.username}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Form -->
    <form method="POST" action="?/verify" use:enhance class="space-y-6">
      <!-- Hidden fields for product data -->
      <input type="hidden" name="initial" value={product.initial} />
      <input type="hidden" name="productName" value={product.name} />
      <input type="hidden" name="productPoints" value={product.points} />
      <input type="hidden" name="productMeasure" value={product.measure} />
      <input type="hidden" name="productCategory" value={product.category} />
      <input type="hidden" name="productPhoto" value={product.photo || ''} />
      <input type="hidden" name="giverId" value={giver.id} />



      {#if form?.error}
        <div class="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 dark:border-red-600 p-4 rounded-xl transition-colors">
          <p class="text-red-700 dark:text-red-400 font-semibold">{form.error}</p>
        </div>
      {/if}

      <!-- Buyer Codename -->
      <div class="space-y-2">
        <label for="codename" class="flex items-center text-gray-700 dark:text-slate-300 font-semibold text-lg">
          <User class="w-5 h-5 mr-2 text-teal-600 dark:text-teal-400" />
          Buyer Codename
        </label>
        <input
          type="text"
          id="codename"
          name="codename"
          bind:value={codename}
          required
          class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-teal-500 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 transition-all outline-none text-lg"
          placeholder="Enter buyer's codename"
        />
      </div>

      <!-- Buyer PIN -->
      <div class="space-y-2">
        <label for="pin" class="flex items-center text-gray-700 dark:text-slate-300 font-semibold text-lg">
          <Lock class="w-5 h-5 mr-2 text-teal-600 dark:text-teal-400" />
          Buyer PIN
        </label>
        <input
          type="password"
          id="pin"
          name="pin"
          bind:value={pin}
          required
          maxlength="6"
          class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-teal-500 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 transition-all outline-none text-lg"
          placeholder="Enter buyer's PIN"
        />
      </div>

      <!-- Amount -->
      <div class="space-y-2">
        <label for="amount" class="flex items-center text-gray-700 dark:text-slate-300 font-semibold text-lg">
          <Package class="w-5 h-5 mr-2 text-teal-600 dark:text-teal-400" />
          Amount ({product.measure})
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          bind:value={amount}
          min="0.01"
          step="0.01"
          required
          class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-teal-500 dark:focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:focus:ring-teal-800 transition-all outline-none text-lg"
        />
      </div>

      <!-- Kind -->
      <div class="space-y-2">
        <label for="kind" class="flex items-center text-gray-700 dark:text-slate-300 font-semibold text-lg">
          <Handshake class="w-5 h-5 mr-2 text-teal-600 dark:text-teal-400" />
          Kind
        </label>
        <select 
          id="kind" 
          name="kind" 
          bind:value={selectedKind}
          required
          class="w-full p-3 border border-gray-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors"
        >
          <option value="" disabled selected>Select transaction kind</option>
          <option value="exchange">Exchange</option>
          <option value="donation">Donation</option>
        </select>
      </div>

      <!-- Total Points Display -->
      <div class="bg-sky-50 dark:bg-sky-950/30 rounded-2xl p-6 border-2 border-sky-200 dark:border-sky-800 transition-colors">
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold text-gray-800 dark:text-slate-200">Total Points:</span>
          <span class="text-3xl font-extrabold text-teal-700 dark:text-teal-400">{totalPoints.toFixed(2)}</span>
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-teal-600 dark:bg-teal-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition duration-200 active:scale-[.99] transform cursor-pointer"
      >
        Proceed with Transaction
      </button>
    </form>

  </div>
</div>