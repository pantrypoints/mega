<script lang="ts">
  import { Image, ArrowLeft, Save, Tag, ChevronDown } from 'lucide-svelte';
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';
  import { m } from '$lib/paraglide/messages.js';
  import { naicsSectors, naicsSubsectors, naicsIndustries, getSectorKey } from '$lib/data/naicsData';
  import ImageKit from 'imagekit-javascript';
  import { PUBLIC_IMAGEKIT_URL_ENDPOINT, PUBLIC_IMAGEKIT_PUBLIC_KEY } from '$env/static/public';

  let { 
    item,
    itemType = 'service',
    backLink
  }: {
    item: any;
    itemType: 'service' | 'request';
    backLink: string;
  } = $props();

  // Form state
  let name = $state(item.name);
  let headline = $state(item.headline || '');
  let description = $state(item.description || '');
  let points = $state(String(item.points));
  let measure = $state(item.measure);
  let category = $state(item.category || '');
  
  // Photo URLs (max 3 for both services and requests)
  let photoUrls = $state([
    item.photo1 || '',
    item.photo2 || '',
    item.photo3 || ''
  ]);
  let uploadingIndices = $state(new Set<number>());
  
  // NAICS selection state
  let selectedSector = $state('');
  let selectedSubsector = $state('');
  let selectedIndustry = $state('');
  
  // Reactive lists
  let availableSubsectors = $derived(
    selectedSector 
      ? Object.entries(naicsSubsectors[selectedSector] || {}).map(([code, name]) => ({ code, name }))
      : []
  );
  
  let availableIndustries = $derived(
    selectedSubsector 
      ? Object.entries(naicsIndustries[selectedSubsector] || {}).map(([code, name]) => ({ code, name }))
      : []
  );
  
  // Sync category with deepest selection
  $effect(() => {
    if (selectedIndustry) {
      category = selectedIndustry;
    } else if (selectedSubsector) {
      category = selectedSubsector;
    } else if (selectedSector) {
      category = selectedSector;
    }
  });
  
  // Initialize NAICS selection from existing category
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
  
  // ImageKit upload
  const ik = new ImageKit({
    urlEndpoint: PUBLIC_IMAGEKIT_URL_ENDPOINT,
    publicKey: PUBLIC_IMAGEKIT_PUBLIC_KEY,
  });
  
  async function uploadPhoto(e: Event, index: number) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    
    if (file.size > 500 * 1024) {
      alert("File too large (>500KB)");
      return;
    }
    
    uploadingIndices.add(index);
    try {
      const authRes = await fetch('/api/imagekit-auth');
      const authData = await authRes.json();
      const result = await ik.upload({
        file,
        fileName: `edit_${itemType}_${Date.now()}_${index}`,
        ...authData
      });
      photoUrls[index] = result.url;
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      uploadingIndices.delete(index);
    }
  }
  
  function resetSub() {
    selectedSubsector = '';
    selectedIndustry = '';
  }
  
  function resetInd() {
    selectedIndustry = '';
  }
  
  const title = $derived(itemType === 'service' ? m.edit_service() : m.edit_request());
  const backText = $derived(itemType === 'service' ? m.back_to_service() : m.back_to_request());
</script>

