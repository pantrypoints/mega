<script lang="ts">
  import type { PageData } from './$types';
  import { ArrowLeft, Star, Tag, Ruler, Briefcase, Camera, Handshake, Edit, Trash2 } from 'lucide-svelte';
  import { hsChapters, hsSubcategories, hsDetails } from '$lib/data/hsData';
  import { m } from '$lib/paraglide/messages.js';

  import { fade, scale } from 'svelte/transition';
  

    export function getHSDescription(code: string): string {
    if (!code) return 'Not Classified';

    // 1. Clean the code for logic (remove dots for length checks)
    const cleanCode = code.replace(/\D/g, '');
    const chapter = cleanCode.substring(0, 2);
    const subcategory = cleanCode.substring(0, 4);

    // 2. Check Detail Level (6+ digits, e.g., 2901.10)
    // We use the provided 'code' here because your hsDetails keys include dots
    if (hsDetails[subcategory]?.[code]) {
      return hsDetails[subcategory][code];
    }

    // 3. Check Subcategory Level (4 digits, e.g., 2901)
    if (hsSubcategories[chapter]?.[subcategory]) {
      return hsSubcategories[chapter][subcategory];
    }

    // 4. Check Chapter Level (2 digits, e.g., 01)
    if (hsChapters[chapter]) {
      return hsChapters[chapter];
    }

    return 'Unknown Category';
  }

  // The product data loaded from the server
  export let data: PageData;
  const { product, isOwner, owner, currentUserId } = data;

  let currentPhoto = product.photos[0] || 'https://placehold.co/800x600/f0f9ff/0e7490?text=No+Image';

  function handleThumbnailClick(url: string) {
    currentPhoto = url;
  }

//  let currentPhoto = $state(product.photos[0]);

  // Prepare transaction parameters for the URL
  const transactionParams = new URLSearchParams();
  transactionParams.set('name', product.name);
  transactionParams.set('points', String(product.points));
  transactionParams.set('measure', product.measure);
  transactionParams.set('category', product.category);
  transactionParams.set('photo', product.photo1 || '');
  transactionParams.set('giverId', product.userId);

  const transactionHref = `/transactions/new?${transactionParams.toString()}`;
</script>



<svelte:head>
  <title>{product.name} - Circle App</title>
</svelte:head>


