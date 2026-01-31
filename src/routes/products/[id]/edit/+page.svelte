<script lang="ts">
  import { Save, Pencil, Megaphone, Sigma, ArrowLeft, Pen, Image, Tag, ChevronDown, Ruler } from 'lucide-svelte';
  import { enhance } from '$app/forms';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { m } from '$lib/paraglide/messages.js';

  // Import HS Code data and utilities
  import { 
    hsChapters, 
    hsSubcategories, 
    hsDetails, 
    getSubcategoriesForChapter, 
    getDetailsForSubcategory, 
    parseHSCode 
  } from '$lib/data/hsData';


  export let data: PageData;
  const { product } = data;

  // Form fields
  let name = product.name;
  let headline = product.headline || '';
  let description = product.description || '';
  let points = String(product.points);
  let measure = product.measure;
  let category = product.category || '';

    let photo1 = product.photo1 || '';
    let photo2 = product.photo2 || '';
    let photo3 = product.photo3 || '';
    let photo4 = product.photo4 || '';
    let photo5 = product.photo5 || '';
    let photo6 = product.photo6 || '';

  const measures = ['hour', 'day', 'unit', 'job', 'm2', 'kg', 'piece', 'meter', 'liter'];


  // Selection State
  let selectedChapter = '';
  let selectedSubcategory = '';
  let selectedDetail = '';


  onMount(() => {
    if (category) {
      const parsed = parseHSCode(category);
      
      if (parsed.chapter) selectedChapter = parsed.chapter;
      
      // We must check if the codes exist in our data before assigning
      // to prevent the dropdowns from showing empty selections
      if (parsed.subcategory && hsSubcategories[selectedChapter]?.[parsed.subcategory]) {
        selectedSubcategory = parsed.subcategory;
      }
      
      if (parsed.detail && hsDetails[selectedSubcategory]?.[parsed.detail]) {
        selectedDetail = parsed.detail;
      }
    }
  });


  // Reactive derived lists
  // $: availableSubcategories = selectedChapter 
  //   ? Object.entries(hsSubcategories[selectedChapter] || {}).map(([code, name]) => ({ code, name })) 
  //   : [];
  
  // $: availableDetails = selectedSubcategory 
  //   ? Object.entries(hsDetails[selectedSubcategory] || {}).map(([code, name]) => ({ code, name })) 
  //   : [];

  $: availableSubcategories = selectedChapter ? getSubcategoriesForChapter(selectedChapter) : [];
  $: availableDetails = selectedSubcategory ? getDetailsForSubcategory(selectedSubcategory) : [];

  // Update the final category value based on the deepest selection
  $: {
    if (selectedDetail) {
      category = selectedDetail;
    } else if (selectedSubcategory) {
      category = selectedSubcategory;
    } else {
      category = selectedChapter;
    }
  }


  function resetSubcategory() {
    selectedSubcategory = '';
    selectedDetail = '';
  }

  function resetDetail() {
    selectedDetail = '';
  }
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
            <select bind:value={selectedChapter} on:change={resetSubcategory} class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10">
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
              <select bind:value={selectedSubcategory} on:change={resetDetail} class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10">
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


            <!-- Image Gallery -->
            <h2 class="text-lg font-bold text-teal-700 flex items-center gap-2 mt-6">
                <Image class="w-5 h-5" /> Image Gallery URLs (Optional)
            </h2>



            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {#each [
                    { label: 'Primary Photo URL', name: 'photo1', bind: photo1 },
                    { label: 'Photo 2 URL', name: 'photo2', bind: photo2 },
                    { label: 'Photo 3 URL', name: 'photo3', bind: photo3 },
                    { label: 'Photo 4 URL', name: 'photo4', bind: photo4 },
                    { label: 'Photo 5 URL', name: 'photo5', bind: photo5 },
                    { label: 'Photo 6 URL', name: 'photo6', bind: photo6 }
                ] as field}
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                        <input
                            type="text"
                            name={field.name}
                            bind:value={field.bind}
                            placeholder="https://example.com/image.jpg"
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2
                            focus:ring-teal-500 focus:border-transparent transition"
                        />
                    </div>
                {/each}

            </div>


            <div class="flex gap-4 pt-4">
                <button
                    type="submit"
                    class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <Save class="w-5 h-5"/>{m.save_changes()}
                </button>

                <a
                    href="/products/{product.id}"
                    class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl shadow-lg text-center transition duration-300"
                >
                    Cancel
                </a>
            </div>

    </form>
  </div>
</div>




