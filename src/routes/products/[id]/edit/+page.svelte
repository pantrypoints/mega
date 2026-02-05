<script lang="ts">
  import { Save, Pencil, Megaphone, Sigma, ArrowLeft, Pen, Image, Tag, ChevronDown, Ruler } from 'lucide-svelte';
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { m } from '$lib/paraglide/messages.js';
  import { hsChapters, hsSubcategories, hsDetails, getSubcategoriesForChapter, getDetailsForSubcategory, parseHSCode } from '$lib/data/hsData';
  import ImageKit from 'imagekit-javascript';
  import { PUBLIC_IMAGEKIT_URL_ENDPOINT, PUBLIC_IMAGEKIT_PUBLIC_KEY } from '$env/static/public';

  // Props in Svelte 5
  let { data }: { data: PageData } = $props();
  const { product } = data;

  // State Management
  let photoUrls = $state([product.photo1 || '', product.photo2 || '', product.photo3 || '']);
  let uploadingIndices = $state(new Set<number>());
  
  let name = $state(product.name);
  let headline = $state(product.headline || '');
  let description = $state(product.description || '');
  let points = $state(String(product.points));
  let measure = $state(product.measure);

  // HS Selection State
  let selectedChapter = $state('');
  let selectedSubcategory = $state('');
  let selectedDetail = $state('');

  const ik = new ImageKit({
    urlEndpoint: PUBLIC_IMAGEKIT_URL_ENDPOINT,
    publicKey: PUBLIC_IMAGEKIT_PUBLIC_KEY,
  });

  onMount(() => {
    const initialCategory = product.category || '';
    if (initialCategory) {
      const parsed = parseHSCode(initialCategory);
      if (parsed.chapter) selectedChapter = parsed.chapter;
      if (parsed.subcategory && hsSubcategories[selectedChapter]?.[parsed.subcategory]) {
        selectedSubcategory = parsed.subcategory;
      }
      if (parsed.detail && hsDetails[selectedSubcategory]?.[parsed.detail]) {
        selectedDetail = parsed.detail;
      }
    }
  });

  // Runes-based Derived State
  const availableSubcategories = $derived(selectedChapter ? getSubcategoriesForChapter(selectedChapter) : []);
  const availableDetails = $derived(selectedSubcategory ? getDetailsForSubcategory(selectedSubcategory) : []);
  const category = $derived.by(() => {
    if (selectedDetail) return selectedDetail;
    if (selectedSubcategory) return selectedSubcategory;
    return selectedChapter;
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

  function resetSubcategory() { selectedSubcategory = ''; selectedDetail = ''; }
  function resetDetail() { selectedDetail = ''; }
</script>


<svelte:head>
  <title>Edit {product.name} - Circle App</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
  <div class="w-full max-w-3xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500">
    
    <a href="/products/{product.id}" class="inline-flex items-center text-sky-600 hover:text-sky-800 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" /> Back to Product Detail
    </a>

    <h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1">
      {m.edit()} {product.name}
    </h1>
    <p class="text-center text-gray-500 mb-8">Update your product details</p>

    <form method="POST" use:enhance class="space-y-8">
      <input type="hidden" name="category" value={category} />

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="name">
          <Pencil class="w-4 h-4" /> Product Name <span class="text-red-500">*</span>
        </label>
        <input type="text" id="name" name="name" bind:value={name} required class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="headline">
          <Megaphone class="w-4 h-4" /> Headline
        </label>
        <input type="text" id="headline" name="headline" bind:value={headline} maxlength="100" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="description">
          <Pen class="w-4 h-4" /> Description
        </label>
        <textarea id="description" name="description" bind:value={description} rows="4" class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition resize-none"></textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="points">
            <Sigma class="w-4 h-4"/> Points <span class="text-red-500">*</span>
          </label>
          <input type="number" step="0.01" id="points" name="points" bind:value={points} required class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="measure">
            <Ruler class="w-4 h-4" /> Unit of Measure <span class="text-red-500">*</span>
          </label>
          <input type="text" id="measure" name="measure" bind:value={measure} required class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>
      </div>

      <div class="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
        <label class="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-1">
          <Tag class="w-4 h-4"/> Category (HS Code)
        </label>

        <div class="mb-6 p-4 bg-white rounded-xl border border-sky-200 shadow-sm">
          <div class="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">Active Code</div>
          <div class="text-xl font-mono font-bold text-gray-900">{category || '---'}</div>
          {#if selectedChapter}
            <p class="text-sm text-gray-500 mt-1 italic">
              {hsChapters[selectedChapter]} 
              {selectedSubcategory ? ' > ' + hsSubcategories[selectedChapter][selectedSubcategory] : ''}
            </p>
          {/if}
        </div>



        <div class="mb-4">
          <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Chapter</label>
          <div class="relative">
            <select bind:value={selectedChapter} onchange={resetSubcategory} class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10">
              <option value="">-- Select Chapter --</option>
              {#each Object.entries(hsChapters) as [code, label]}
                <option value={code}>{code} - {label}</option>
              {/each}
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {#if selectedChapter}
          <div class="mb-4">
            <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Subcategory</label>
            <div class="relative">
              <select bind:value={selectedSubcategory} onchange={resetDetail} class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10">
                <option value="">-- Select Subcategory --</option>
                {#each availableSubcategories as item}
                  <option value={item.code}>{item.code} - {item.name}</option>
                {/each}
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        {/if}

        {#if selectedSubcategory && availableDetails.length > 0}
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Specific Item</label>
            <div class="relative">
              <select bind:value={selectedDetail} class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10">
                <option value="">-- Select Specific Detail --</option>
                {#each availableDetails as item}
                  <option value={item.code}>{item.code} - {item.name}</option>
                {/each}
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        {/if}
      </div>


<h2 class="text-lg font-bold text-teal-700 flex items-center gap-2 mt-6">
  <Image class="w-5 h-5" /> Product Gallery (Max 500KB per image)
</h2>

<div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

              <button type="submit" disabled={uploadingIndices.size > 0} class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <Save class="w-5 h-5"/> {uploadingIndices.size > 0 ? 'Uploading...' : m.save_changes()}
              </button>

                <a href="/products/{product.id}"
                    class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl shadow-lg text-center transition duration-300">
                    Cancel
                </a>
            </div>

    </form>
  </div>
</div>




