<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  import { Save, Pencil, Megaphone, Sigma, ArrowLeft, Pen, Image, Tag, ChevronDown, Ruler } from 'lucide-svelte';
  import { naicsSectors, naicsSubsectors, naicsIndustries } from '$lib/data/naicsData';
  import * as m from '$lib/paraglide/messages';
  
  // Use $props() instead of export let
  let { 
    form,
    itemType = 'service',
    redirectUrl
  }: {
    form: ActionData;
    itemType: 'service' | 'request';
    redirectUrl: string;
  } = $props();
  
  // State for cascading selects
  let selectedSector = $state('');
  let selectedSubsector = $state('');
  let selectedIndustry = $state('');
  
  // Reactive derived lists
  let subsectorOptions = $derived(selectedSector ? Object.entries(naicsSubsectors[selectedSector] || {}) : []);
  let industryOptions = $derived(selectedSubsector ? Object.entries(naicsIndustries[selectedSubsector] || {}) : []);
  
  // Reset downstream selects when a parent changes
  function onSectorChange() {
    selectedSubsector = '';
    selectedIndustry = '';
  }
  
  function onSubsectorChange() {
    selectedIndustry = '';
  }


  // IMAGES
    import ImageKit from 'imagekit-javascript';
    import { PUBLIC_IMAGEKIT_URL_ENDPOINT, PUBLIC_IMAGEKIT_PUBLIC_KEY } from '$env/static/public';

    // Image States
    let photoUrls = $state(['', '', '']);
    let uploadingIndices = $state(new Set<number>());
    
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
                fileName: `prod_${Date.now()}_${index}`,
                ...authData
            });
            
            photoUrls[index] = result.url;
        } catch (err) {
            console.error(err);
        } finally {
            uploadingIndices.delete(index);
        }
    }


  // Get appropriate translation keys
  const title = $derived(itemType === 'service' ? m.create_new_service() : m.create_new_request());
  const description = $derived(itemType === 'service' ? m.description() : m.description());
  const createButton = $derived(itemType === 'service' ? m.create_service() : m.create_request());
  const backLink = $derived(itemType === 'service' ? '/services' : '/requests');
  const maxPhotos = $derived(itemType === 'request' ? 6 : 3);
</script>


