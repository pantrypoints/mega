<script lang="ts">
  import type { PageData } from './$types';
  import { Handshake, ArrowLeft, Star, User, Package, Tag, ArrowRight, CheckCircle } from 'lucide-svelte';
  import { enhance } from '$app/forms';
  
  export let data: PageData;
  
  const { kind, product, amount, totalPoints, giver, getter } = data;
</script>



<svelte:head>
  <title>Confirm Transaction - {product.name}</title>
</svelte:head>


<div class="min-h-screen bg-sky-50 flex flex-col items-center p-4 sm:p-8">
  <div class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500">
    
    <a href="/transactions/new" 
      class="inline-flex items-center text-teal-600 hover:text-teal-800 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" />
      Back
    </a>

    <div class="text-center mb-8">
      <!-- <div class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
        <CheckCircle class="w-8 h-8 text-teal-600" />
      </div> -->
      
      <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
        Confirm Transaction
      </h1>
      
      <p class="text-xl text-gray-600">
        Please review the transaction details
      </p>
    </div>

    <!-- Product Details -->
    <div class="bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl p-6 mb-6 border-2 border-teal-200">
      <div class="flex flex-col items-center justify-center gap-4">
        {#if product.photo}
          <img 
            src={product.photo} 
            alt={product.name}
            class="w-32 h-32 rounded-xl object-cover shadow-lg"
          />
        {/if}
        <h2 class="text-2xl font-bold pb-6 text-gray-900 text-center">{product.name}</h2>
      </div>

      <div class="flex items-start gap-4">
      
        <div class="flex-1">

          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex items-center text-gray-700">
              <Star class="w-5 h-5 text-orange-500 mr-2" />
              <span class="font-semibold">Points/Unit:</span>
              <span class="ml-2 font-bold text-teal-700">{product.points}</span>
            </div>
            
            <div class="flex items-center text-gray-700">
              <Tag class="w-5 h-5 text-teal-600 mr-2" />
              <span class="font-semibold">Category:</span>
              <span class="ml-2 text-sm">{product.category}</span>
            </div>
            
            <div class="flex items-center text-gray-700">
              <Package class="w-5 h-5 text-teal-600 mr-2" />
              <span class="font-semibold">Amount:</span>
              <span class="ml-2 font-bold">{amount} {product.measure}</span>
            </div>

            <div class="flex items-center text-gray-700">
              <Handshake class="w-5 h-5 text-teal-600 mr-2" />
              <span class="font-semibold">Kind:</span>
              <span class="ml-2">{kind}</span>
            </div>            
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Parties -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- Seller/Giver -->
      <div class="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-md">
        <div class="text-center">
          <div class="text-sm font-semibold text-gray-500 mb-2">SELLER</div>
          <img 
            src={giver.avatar || '/user.svg'} 
            alt="Seller"
            class="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-teal-400"
          />
          <div class="font-bold text-gray-900">{giver.username}</div>
          
        </div>
      </div>

      <!-- Arrow -->
      <div class="flex items-center justify-center">
        <div class="bg-teal-100 rounded-full p-3">
          <ArrowRight class="w-6 h-6 text-teal-600" />
        </div>
      </div>

      <!-- Buyer/Getter -->
      <div class="bg-white rounded-2xl p-5 border-2 border-teal-400 shadow-md">
        <div class="text-center">
          <div class="text-sm font-semibold text-teal-600 mb-2">BUYER</div>
          <img 
            src={getter.avatar || '/user.svg'} 
            alt="Buyer"
            class="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-teal-400"
          />
          <div class="font-bold text-gray-900">{getter.username}</div>
          <div class="text-xs text-gray-500 mt-1">This is you</div>
        </div>
      </div>
    </div>

    <!-- Total Points -->
    <div class="bg-gradient-to-r from-teal-500 to-sky-500 rounded-2xl p-8 mb-8 shadow-xl">
      <div class="text-center">
        <div class="text-white text-lg font-semibold mb-2">TOTAL COST</div>
        <div class="text-white text-6xl font-extrabold mb-2">
          {totalPoints.toFixed(2)}
        </div>
        <div class="text-teal-50 text-lg">points</div>
      </div>
    </div>

    <!-- Action Buttons -->
    <form method="POST" action="?/confirm" use:enhance class="space-y-4">
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
        class="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-teal-700 transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2"
      >
        <CheckCircle class="w-5 h-5" />
        Confirm Transaction
      </button>

      <a
        href="/transactions/new"
        class="block w-full bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold text-lg text-center hover:bg-gray-300 transition duration-200"
      >
        Cancel
      </a>
    </form>

  </div>
</div>

