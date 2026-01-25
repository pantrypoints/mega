<script lang="ts">
  import type { PageData } from './$types';
  import { ArrowLeft, Star, Tag, Ruler, Briefcase, Camera, Handshake } from 'lucide-svelte';

  // The product data loaded from the server
  export let data: PageData;
  const { product, isOwner, owner, currentUserId } = data;

  let currentPhoto = product.photos[0] || 'https://placehold.co/800x600/f0f9ff/0e7490?text=No+Image';

  function handleThumbnailClick(url: string) {
    currentPhoto = url;
  }

    // Prepare transaction parameters for the URL
    const transactionParams = new URLSearchParams();
    // transactionParams.set('productId', String(product.id));
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
  <div class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 transform transition duration-500 hover:shadow-3xl">

    <a href="/products"
      class="inline-flex items-center text-teal-600 hover:text-teal-800 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" />
      Back to Products
    </a>



<div class="flex items-start justify-between gap-4 mb-2">
  <h1 class="text-4xl font-extrabold text-gray-900">
    {product.name}
  </h1>

  {#if isOwner}
    <form method="POST" action="?/delete" on:submit={() => confirm('Delete this product permanently?')}>


      <!-- Edit Button -->
      <a
        href={`/products/${product.id}/edit`}
        class="bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-md transition"
      >
        Edit
      </a>

      <button
        type="submit"
        class="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-md transition"
      >
        Delete
      </button>
    </form>
  {/if}
</div>

<p class="text-xl font-semibold text-teal-600 mb-8">
  {product.headline}
</p>


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


            <!-- {#each product.photos as photo, index (photo)} -->
            {#each product.photos as photo, i (i)}            
              <button
                on:click={() => handleThumbnailClick(photo)}
                class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none"
                class:border-teal-500={photo === currentPhoto}
                class:border-transparent={photo !== currentPhoto}
              >
                <img
                  src={photo}
                  alt="Product Image {i + 1}"
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
            <span class="font-semibold">Owner:</span>          
              <img src={owner.avatar || '/user.svg'} 
                alt="Seller Avatar" 
                class="w-8 h-8 rounded-full ml-2 object-cover"/>
            <span class="ml-2 text-sm truncate">{owner.username}</span>
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



    <div class="mt-10">
      {#if isOwner}
        <a href={transactionHref} class="w-full bg-teal-600 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:bg-teal-700 transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2" >
          <Handshake class="w-5 h-5" /> Make Barter Transaction
        </a>
      {:else}
        <div
          class="w-full text-center py-3 rounded-2xl font-bold text-lg bg-red-100 text-red-600"
        >
          To avail of this item, please chat the person to meet up
        </div>
      {/if}
    </div>
  </div>
</div>

