<script lang="ts">
  import type { PageData } from './$types';
  import { ArrowLeft, Star, Tag, Ruler, Briefcase, Camera, Handshake } from 'lucide-svelte';

  // The product data loaded from the server
  export let data: PageData;
  const { product, isOwner, ownerAvatar, currentUserId } = data;

  let currentPhoto = product.photos[0] || 'https://placehold.co/800x600/f0f9ff/0e7490?text=No+Image';

  function handleThumbnailClick(url: string) {
    currentPhoto = url;
  }

    // Prepare transaction parameters for the URL
    const transactionParams = new URLSearchParams();
    transactionParams.set('productId', String(product.id));
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
  <div
    class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 transform transition duration-500 hover:shadow-3xl"
  >
    <!-- Back Button -->
    <a
      href="/products"
      class="inline-flex items-center text-teal-600 hover:text-teal-800 transition mb-6 font-medium"
    >
      <ArrowLeft class="w-4 h-4 mr-1" />
      Back to Products
    </a>

    <!-- Header -->
    <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
      {product.name}
    </h1>
    <p class="text-xl font-semibold text-teal-600 mb-8">{product.headline}</p>

    <!-- Product Details Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Image Gallery -->
      <div class="space-y-4">
        <!-- Main Display Image -->
        <div class="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3] bg-gray-100">
          <img
            src={currentPhoto}
            alt={product.name}
            class="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>

        <!-- Thumbnail Selector -->
        {#if product.photos.length > 0}
          <div class="flex flex-wrap gap-2 justify-center p-2 rounded-xl bg-gray-50 border border-gray-100">
            <Camera class="w-5 h-5 text-gray-500 self-center hidden sm:block" />
            {#each product.photos as photo, index (photo)}
              <button
                on:click={() => handleThumbnailClick(photo)}
                class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none"
                class:border-teal-500={photo === currentPhoto}
                class:border-transparent={photo !== currentPhoto}
              >
                <img
                  src={photo}
                  alt="Thumbnail {index + 1}"
                  class="w-full h-full object-cover opacity-80 hover:opacity-100"
                />
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Info and Description -->
      <div class="space-y-6">
        <!-- Core Info -->
        <div class="space-y-3 p-5 bg-teal-50 rounded-2xl border-l-4 border-teal-400">
          <div class="flex items-center text-gray-800">
            <Star class="w-5 h-5 text-orange-500 mr-2" />
            <span class="font-bold text-lg">Points Value:</span>
            <span class="ml-2 text-2xl font-extrabold text-teal-700">{product.points.toFixed(0)}</span>
          </div>
          <div class="flex items-center text-gray-600">
            <Ruler class="w-5 h-5 mr-2" />
            <span class="font-semibold">Measure Unit:</span>
            <span class="ml-2 uppercase">{product.measure}</span>
          </div>
          <div class="flex items-center text-gray-600">
            <Tag class="w-5 h-5 mr-2" />
            <span class="font-semibold">Category (HS Code):</span>
            <span class="ml-2">{product.category}</span>
          </div>
          <div class="flex items-center text-gray-600">
            <Briefcase class="w-5 h-5 mr-2" />
            <span class="font-semibold">Seller ID:</span>
                        <!-- Display Seller Avatar -->
                        <img 
                            src={ownerAvatar || 'https://i.pravatar.cc/150?img=6'} 
                            alt="Seller Avatar" 
                            class="w-8 h-8 rounded-full ml-2 object-cover"
                        />
            <span class="ml-2 text-sm truncate">{product.userId}</span>
          </div>
        </div>

        <!-- Description -->
        <div class="p-5 bg-gray-50 rounded-2xl border-t border-gray-100">
          <h3 class="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">Description</h3>
          <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {product.description || 'No detailed description provided for this product.'}
          </p>
        </div>
      </div>
    </div>

    <!-- Action Button (Barter or Owner Message) -->
    <div class="mt-10">
      {#if isOwner}
        <!-- Buyer Transaction Button -->
        <a
          href={transactionHref}
          class="w-full bg-orange-500 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:bg-orange-600 transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2"
        >
                    <Handshake class="w-5 h-5" />
          Make Barter Transaction
        </a>

      {:else if currentUserId}

       <div class="w-full text-center py-3 rounded-2xl font-bold text-lg bg-gray-200 text-gray-700">
          Meet up with the product owner!
        </div>

      {:else}
                <div class="w-full text-center py-3 rounded-2xl font-bold text-lg bg-red-100 text-red-600">
          Please sign in to make a transaction.
        </div>
            {/if}
    </div>
  </div>
</div>