<svelte:head>
  <title>{title}: {item.name}</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 dark:bg-sky-950 flex items-center justify-center p-4">
  <div class="w-full max-w-3xl bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 dark:border-teal-600">
    
    <a href={backLink} class="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" />
      {backText}
    </a>
    
    <h1 class="text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-1">
      {title} {item.name}
    </h1>
    
    <form method="POST" use:enhance class="space-y-8">
      <input type="hidden" name="category" value={category} />
      
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {itemType === 'service' ? m.service_name() : m.request_name()}
          </label>
          <input 
            type="text" 
            name="name" 
            bind:value={name} 
            required 
            class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" 
          />
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{m.points_value()}</label>
            <input 
              type="number" 
              step="0.01" 
              name="points" 
              bind:value={points} 
              required 
              class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" 
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{m.measure()}</label>
            <input 
              type="text" 
              name="measure" 
              bind:value={measure} 
              required 
              class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" 
            />
          </div>
        </div>
      </div>
      
      <!-- NAICS Category Selection -->
      <div class="bg-teal-50 dark:bg-teal-950/30 p-6 rounded-2xl border-2 border-teal-100 dark:border-teal-800">
        <label class="block text-sm font-bold text-teal-800 dark:text-teal-400 mb-4 flex items-center gap-1">
          <Tag class="w-4 h-4" />
          {m.industry_classification()}
        </label>
        
        <!-- Sector -->
        <div class="mb-4">
          <label class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">{m.sector()}</label>
          <div class="relative">
            <select 
              bind:value={selectedSector} 
              onchange={resetSub} 
              class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl bg-white appearance-none pr-10 outline-none focus:border-teal-500"
            >
              <option value="">-- {m.select_sector()} --</option>
              {#each Object.entries(naicsSectors) as [code, label]}
                <option value={code}>{code} - {label}</option>
              {/each}
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <!-- Subsector -->
        {#if selectedSector}
          <div class="mb-4">
            <label class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">{m.subsector()}</label>
            <div class="relative">
              <select 
                bind:value={selectedSubsector} 
                onchange={resetInd} 
                class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl bg-white appearance-none pr-10 outline-none focus:border-teal-500"
              >
                <option value="">-- {m.select_subsector()} --</option>
                {#each availableSubsectors as sub}
                  <option value={sub.code}>{sub.code} - {sub.name}</option>
                {/each}
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        {/if}
        
        <!-- Industry -->
        {#if selectedSubsector && availableIndustries.length > 0}
          <div>
            <label class="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">{m.industry()}</label>
            <div class="relative">
              <select 
                bind:value={selectedIndustry} 
                class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl bg-white appearance-none pr-10 outline-none focus:border-teal-500"
              >
                <option value="">-- {m.select_industry()} --</option>
                {#each availableIndustries as ind}
                  <option value={ind.code}>{ind.code} - {ind.name}</option>
                {/each}
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        {/if}
        
        <div class="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-teal-200 dark:border-teal-800 text-center">
          <span class="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">{m.active_category_code()}:</span>
          <span class="ml-2 font-mono font-bold text-gray-800 dark:text-white">{category || '---'}</span>
        </div>
      </div>
      
      <!-- Headline -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{m.headline()}</label>
        <input 
          type="text" 
          name="headline" 
          bind:value={headline} 
          class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" 
        />
      </div>
      
      <!-- Image Gallery (3 photos max) -->
      <div>
        <h2 class="text-xl font-bold text-teal-700 dark:text-teal-400 mt-6 flex items-center gap-1">
          <Image class="w-5 h-5" /> {m.image_gallery()}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{m.max_3_photos()}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {#each [0, 1, 2] as i}
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                {i === 0 ? m.primary_photo() : `${m.photo()} ${i + 1}`}
              </label>
              <div class="relative h-40 w-full bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center overflow-hidden group">
                {#if photoUrls[i]}
                  <img src={photoUrls[i]} alt="Preview" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <button 
                      type="button" 
                      onclick={() => photoUrls[i] = ''} 
                      class="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"
                    >
                      ✕
                    </button>
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
                  <div class="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
                  </div>
                {/if}
              </div>
              <input type="hidden" name="photo{i + 1}" value={photoUrls[i]} />
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Description -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{m.description()}</label>
        <textarea 
          name="description" 
          bind:value={description} 
          rows="4" 
          class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 outline-none resize-none"
        ></textarea>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex gap-4 pt-4">
        <button 
          type="submit" 
          class="flex-1 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 flex items-center justify-center gap-2"
        >
          <Save class="w-5 h-5" />
          {m.save_changes()}
        </button>
        <a 
          href={backLink} 
          class="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl text-center transition duration-300"
        >
          {m.cancel()}
        </a>
      </div>
      
    </form>
  </div>
</div>

