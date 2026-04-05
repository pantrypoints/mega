<script lang="ts">
  import type { PageData } from './$types';
  import ItemDetail from '$lib/components/Servicedetail.svelte';
  
  let { data } = $props();
  const { service, isOwner, owner, currentUserId } = data;
</script>

<ItemDetail 
  item={service}
  isOwner={isOwner}
  owner={owner}
  currentUserId={currentUserId}
  itemType="service"
  backLink="/services"
  deleteAction="?/deleterequest"
  editLink={`/services/${service.id}/edit`}
/>




<!-- <script lang="ts">
  import type { PageData } from './$types';
  import { ArrowLeft, Star, Tag, Ruler, Briefcase, Camera, Handshake, Edit, Trash2 } from 'lucide-svelte';
  import { enhance } from '$app/forms';

  import { getNAICSDescription } from '$lib/data/naicsData';
  import { setLocale } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages.js';
  
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
  transactionParams.set('initial', 's');
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
  <title>Service: {service.name}</title>
</svelte:head>


<div class="min-h-screen bg-sky-50 dark:bg-black flex flex-col items-center p-4 sm:p-8 transition-colors">
  <div class="w-full max-w-4xl bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-600 transform transition duration-500 hover:shadow-3xl">

    <a href="/services"
      class="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" />
      {m.back_to_services()}
    </a>


    <div class="flex justify-between items-start mb-2">

      <div>
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          {service.name}
        </h1>
        <p class="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-8">{service.headline}</p>
      </div>


      {#if isOwner}
        <div class="flex space-x-3 mt-1">
          <button
            on:click={handleEdit}
            class="flex items-center justify-center p-2 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-full shadow-md hover:bg-sky-200 dark:hover:bg-sky-800 transition duration-150 transform hover:scale-105"
            title="Edit Service"
          >
            <Edit class="w-5 h-5" />
          </button>
              

          <form 
            method="POST" 
            action="?/deleteService"
            on:submit={() => confirm('Are you sure you want to delete this service?')}
            use:enhance>
            <button type="submit" class="flex items-center justify-center p-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full shadow-md hover:bg-red-200 dark:hover:bg-red-800 transition duration-150 transform hover:scale-105" title="Delete Service" >
              <Trash2 class="w-5 h-5" />
            </button>
          </form>
        </div>
      {/if}
    </div>


    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">


      <div class="space-y-4">

        <div class="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3] bg-gray-100 dark:bg-slate-800">
          <img
            src={currentPhoto}
            alt={service.name}
            class="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>


        {#if service.photos.length > 0}
          <div class="flex flex-wrap gap-2 justify-center p-2 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 transition-colors">
            <Camera class="w-5 h-5 text-gray-500 dark:text-slate-400 self-center hidden sm:block" />
            {#each service.photos as photo, index (photo)}
              <button
                on:click={() => handleThumbnailClick(photo)}
                class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none"
                class:border-sky-500={photo === currentPhoto}
                class:border-transparent={photo !== currentPhoto}
              >
                <img src={photo}
                  alt="Thumbnail {index + 1}"
                  class="w-full h-full object-cover opacity-80 hover:opacity-100"/>
              </button>
            {/each}
          </div>
        {/if}
      </div>


      <div class="space-y-6">

        <div class="space-y-3 p-5 bg-sky-50 dark:bg-sky-950/30 rounded-2xl border-l-4 border-sky-400 dark:border-sky-600 transition-colors">
          <div class="flex items-center text-gray-800 dark:text-slate-200">
            <span class="font-bold text-lg">{m.points_value()}:</span>
            <span class="ml-2 text-2xl font-extrabold text-sky-700 dark:text-sky-400">{service.points.toFixed(0)}</span>
          </div>
          <div class="flex items-center text-gray-600 dark:text-slate-400">
            <span class="font-semibold">{m.measure()}:</span>
            <span class="ml-2 uppercase">{service.measure}</span>
          </div>

          <div class="flex items-center text-gray-600 dark:text-slate-400">
            <span class="font-semibold">{m.category()}:</span>
            <span class="ml-2">
              {getNAICSDescription(service.category)} ({service.category})
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
    </div>


    <div class="p-5 mt-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border-t border-gray-100 dark:border-slate-700 lg:col-span-2 transition-colors">
      <p class="text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
        {service.description || 'No detailed description provided for this service.'}
      </p>
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
</div>

 -->