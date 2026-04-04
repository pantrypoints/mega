<script lang="ts">
  import type { PageData } from './$types';
  import { Handshake, ArrowLeft, Star, User, Package, Tag, ArrowRight, CheckCircle } from 'lucide-svelte';
  import { enhance } from '$app/forms';
  
  export let data: PageData;
  
  const { initial, kind, product, amount, totalPoints, giver, getter } = data;
</script>



<svelte:head>
  <title>Confirm Transaction - {product.name}</title>
</svelte:head>


<div class="min-h-screen bg-sky-50 dark:bg-black flex flex-col items-center p-4 sm:p-8">
  <div class="w-full max-w-4xl bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 dark:border-teal-600">
    
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
        {m.confirm_transaction_title()}
      </h1>
      
      <p class="text-xl text-gray-600 dark:text-gray-400">
        {m.confirm_transaction_subtitle()}
      </p>
    </div>

    <!-- Product Details -->
    <div class="bg-gradient-to-br from-teal-50 to-sky-50 dark:from-teal-950/30 dark:to-sky-950/30 rounded-2xl p-6 mb-6 border-2 border-teal-200 dark:border-teal-800">
      <div class="flex flex-col items-center justify-center gap-4">
        {#if product.photo}
          <img 
            src={product.photo} 
            alt={product.name}
            class="w-32 h-32 rounded-xl object-cover shadow-lg"
          />
        {/if}
        <h2 class="text-2xl font-bold pb-6 text-gray-900 dark:text-white text-center">{product.name}</h2>
      </div>

      <div class="flex items-start gap-4">
        <div class="flex-1">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex items-center text-gray-700 dark:text-gray-300">
              <Star class="w-5 h-5 text-orange-500 dark:text-orange-400 mr-2" />
              <span class="font-semibold">{m.points_per_unit()}:</span>
              <span class="ml-2 font-bold text-teal-700 dark:text-teal-400">{product.points}</span>
            </div>
            
            <div class="flex items-center text-gray-700 dark:text-gray-300">
              <Tag class="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
              <span class="font-semibold">{m.category()}:</span>
              <span class="ml-2 text-sm">{product.category}</span>
            </div>
            
            <div class="flex items-center text-gray-700 dark:text-gray-300">
              <Package class="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
              <span class="font-semibold">{m.amount()}:</span>
              <span class="ml-2 font-bold">{amount} {product.measure}</span>
            </div>

            <div class="flex items-center text-gray-700 dark:text-gray-300">
              <Handshake class="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" />
              <span class="font-semibold">{m.kind()}:</span>
              <span class="ml-2">{kind === 'exchange' ? m.exchange() : m.donation()}</span>
            </div>            
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Parties -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- Seller/Giver -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 border-2 border-gray-200 dark:border-gray-700 shadow-md">
        <div class="text-center">
          <div class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{m.seller()}</div>
          <img 
            src={giver.avatar || '/user.svg'} 
            alt="Seller"
            class="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-teal-400 dark:border-teal-500"
          />
          <div class="font-bold text-gray-900 dark:text-white">{giver.username}</div>
        </div>
      </div>

      <!-- Arrow -->
      <div class="flex items-center justify-center">
        <div class="bg-teal-100 dark:bg-teal-900/50 rounded-full p-3">
          <ArrowRight class="w-6 h-6 text-teal-600 dark:text-teal-400" />
        </div>
      </div>

      <!-- Buyer/Getter -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-5 border-2 border-teal-400 dark:border-teal-500 shadow-md">
        <div class="text-center">
          <div class="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-2">{m.buyer()}</div>
          <img 
            src={getter.avatar || '/user.svg'} 
            alt="Buyer"
            class="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-teal-400 dark:border-teal-500"
          />
          <div class="font-bold text-gray-900 dark:text-white">{getter.username}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.this_is_you()}</div>
        </div>
      </div>
    </div>

    <!-- Total Points -->
    <div class="bg-gradient-to-r from-teal-500 to-sky-500 dark:from-teal-600 dark:to-sky-600 rounded-2xl p-8 mb-8 shadow-xl">
      <div class="text-center">
        <div class="text-white text-lg font-semibold mb-2">{m.total_cost()}</div>
        <div class="text-white text-6xl font-extrabold mb-2">
          {totalPoints.toFixed(2)}
        </div>
        <div class="text-teal-50 dark:text-teal-100 text-lg">{m.points()}</div>
      </div>
    </div>

    <!-- Action Buttons -->
    <form method="POST" action="" use:enhance class="space-y-4">
      <input type="hidden" name="initial" value={initial} />
      <input type="hidden" name="productName" value={product.name} />
      <input type="hidden" name="productPoints" value={product.points} />
      <input type="hidden" name="productMeasure" value={product.measure} />
      <input type="hidden" name="productCategory" value={product.category} />
      <input type="hidden" name="productPhoto" value={product.photo || ''} />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="giverId" value={giver.id} />
      <input type="hidden" name="getterId" value={getter.id} />

      <button
        type="submit"
        class="w-full bg-teal-600 dark:bg-teal-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2"
      >
        <CheckCircle class="w-5 h-5" />
        {m.confirm_transaction()}
      </button>

      <a
        href="/transactions/new"
        class="block w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-4 rounded-2xl font-bold text-lg text-center hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
      >
        {m.cancel()}
      </a>
    </form>

  </div>
</div>