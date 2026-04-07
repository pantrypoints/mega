<script lang="ts">
    import type { PageData } from './$types';
    import ItemDetail from '$lib/components/Productdetail.svelte';
    import { hsChapters, hsSubcategories, hsDetails } from '$lib/data/hsData';
    
    let { data } = $props();
    const { product, isOwner, owner, currentUserId } = data;
    
    // HS Code description function
    function getHSDescription(code: string): string {
        if (!code) return 'Not Classified';
        const cleanCode = code.replace(/\D/g, '');
        const chapter = cleanCode.substring(0, 2);
        const subcategory = cleanCode.substring(0, 4);
        
        if (hsDetails[subcategory]?.[code]) return hsDetails[subcategory][code];
        if (hsSubcategories[chapter]?.[subcategory]) return hsSubcategories[chapter][subcategory];
        if (hsChapters[chapter]) return hsChapters[chapter];
        return 'Unknown Category';
    }
</script>

<ItemDetail 
    item={product}
    isOwner={isOwner}
    owner={owner}
    currentUserId={currentUserId}
    itemType="product"
    backLink="/products"
    deleteAction="?/deleteProduct"
    editLink={`/products/${product.id}/edit`}
    getDescription={getHSDescription}
/>




<!-- <script lang="ts">
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
  transactionParams.set('initial', 'p');
  transactionParams.set('name', product.name);
  transactionParams.set('points', String(product.points));
  transactionParams.set('measure', product.measure);
  transactionParams.set('category', product.category);
  transactionParams.set('initial', "p");
  transactionParams.set('photo', product.photo1 || '');
  transactionParams.set('giverId', product.userId);

  const transactionHref = `/transactions/new?${transactionParams.toString()}`;
</script>



<svelte:head>
  <title>{product.name} - Circle App</title>
</svelte:head>


<div class="min-h-screen bg-sky-50 dark:bg-slate-950 flex flex-col items-center p-4 sm:p-8 transition-colors">
  <div class="w-full max-w-4xl bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-600 transform transition duration-500 hover:shadow-3xl">

    <a href="/products"
      class="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-teal-800 dark:hover:text-teal-300 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" />
      {m.back_to_products()}
    </a>

    <div class="flex items-start justify-between gap-4 mb-2">
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white">
        {product.name}
      </h1>

      {#if isOwner}
        <div class="flex space-x-3 mt-1">
          
          <a href={`/products/${product.id}/edit`}
            class="flex items-center justify-center p-2 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-full shadow-md hover:bg-sky-200 dark:hover:bg-sky-800 transition duration-150 transform hover:scale-105"
            title="Edit Product">
            <Edit class="w-5 h-5" />
          </a>

          
          <form 
            method="POST" 
            action="?/delete"
            onsubmit={() => confirm('Delete this product permanently?')}
            use:enhance>
            <button 
              type="submit"
              class="flex items-center justify-center p-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full shadow-md hover:bg-red-200 dark:hover:bg-red-800 transition duration-150 transform hover:scale-105"
              title="Delete Product">
              <Trash2 class="w-5 h-5" />
            </button>
          </form>
        </div>
      {/if}
    </div>

    <p class="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-8">
      {product.headline}
    </p>


    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      
      <div class="space-y-4">
        <div class="relative w-full h-96 bg-gray-100 dark:bg-slate-800 rounded-2xl overflow-hidden mb-4 shadow-inner">
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
                   {photo === currentPhoto ? 'border-teal-500 dark:border-teal-400 scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}">
              <img
                src={photo}
                alt="Product {i + 1}"
                class="w-full h-full object-cover"
              />
            </button>
          {/each}
        </div>
      </div>


      <div class="space-y-6">
        
        <div class="space-y-3 p-5 bg-sky-50 dark:bg-sky-950/30 rounded-2xl border-l-4 border-sky-400 dark:border-sky-600 transition-colors">
          <div class="flex items-center text-gray-800 dark:text-slate-200">
            <span class="font-bold text-lg">{m.points_value()}:</span>
            <span class="ml-2 text-2xl font-extrabold text-sky-700 dark:text-sky-400">{product.points.toFixed(0)}</span>
          </div>
          <div class="flex items-center text-gray-600 dark:text-slate-400">
            <span class="font-semibold">{m.measure()}:</span>
            <span class="ml-2">{product.measure}</span>
          </div>
              
          <div class="text-gray-600 dark:text-slate-400">
            <span class="font-semibold">{m.category()}:</span>
            <span class="ml-2">
              {getHSDescription(product.category)} ({product.category})
            </span>
          </div>

          <div class="flex items-center text-gray-600 dark:text-slate-400">
            <span class="font-semibold">{m.seller()}:</span>
            <a href={`/users/${owner.slug}`} class="flex items-center ml-2 hover:bg-sky-50 dark:hover:bg-sky-950/50 p-1 rounded-lg transition-colors duration-200">
              <img src={owner.avatar} alt="Seller Avatar" class="w-8 h-8 rounded-full object-cover" />
              <span class="ml-2 text-sm truncate hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200">
                {owner.username}
              </span>
            </a>
          </div>
        </div>
      </div>
      

      <div class="lg:col-span-2 p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border-t border-gray-100 dark:border-slate-700 transition-colors">
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-3 border-b pb-2 dark:border-slate-700">{m.description()}</h3>
        <p class="text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          {product.description || 'No detailed description provided for this product.'}
        </p>
      </div>
    </div>

    <div class="mt-10">
      {#if isOwner}
        <a href={transactionHref} class="w-full bg-teal-600 dark:bg-teal-500 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2">
          <Handshake class="w-5 h-5" />{m.barter_do()}
        </a>
      {:else}
        <div class="w-full text-center py-3 rounded-2xl font-bold text-lg bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400">
          {m.to_avail()}
        </div>
      {/if}
    </div>
  </div>
</div> -->