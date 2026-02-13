<!-- from gemini jundalisay ata -->

<script lang="ts">
  import { enhance } from '$app/forms';
  import { 
    Save, Pencil, Megaphone, Sigma, ArrowLeft, 
    Pen, Image, Tag, ChevronDown, Ruler 
  } from 'lucide-svelte';
  import type { ActionData } from './$types';
  import { m } from '$lib/paraglide/messages.js';
  
  // Import the same HS Code data and utilities as the edit page
  import { 
    getSortedChaptersList, // <--- Import the new helper
    hsChapters, 
    getSubcategoriesForChapter, 
    getDetailsForSubcategory 
  } from '$lib/data/hsData';

  // --- Form State (Runes) ---
  let name = $state("");
  let headline = $state("");
  let description = $state("");
  let points = $state("");
  let measure = $state("");
  let photo1 = $state("");
  let photo2 = $state("");
  let photo3 = $state("");
  let photo4 = $state("");
  let photo5 = $state("");
  let photo6 = $state("");

  // --- HS Selection State ---
  let selectedChapter = $state('');
  let selectedSubcategory = $state('');
  let selectedDetail = $state('');

  // Generate the sorted list once
  const sortedChapters = getSortedChaptersList();

  // --- Derived Logic ---
  const availableSubcategories = $derived(selectedChapter ? getSubcategoriesForChapter(selectedChapter) : []);
  const availableDetails = $derived(selectedSubcategory ? getDetailsForSubcategory(selectedSubcategory) : []);

  // The final category value submitted to the database
  const category = $derived.by(() => {
    if (selectedDetail) return selectedDetail;
    if (selectedSubcategory) return selectedSubcategory;
    return selectedChapter;
  });

  // --- Reset Functions ---
  function handleChapterChange() {
    selectedSubcategory = '';
    selectedDetail = '';
  }

  function handleSubcategoryChange() {
    selectedDetail = '';
  }

  // Props
  let { form } = $props<{ form: ActionData }>();
</script>

<svelte:head>
  <title>Create New Wish</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
  <div class="w-full max-w-3xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500">
    
    <a href="/products" class="inline-flex items-center text-sky-600 hover:text-sky-800 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" />{m.back_to_wishes()}
    </a>

    <h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1">{m.create_wish()}</h1>
    <!-- <p class="text-center text-gray-500 mb-8">Add a new product to the catalog</p> -->

    {#if form?.message}
      <p class="text-sm bg-red-100 text-red-600 p-3 rounded-lg border border-red-300 mb-4 animate-pulse">
        {form.message}
      </p>
    {/if}

    <form method="POST" use:enhance class="space-y-8">
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="initial" value={initial} />

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="name">
          <Pencil class="w-4 h-4" />{m.wish_name()}<span class="text-red-500">*</span>
        </label>
        <input type="text" id="name" name="name" bind:value={name} required placeholder="{m.enter_name()}"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="headline">
          <Megaphone class="w-4 h-4" />{m.headline()}
        </label>
        <input type="text" id="headline" name="headline" bind:value={headline} maxlength="100" placeholder="{m.short_headline()}"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="description">
          <Pen class="w-4 h-4" />{m.description()}
        </label>
        <textarea id="description" name="description" bind:value={description} rows="4" placeholder="{m.add_details()}"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition resize-none"></textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="points">
            <Sigma class="w-4 h-4"/> {m.points()} <span class="text-red-500">*</span>
          </label>
          <input type="number" step="0.01" id="points" name="points" bind:value={points} required placeholder="0.00"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="measure">
            <Ruler class="w-4 h-4" />{m.measure()} <span class="text-red-500">*</span>
          </label>
          <input type="text" id="measure" name="measure" bind:value={measure} required placeholder="{m.measure_example()}"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>
      </div>

      <div class="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
        <label class="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-1">
          <Tag class="w-4 h-4"/>{m.category()} (HS Code)
        </label>

        <div class="mb-6 p-4 bg-white rounded-xl border border-sky-200 shadow-sm">
          <div class="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">{m.selected_code()}</div>
          <div class="text-xl font-mono font-bold text-gray-900">{category || '---'}</div>
          {#if selectedChapter}
            <p class="text-sm text-gray-500 mt-1 italic">
              {hsChapters[selectedChapter]}
            </p>
          {/if}
        </div>


        <div class="mb-6">
          <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Chapter</label>
          <div class="relative">
            <select bind:value={selectedChapter} onchange={handleChapterChange}
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10">
                <option value="">-- {m.select_chapter()} --</option>
                
                {#each sortedChapters as { code, name }}
                    <option value={code}>{code} - {name}</option>
                {/each}
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {#if selectedChapter}
          <div class="my-6">
            <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Subcategory</label>
            <div class="relative">
              <select bind:value={selectedSubcategory} onchange={handleSubcategoryChange}
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10">
                <option value="">-- {m.select_subcat()} --</option>
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
              <select bind:value={selectedDetail}
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10">
                <option value="">-- {m.select_detail()} --</option>
                {#each availableDetails as item}
                  <option value={item.code}>{item.code} - {item.name}</option>
                {/each}
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        {/if}
      </div>
    </div>


      <h2 class="text-lg font-bold text-teal-700 flex items-center gap-2 my-6">
        <Image class="w-5 h-5" />{m.image_urls()} {m.optional()}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{m.photo_url()} Primary</label>
          <input type="text" name="photo1" bind:value={photo1} placeholder="https://example.com/image1.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 transition" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{m.photo_url()} 2</label>
          <input type="text" name="photo2" bind:value={photo2} placeholder="https://example.com/image2.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 transition" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{m.photo_url()} 3</label>
          <input type="text" name="photo3" bind:value={photo3} placeholder="https://example.com/image3.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 transition" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{m.photo_url()} 4</label>
          <input type="text" name="photo4" bind:value={photo4} placeholder="https://example.com/image4.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 transition" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{m.photo_url()} 5</label>
          <input type="text" name="photo5" bind:value={photo5} placeholder="https://example.com/image5.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 transition" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">{m.photo_url()} 6</label>
          <input type="text" name="photo6" bind:value={photo6} placeholder="https://example.com/image6.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 transition" />
        </div>
      </div>

      <div class="flex gap-4 mt-6">
        <button type="submit" class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
          <Save class="w-5 h-5"/>{m.create_wish()}
        </button>
        <a href="/products" class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl shadow-lg text-center transition duration-300 flex items-center justify-center">
          {m.cancel()}
        </a>
      </div>

    </form>
  </div>
</div>

