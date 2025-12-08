<script lang="ts">
  import type { PageData } from './$types';
  import { ArrowLeft, Star, Tag, Ruler, Briefcase, Camera, Handshake, Edit, Trash2 } from 'lucide-svelte';
  import { enhance } from '$app/forms';

  // The service data loaded from the server
  export let data: PageData;

  // Destructure the data, including the flags necessary for ownership checks
  const { service, isOwner, owner, currentUserId } = data;

  let currentPhoto = service.photos[0] || 'https://placehold.co/800x600/f0f9ff/0e7490?text=No+Image';

  function handleThumbnailClick(url: string) {
    currentPhoto = url;
  }

  // Prepare transaction parameters for the URL
  const transactionParams = new URLSearchParams();
  transactionParams.set('serviceId', String(service.id));
  transactionParams.set('name', service.name);
  transactionParams.set('points', String(service.points));
  transactionParams.set('measure', service.measure);
  transactionParams.set('category', service.category);
  transactionParams.set('photo', service.photo1 || '');
  transactionParams.set('giverId', service.userId);
  const transactionHref = `/transactions/new?${transactionParams.toString()}`;

  function handleEdit() {
    // Use native browser redirect to the new edit route
    window.location.href = `/services/${service.id}/edit`; 
  }
</script>





<svelte:head>
  <title>{service.name} - Circle App</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 flex flex-col items-center p-4 sm:p-8">
  <div
    class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 transform transition duration-500 hover:shadow-3xl"
  >
    <!-- Back Button -->
    <a
      href="/services"
      class="inline-flex items-center text-sky-600 hover:text-sky-800 transition mb-6 font-medium"
    >
      <ArrowLeft class="w-4 h-4 mr-1" />
      Back to Services
    </a>

    <!-- Header & Owner Controls -->
    <div class="flex justify-between items-start mb-2">
      <div>
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
          {service.name}
        </h1>
        <p class="text-xl font-semibold text-sky-600 mb-8">{service.headline}</p>
      </div>

      <!-- OWNER BUTTONS (Updated to use form for delete) -->
      {#if isOwner}
        <div class="flex space-x-3 mt-1">
          <button
            on:click={handleEdit}
            class="flex items-center justify-center p-2 bg-sky-100 text-sky-600 rounded-full shadow-md hover:bg-sky-200 transition duration-150 transform hover:scale-105"
            title="Edit Service"
          >
            <Edit class="w-5 h-5" />
          </button>
                    
          <!-- Delete Form Action -->
          <form 
              method="POST" 
              action="?/deleteService"
              on:submit={() => confirm('Are you sure you want to delete this service?')}
              use:enhance>
              <button type="submit" class="flex items-center justify-center p-2 bg-red-100 text-red-600 rounded-full shadow-md hover:bg-red-200 transition duration-150 transform hover:scale-105" title="Delete Service" >
                  <Trash2 class="w-5 h-5" />
              </button>
          </form>
        </div>
      {/if}
    </div>

    <!-- service Details Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Image Gallery -->
      <div class="space-y-4">
        <!-- Main Display Image -->
        <div class="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3] bg-gray-100">
          <img
            src={currentPhoto}
            alt={service.name}
            class="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>
        <!-- Thumbnail Selector -->
        {#if service.photos.length > 0}
          <div
            class="flex flex-wrap gap-2 justify-center p-2 rounded-xl bg-gray-50 border border-gray-100"
          >
            <Camera class="w-5 h-5 text-gray-500 self-center hidden sm:block" />
            {#each service.photos as photo, index (photo)}
              <button
                on:click={() => handleThumbnailClick(photo)}
                class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none"
                class:border-sky-500={photo === currentPhoto}
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
                <div class="space-y-3 p-5 bg-sky-50 rounded-2xl border-l-4 border-sky-400">
                    <div class="flex items-center text-gray-800">
                        <Star class="w-5 h-5 text-orange-500 mr-2" />
                        <span class="font-bold text-lg">Points Value:</span>
                        <span class="ml-2 text-2xl font-extrabold text-sky-700">{service.points.toFixed(0)}</span>
                    </div>
                    <div class="flex items-center text-gray-600">
                        <Ruler class="w-5 h-5 mr-2" />
                        <span class="font-semibold">Measure Unit:</span>
                        <span class="ml-2 uppercase">{service.measure}</span>
                    </div>
                    <div class="flex items-center text-gray-600">
                        <Tag class="w-5 h-5 mr-2" />
                        <span class="font-semibold">Category (HS Code):</span>
                        <span class="ml-2">{service.category}</span>
                    </div>
                    <div class="flex items-center text-gray-600">
                        <Briefcase class="w-5 h-5 mr-2" />
                        <span class="font-semibold">Seller:</span>
                        <!-- Display Seller Avatar  || 'https://i.pravatar.cc/150?img=6'-->
                        <img src={owner.avatar} alt="Seller Avatar" class="w-8 h-8 rounded-full ml-2 object-cover" />
                        <span class="ml-2 text-sm truncate">{owner.username}</span>
                    </div>
                </div>
                <!-- Description -->
                <div class="p-5 bg-gray-50 rounded-2xl border-t border-gray-100">
                    <h3 class="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">Description</h3>
                    <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {service.description || 'No detailed description provided for this service.'}
                    </p>
                </div>
            </div>
    </div>
        <!-- Action Button (Barter or Owner Message) -->
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
