<script lang="ts">
  import CreateItem from '$lib/components/Servicecreate.svelte';
  import type { ActionData } from './$types';
  
  let form: ActionData;
</script>


<CreateItem 
  form={form}
  itemType="service"
  redirectUrl="/services"/>


<!-- <script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  import { 
    naicsSectors, 
    naicsSubsectors, 
    naicsIndustries, 
    getSectorKey 
  } from '$lib/data/naicsData';
  import { m } from '$lib/paraglide/messages.js';

  export let form: ActionData;

  // State for cascading selects
  let selectedSector = '';
  let selectedSubsector = '';
  let selectedIndustry = '';

  // Reactive derived lists
  $: subsectorOptions = selectedSector ? Object.entries(naicsSubsectors[selectedSector] || {}) : [];
  $: industryOptions = selectedSubsector ? Object.entries(naicsIndustries[selectedSubsector] || {}) : [];

  // Reset downstream selects when a parent changes
  function onSectorChange() {
    selectedSubsector = '';
    selectedIndustry = '';
  }

  function onSubsectorChange() {
    selectedIndustry = '';
  }
</script> -->



<!-- <div class="min-h-screen bg-sky-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors">
  <div class="w-full max-w-2xl bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 transform transition duration-500 hover:shadow-3xl">
    <h1 class="text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-1">
      {m.create_new_request()}
    </h1>
    <p class="text-center text-gray-500 dark:text-slate-400 mb-8">{m.add_new_request_desc()}</p>

    {#if form?.message}
      <p class="text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-300 dark:border-red-800 mb-4 animate-pulse">
        {form.message}
      </p>
    {/if}

    <form method="POST" use:enhance class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
          {m.name()} <span class="text-red-500">*</span>
        </label>
        <input type="text" id="name" name="name" required placeholder="Enter name" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label for="points" class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
            {m.points_value()} <span class="text-red-500">*</span>
          </label>
          <input type="number" id="points" name="points" step="0.01" required placeholder="0.00" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition" />
        </div>
        <div>
          <label for="measure" class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
            {m.measure()} <span class="text-red-500">*</span>
          </label>
          <input type="text" id="measure" name="measure" required placeholder="e.g., kg, pcs" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition" />
        </div>
      </div>

      <hr class="border-gray-100 dark:border-slate-800" />

      <div class="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
        <h3 class="text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">{m.category_selection()}</h3>
        
        <div>
          <label for="sector" class="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-1 uppercase">Step 1: Sector</label>
          <select 
            id="sector" 
            bind:value={selectedSector} 
            on:change={onSectorChange}
            required
            class="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 transition"
          >
            <option value="" disabled selected>Select a Sector</option>
            {#each Object.entries(naicsSectors) as [code, name]}
              <option value={code}>{name} ({code})</option>
            {/each}
          </select>
        </div>

        {#if selectedSector}
          <div class="animate-in fade-in slide-in-from-top-2 duration-300">
            <label for="subsector" class="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-1 uppercase">Step 2: Subsector</label>
            <select 
              id="subsector" 
              bind:value={selectedSubsector} 
              on:change={onSubsectorChange}
              required
              class="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 transition"
            >
              <option value="" disabled selected>Select a Subsector</option>
              {#each subsectorOptions as [code, name]}
                <option value={code}>{name} ({code})</option>
              {/each}
            </select>
          </div>
        {/if}

        {#if selectedSubsector}
          <div class="animate-in fade-in slide-in-from-top-2 duration-300">
            <label for="category" class="block text-xs font-bold text-gray-500 dark:text-slate-400 mb-1 uppercase">Step 3: Specific Industry</label>
            <select 
              id="category" 
              name="category" 
              bind:value={selectedIndustry}
              required
              class="w-full px-4 py-3 border-2 border-sky-300 dark:border-sky-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 transition"
            >
              <option value="" disabled selected>Select Industry</option>
              {#each industryOptions as [code, name]}
                <option value={code}>{name}</option>
              {/each}
            </select>
          </div>
        {/if}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label for="headline" class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Headline</label>
          <input type="text" id="headline" name="headline" placeholder="Catchy title" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition" />
        </div>
        <div>
          <label for="photo1" class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Photo URL</label>
          <input type="url" id="photo1" name="photo1" placeholder="https://..." class="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition" />
        </div>
      </div>

      <div>
        <label for="description" class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Description</label>
        <textarea id="description" name="description" rows="3" placeholder="Details..." class="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 outline-none transition resize-none"></textarea>
      </div>

      <div class="flex gap-4 pt-4">
        <button type="submit" class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-2xl shadow-lg transition duration-300 transform hover:scale-[1.02] active:scale-95">
          {m.create_request()}
        </button>
        <a href="/requests" class="flex-1 bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 font-bold py-4 rounded-2xl transition text-center">
          {m.cancel()}
        </a>
      </div>
    </form>
  </div>
</div>

 -->