<div class="min-h-screen bg-sky-50 flex flex-col items-center p-4 sm:p-8">
  <div class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 transform transition duration-500 hover:shadow-3xl">

    <a href="/products"
      class="inline-flex items-center text-sky-600 hover:text-teal-800 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" />
      {m.back_to_products()}
    </a>

    <div class="flex items-start justify-between gap-4 mb-2">
      <h1 class="text-4xl font-extrabold text-gray-900">
        {product.name}
      </h1>

      {#if isOwner}
        <div class="flex space-x-3 mt-1">
            <!-- Edit Button -->
            <a href={`/products/${product.id}/edit`}
                class="flex items-center justify-center p-2 bg-sky-100 text-sky-600 rounded-full shadow-md hover:bg-sky-200 transition duration-150 transform hover:scale-105"
                title="Edit Product">
                <Edit class="w-5 h-5" />
            </a>

            <!-- Delete Button -->
            <form 
                method="POST" 
                action="?/delete"
                onsubmit={() => confirm('Delete this product permanently?')}
                use:enhance>
                <button 
                    type="submit"
                    class="flex items-center justify-center p-2 bg-red-100 text-red-600 rounded-full shadow-md hover:bg-red-200 transition duration-150 transform hover:scale-105"
                    title="Delete Product">
                    <Trash2 class="w-5 h-5" />
                </button>
            </form>
        </div>
      {/if}
    </div>


    <p class="text-xl font-semibold text-sky-600 mb-8">
      {product.headline}
    </p>

    
    <!-- Product Details Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Image Gallery -->
      <div class="space-y-4">


<div class="relative w-full h-96 bg-gray-100 rounded-2xl overflow-hidden mb-4 shadow-inner">
  {#key currentPhoto}
    <img
      in:scale={{ duration: 300, start: 0.95, opacity: 0 }}
      src={currentPhoto}
      alt="Selected product"
      class="w-full h-full object-contain"/>
  {/key}
</div>

<div class="flex gap-3 justify-center">
  {#each product.photos as photo, i (i)}            
    <button
      onclick={() => handleThumbnailClick(photo)}
      class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 transform active:scale-90 focus:outline-none 
             {photo === currentPhoto ? 'border-teal-500 scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}">
      <img
        src={photo}
        alt="Product {i + 1}"
        class="w-full h-full object-cover"
      />
    </button>
  {/each}
</div>

        <!-- Main Display Image -->
<!--         <div class="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3] bg-gray-100">
          <img
            src={currentPhoto}
            alt={product.name}
            class="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>
 -->
        <!-- Thumbnail Selector -->
<!--         {#if product.photos.length > 0}
          <div class="flex flex-wrap gap-2 justify-center p-2 rounded-xl bg-gray-50 border border-gray-100">
            <Camera class="w-5 h-5 text-gray-500 self-center hidden sm:block" />
            {#each product.photos as photo, i (i)}            
              <button
                onclick={() => handleThumbnailClick(photo)}
                class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none"
                class:border-teal-500={photo === currentPhoto}
                class:border-transparent={photo !== currentPhoto}>
                <img
                  src={photo}
                  alt="Product Image {i + 1}"
                  class="w-full h-full object-cover opacity-80 hover:opacity-100"
                />
              </button>
            {/each}
          </div>
        {/if} -->
      </div>

      <!-- Info and Description -->
      <div class="space-y-6">
        <!-- Core Info -->
        <div class="space-y-3 p-5 bg-sky-50 rounded-2xl border-l-4 border-sky-400">
          <div class="flex items-center text-gray-800">
            <!-- <Star class="w-5 h-5 text-orange-500 mr-2" /> -->
            <span class="font-bold text-lg">{m.points_value()}:</span>
            <span class="ml-2 text-2xl font-extrabold text-sky-700">{product.points.toFixed(0)}</span>
          </div>
          <div class="flex items-center text-gray-600">
            <!-- <Ruler class="w-5 h-5 mr-2" /> -->
            <span class="font-semibold">{m.measure()}:</span>
            <span class="ml-2">{product.measure}</span>
          </div>
                
          <div class="text-gray-600">
            <!-- <span><Tag class="w-5 h-5 mr-2" /></span> -->
            <span class="font-semibold">{m.category()}:</span>
            <span class="ml-2">
              {getHSDescription(product.category)} ({product.category})
            </span>
          </div>

          <div class="flex items-center text-gray-600">
            <!-- <Briefcase class="w-5 h-5 mr-2" /> -->
              <span class="font-semibold">{m.seller()}:</span>
              <a href={`/users/${owner.slug}`} class="flex items-center ml-2 hover:bg-sky-50 p-1 rounded-lg transition-colors duration-200">
                <img src={owner.avatar} alt="Seller Avatar" class="w-8 h-8 rounded-full object-cover" />
                <span class="ml-2 text-sm truncate hover:text-sky-600 transition-colors duration-200">
                  {owner.username}
                </span>
              </a>

          </div>
        </div>
      </div>
      
      <!-- Description -->
      <div class="lg:col-span-2 p-5 bg-gray-50 rounded-2xl border-t border-gray-100">
        <h3 class="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">{m.description()}</h3>
        <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {product.description || 'No detailed description provided for this product.'}
        </p>
      </div>

    </div>



    <div class="mt-10">
      {#if isOwner}
        <a href={transactionHref} class="w-full bg-teal-600 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:bg-teal-700 transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2" >
          <Handshake class="w-5 h-5" />{m.barter_do()}
        </a>
      {:else}
        <div class="w-full text-center py-3 rounded-2xl font-bold text-lg bg-red-100 text-red-600">
          {m.to_avail()}
        </div>
      {/if}
    </div>
  </div>
</div>
