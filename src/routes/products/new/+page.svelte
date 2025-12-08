<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  import hsData from '$lib/data/hs.json';

  // primitive state
  let sectionCode = $state("");
  let chapterCode = $state("");
  let headingCode = $state("");
  let subheadingCode = $state("");

  // derived objects
  const selectedSection = $derived(
    hsData.find((s) => s.section === sectionCode)
  );

  const selectedChapter = $derived(
    selectedSection?.chapters?.find((c) => c.chapter === chapterCode)
  );

  const selectedHeading = $derived(
    selectedChapter?.headings?.find((h) => h.heading === headingCode)
  );

  const selectedSubheading = $derived(
    selectedHeading?.subheadings?.find((sh) => sh.code === subheadingCode)
  );

  // cascade reset effects
  $effect(() => {
    if (!sectionCode) {
      chapterCode = "";
      headingCode = "";
      subheadingCode = "";
    }
  });

  $effect(() => {
    if (!chapterCode) {
      headingCode = "";
      subheadingCode = "";
    }
  });

  $effect(() => {
    if (!headingCode) {
      subheadingCode = "";
    }
  });

  // final hs code
  const hsCode = $derived(selectedSubheading?.code ?? "");

  // form prop
  const { form } = $props<{ form: ActionData }>();
</script>






<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
  <div class="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500">

    <h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1">Create New Product</h1>
    <p class="text-center text-gray-500 mb-8">Add a new product to the catalog</p>

    {#if form?.message}
      <p class="text-sm bg-red-100 text-red-600 p-3 rounded-lg border border-red-300 mb-4 animate-pulse">
        {form.message}
      </p>
    {/if}

    <form method="POST" use:enhance class="space-y-6">

      <!-- Product Name -->
      <div>
        <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
          Product Name <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter product name"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <!-- Measure -->
      <div>
        <label for="measure" class="block text-sm font-semibold text-gray-700 mb-2">
          Unit of Measure <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="measure"
          name="measure"
          required
          placeholder="e.g., kg, pcs, liters"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <!-- Points + HS Code -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <!-- Points -->
        <div>
          <label for="points" class="block text-sm font-semibold text-gray-700 mb-2">
            Points <span class="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="points"
            name="points"
            step="0.01"
            required
            placeholder="0.00"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <!-- HS Code Dropdowns -->
        <div class="space-y-3">
          <label class="block text-sm font-semibold text-gray-700">
            HS Classification <span class="text-red-500">*</span>
          </label>


<!-- Section -->
<select bind:value={sectionCode} class="w-full border p-2 rounded-lg">
  <option value="">Select Section</option>
  {#each hsData as section}
    <option value={section.section}>
      {section.section} — {section.title}
    </option>
  {/each}
</select>

<!-- Chapter -->
{#if selectedSection}
  <select bind:value={chapterCode} class="w-full border p-2 rounded-lg">
    <option value="">Select Chapter</option>
    {#each selectedSection.chapters as chapter}
      <option value={chapter.chapter}>
        {chapter.chapter} — {chapter.title}
      </option>
    {/each}
  </select>
{/if}

<!-- Heading -->
{#if selectedChapter}
  <select bind:value={headingCode} class="w-full border p-2 rounded-lg">
    <option value="">Select Heading</option>
    {#each selectedChapter.headings as heading}
      <option value={heading.heading}>
        {heading.heading} — {heading.title}
      </option>
    {/each}
  </select>
{/if}

<!-- Subheading -->
{#if selectedHeading}
  <select bind:value={subheadingCode} class="w-full border p-2 rounded-lg">
    <option value="">Select Subheading</option>
    {#each selectedHeading.subheadings as sub}
      <option value={sub.code}>
        {sub.code} — {sub.title}
      </option>
    {/each}
  </select>
{/if}

<input type="hidden" name="category" value={hsCode} />


        </div>

      </div>

      <!-- Headline -->
      <div>
        <label for="headline" class="block text-sm font-semibold text-gray-700 mb-2">Headline</label>
        <input
          type="text"
          id="headline"
          name="headline"
          placeholder="Short catchy headline"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <!-- Photo URL -->
      <div>
        <label for="photo1" class="block text-sm font-semibold text-gray-700 mb-2">Photo URL</label>
        <input
          type="url"
          id="photo1"
          name="photo1"
          placeholder="https://example.com/image.jpg"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="Detailed product description..."
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 resize-none"
        ></textarea>
      </div>

      <!-- Submit -->
      <div class="flex gap-4">
        <button
          type="submit"
          class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Create Product
        </button>

        <a
          href="/products"
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl shadow-lg text-center transition"
        >
          Cancel
        </a>
      </div>

    </form>
  </div>
</div>
