<script lang="ts">
  import { Image, Sigma, ArrowLeft, Save, Pen, Ruler, Tag, ChevronDown, DollarSign } from 'lucide-svelte';
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { m } from '$lib/paraglide/messages.js';
  import { naicsSectors, naicsSubsectors, naicsIndustries, getSectorKey } from '$lib/data/naicsData';
  import ImageKit from 'imagekit-javascript';
  import { PUBLIC_IMAGEKIT_URL_ENDPOINT, PUBLIC_IMAGEKIT_PUBLIC_KEY } from '$env/static/public';

  // Props in Svelte 5
  let { data }: { data: PageData } = $props();
  // export let data: PageData;
  const { service } = data;

  // State Management
  let photoUrls = $state([service.photo1 || '', service.photo2 || '', service.photo3 || '']);
  let uploadingIndices = $state(new Set<number>());

  let name = $state(service.name);
  let headline = $state(service.headline || '');
  let description = $state(service.description || '');
  let points = $state(String(service.points));
  let measure = $state(service.measure);
  let category = $state(service.category || '');
  let selectedSector = $state('');
  let selectedSubsector = $state('');
  let selectedIndustry = $state('');

  // --- REPLACEMENT FOR $: ---

  // Reactive Lists using $derived
  const availableSubsectors = $derived(
    selectedSector
      ? Object.entries(naicsSubsectors[selectedSector] || {}).map(([code, name]) => ({ code, name }))
      : []
  );

  const availableIndustries = $derived(
    selectedSubsector
      ? Object.entries(naicsIndustries[selectedSubsector] || {}).map(([code, name]) => ({ code, name }))
      : []
  );

  // Sync Category with deepest selection using $effect
  $effect(() => {
    if (selectedIndustry) {
      category = selectedIndustry;
    } else if (selectedSubsector) {
      category = selectedSubsector;
    } else {
      category = selectedSector;
    }
  });





  onMount(() => {
    if (category) {
      selectedSector = getSectorKey(category);
      
      if (category.length >= 3) {
        const sub = category.substring(0, 3);
        if (naicsSubsectors[selectedSector]?.[sub]) {
          selectedSubsector = sub;
          
          if (category.length === 6 && naicsIndustries[sub]?.[category]) {
            selectedIndustry = category;
          }
        }
      }
    }
  });

  const ik = new ImageKit({
    urlEndpoint: PUBLIC_IMAGEKIT_URL_ENDPOINT,
    publicKey: PUBLIC_IMAGEKIT_PUBLIC_KEY,
  });

  async function uploadPhoto(e: Event, index: number) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (file.size > 500 * 1024) { alert("File too large (>500KB)"); return; }
    
    uploadingIndices.add(index);
    try {
      const authRes = await fetch('/api/imagekit-auth');
      const authData = await authRes.json();
      const result = await ik.upload({
        file,
        fileName: `edit_prod_${Date.now()}_${index}`,
        ...authData
      });
      photoUrls[index] = result.url;
    } catch (err) {
      console.error(err);
    } finally {
      uploadingIndices.delete(index);
    }
  }


  function resetSub() { selectedSubsector = ''; selectedIndustry = ''; }
  function resetInd() { selectedIndustry = ''; }
</script>

<svelte:head>
  <title>Edit {service.name} - Circle App</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
  <div class="w-full max-w-3xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500">
    
    <a href="/services/{service.id}" class="inline-flex items-center text-teal-600 hover:text-teal-800 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" /> Back to Service Detail
    </a>

    <h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1">{m.edit()} {service.name}</h1>

    <form method="POST" use:enhance class="space-y-8">
      <input type="hidden" name="category" value={category} />

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Service Name</label>
          <input type="text" name="name" bind:value={name} required class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Points</label>
            <input type="number" step="0.01" name="points" bind:value={points} required class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Unit of Measure</label>
            <input type="text" name="measure" bind:value={measure} required class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
        </div>
      </div>

      <div class="bg-teal-50 p-6 rounded-2xl border-2 border-teal-100">
        <label class="block text-sm font-bold text-teal-800 mb-4 flex items-center gap-1">
          <Tag class="w-4 h-4"/> Industry Classification (NAICS)
        </label>

        <div class="mb-4">
          <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Sector</label>
          <div class="relative">
            <select bind:value={selectedSector} onchange={resetSub} class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10 outline-none focus:border-teal-500">
              <option value="">-- Select Sector --</option>
              {#each Object.entries(naicsSectors) as [code, label]}
                <option value={code}>{code} - {label}</option>
              {/each}
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {#if selectedSector}
          <div class="mb-4">
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Subsector</label>
            <div class="relative">
              <select bind:value={selectedSubsector} onchange={resetInd} class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10 outline-none focus:border-teal-500">
                <option value="">-- Select Subsector --</option>
                {#each availableSubsectors as sub}
                  <option value={sub.code}>{sub.code} - {sub.name}</option>
                {/each}
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        {/if}

        {#if selectedSubsector && availableIndustries.length > 0}
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Specific Industry</label>
            <div class="relative">
              <select bind:value={selectedIndustry} class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10 outline-none focus:border-teal-500">
                <option value="">-- Select Industry --</option>
                {#each availableIndustries as ind}
                  <option value={ind.code}>{ind.code} - {ind.name}</option>
                {/each}
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        {/if}

        <div class="mt-4 p-3 bg-white rounded-lg border border-teal-200 text-center">
          <span class="text-xs font-bold text-teal-600 uppercase">Active Category Code:</span>
          <span class="ml-2 font-mono font-bold text-gray-800">{category || '---'}</span>
        </div>
      </div>


            <h2 class="text-xl font-bold text-teal-700 mt-6 flex items-center gap-1"><Image class="w-5 h-5"/> Image Gallery URLs (Optional)</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {#each [0, 1, 2] as i}
                <div class="space-y-2">
                  <label class="block text-sm font-semibold text-gray-700">
                    {i === 0 ? 'Primary Photo' : `Photo ${i + 1}`}
                  </label>
                  
                  <div class="relative h-40 w-full bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden group">
                    {#if photoUrls[i]}
                      <img src={photoUrls[i]} alt="Preview" class="w-full h-full object-cover" />
                      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                         <button 
                          type="button" 
                          onclick={() => photoUrls[i] = ''} 
                          class="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
                        >✕</button>
                      </div>
                    {:else}
                      <Image class="w-8 h-8 text-gray-400" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onchange={(e) => uploadPhoto(e, i)} 
                        class="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    {/if}
                    
                    {#if uploadingIndices.has(i)}
                      <div class="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
                      </div>
                    {/if}
                  </div>
                  
                  <input type="hidden" name="photo{i + 1}" value={photoUrls[i]} />
                </div>
              {/each}
            </div>



      <div class="flex gap-4 pt-4">
        <button type="submit" class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 flex items-center justify-center gap-2">
          <Save class="w-5 h-5"/>{m.save_changes()}
        </button>
        <a href="/services/{service.id}" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl text-center transition duration-300">Cancel</a>
      </div>
    </form>
  </div>
</div>