<div class="min-h-screen bg-sky-50 dark:bg-black flex items-center justify-center p-4 transition-colors">
  <div class="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-600 transform transition duration-500 hover:shadow-3xl">
    
    <h1 class="text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-6">
      {title}
    </h1>
    <!-- <p class="text-center text-gray-500 dark:text-gray-400 mb-8">{description}</p> -->
    
    {#if form?.message}
      <p class="text-sm bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-300 dark:border-red-800 mb-4">
        {form.message}
      </p>
    {/if}
    
    <form method="POST" use:enhance class="space-y-6">
      
      <!-- Name -->
      <div>
        <label for="name" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {m.name()} <span class="text-red-500">*</span>
        </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          placeholder="Enter name" 
          class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition" 
        />
      </div>
      
      <!-- Points and Measure Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label for="points" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {m.points_value()} <span class="text-red-500">*</span>
          </label>
          <input 
            type="number" 
            id="points" 
            name="points" 
            step="0.01" 
            required 
            placeholder="0.00" 
            class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition" 
          />
        </div>
        <div>
          <label for="measure" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {m.measure()} <span class="text-red-500">*</span>
          </label>
          <input 
            type="text"
            id="measure" 
            name="measure" 
            required 
            placeholder="e.g., kg, pcs, hours" 
            class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition" 
          />
        </div>
      </div>
      
      <hr class="border-gray-100 dark:border-gray-800" />
      
      <!-- NAICS Category Selection -->
      <div class="space-y-4 bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-slate-100 dark:border-gray-700">
        <h3 class="text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
          {m.category_selection()} <span class="text-red-500">*</span>
        </h3>
        
        <!-- Step 1: Sector -->
        <div>
          <label for="sector" class="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase">
            Step 1: {m.sector()}
          </label>
          <select 
            id="sector" 
            bind:value={selectedSector} 
            onchange={onSectorChange} 
            required 
            class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 transition"
          >
            <option value="" disabled selected>Select a Sector</option>
            {#each Object.entries(naicsSectors) as [code, name]}
              <option value={code}>{name} ({code})</option>
            {/each}
          </select>
        </div>
        
        <!-- Step 2: Subsector -->
        {#if selectedSector}
          <div class="animate-in fade-in slide-in-from-top-2 duration-300">
            <label for="subsector" class="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase">
              Step 2: {m.subsector()}
            </label>
            <select 
              id="subsector" 
              bind:value={selectedSubsector} 
              onchange={onSubsectorChange} 
              class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 transition"
            >
              <option value="" disabled selected>Select a Subsector</option>
              {#each subsectorOptions as [code, name]}
                <option value={code}>{name} ({code})</option>
              {/each}
            </select>
          </div>
        {/if}
        
        <!-- Step 3: Industry - FIXED: Added hidden input -->
        {#if selectedSubsector}
          <div class="animate-in fade-in slide-in-from-top-2 duration-300">
            <label for="category_select" class="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase">
              Step 3: {m.industry()}
            </label>
            <select 
              id="category_select" 
              bind:value={selectedIndustry} 
              onchange={() => {
                // selectedIndustry is automatically updated
              }}
              class="w-full px-4 py-3 border-2 border-sky-300 dark:border-sky-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 transition"
            >
              <option value="" disabled selected>Select Industry</option>
              {#each industryOptions as [code, name]}
                <option value={code}>{name} ({code})</option>
              {/each}
            </select>
          </div>
        {/if}
        
        <!-- Hidden input to ensure category is always submitted -->
        <input type="hidden" name="category" value={selectedIndustry} />
      </div>
      
      <!-- Headline and Photo Row class="grid grid-cols-1 sm:grid-cols-2 gap-6" -->
      <div>
        <div>
          <label for="headline" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {m.headline()}
          </label>
          <input 
            type="text" 
            id="headline" 
            name="headline" 
            placeholder="Catchy title" 
            class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition" 
          />
        </div>
      </div>
      

      <div>
        <label for="description" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {m.description()}
        </label>
        <textarea 
          id="description" 
          name="description" 
          rows="3" 
          placeholder="Details..." 
          class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition resize-none"
        ></textarea>
      </div>


        <!-- Image Upload Section -->
        <div>
            <h2 class="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2 mb-4">
                <Image class="w-5 h-5" />
                {m.image_urls()}
            </h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {#each [0, 1, 2] as i}
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300">
                            {i === 0 ? 'Primary Photo' : `Photo ${i + 1}`}
                        </label>
                        
                        <div class="relative h-40 w-full bg-gray-100 dark:bg-slate-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden transition-colors">
                            {#if photoUrls[i]}
                                <img src={photoUrls[i]} alt="Preview" class="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onclick={() => photoUrls[i] = ''} 
                                    class="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600 transition"
                                >
                                    ✕
                                </button>
                            {:else}
                                <Image class="w-8 h-8 text-gray-400 dark:text-slate-500" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onchange={(e) => uploadPhoto(e, i)} 
                                    class="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            {/if}
                            
                            {#if uploadingIndices.has(i)}
                                <div class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center">
                                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
                                </div>
                            {/if}
                        </div>
                        
                        <!-- Hidden inputs for form submission -->
                        <input type="hidden" name="photo{i + 1}" value={photoUrls[i]} />
                    </div>
                {/each}
            </div>
        </div>


      <!-- Action Buttons -->
      <div class="flex gap-4 pt-4">
        <button 
          type="submit" 
          class="flex-1 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg transition duration-300 transform hover:scale-[1.02] active:scale-95"
        >
          {createButton}
        </button>
        <a 
          href={backLink} 
          class="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold py-4 rounded-2xl transition text-center"
        >
          {m.cancel()}
        </a>
      </div>
      
    </form>
  </div>
</div>

<style>
  .animate-in {
    animation: fadeIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

