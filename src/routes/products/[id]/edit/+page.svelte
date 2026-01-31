<script lang="ts">
  import { ArrowLeft, Save, Pen, Image, DollarSign, Ruler, Tag } from 'lucide-svelte';
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import { m } from '$lib/paraglide/messages.js';

  export let data: PageData;
  const { product } = data;

  let name = product.name;
  let headline = product.headline || '';
  let description = product.description || '';
  let points = String(product.points);
  let measure = product.measure;
  let category = product.category;
  let photo1 = product.photo1 || '';
  let photo2 = product.photo2 || '';
  let photo3 = product.photo3 || '';
  let photo4 = product.photo4 || '';
  let photo5 = product.photo5 || '';
  let photo6 = product.photo6 || '';

  const categories = ['Tools', 'Skills', 'Goods', 'Time', 'Consulting'];
  const measures = ['hour', 'day', 'unit', 'job', 'm2', 'kg'];
</script>

<svelte:head>
  <title>Edit {product.name} - Circle App</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
  <div class="w-full max-w-3xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 transform transition duration-500 hover:shadow-3xl">
    
    <!-- Back Button -->
    <a 
      href="/products/{product.id}" 
      class="inline-flex items-center text-teal-600 hover:text-teal-800 transition mb-6 font-medium"
    >
      <ArrowLeft class="w-4 h-4 mr-1" />
      Back to Product Detail
    </a>

    <h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1">
      {m.edit()} {product.name}
    </h1>
    <p class="text-center text-gray-500 mb-8">Update your product details</p>

    <form method="POST" use:enhance class="space-y-8">
      
      <!-- Product Name -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Product Name <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          bind:value={name}
          required
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
        />
      </div>

      <!-- Headline -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Headline
        </label>
        <input
          type="text"
          name="headline"
          bind:value={headline}
          maxlength="100"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          <Pen class="w-4 h-4" />
          Description
        </label>
        <textarea
          name="description"
          bind:value={description}
          rows="4"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
        ></textarea>
      </div>

      <!-- Points + Category -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Points -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <DollarSign class="w-4 h-4"/>
            Points <span class="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            name="points"
            bind:value={points}
            required
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <Tag class="w-4 h-4"/>
            Category <span class="text-red-500">*</span>
          </label>
          <select
            name="category"
            bind:value={category}
            required
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          >
            {#each categories as c}
              <option value={c}>{c}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- Measure -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          <Ruler class="w-4 h-4" />
          Unit of Measure <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="measure"
          bind:value={measure}
          required
          maxlength="100"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
        />
      </div>

      <!-- Image Gallery -->
      <h2 class="text-lg font-bold text-teal-700 flex items-center gap-2 mt-6">
        <Image class="w-5 h-5" />
        Image Gallery URLs (Optional)
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Primary Photo URL</label>
          <input
            type="text"
            name="photo1"
            bind:value={photo1}
            placeholder="https://example.com/image.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Photo 2 URL</label>
          <input
            type="text"
            name="photo2"
            bind:value={photo2}
            placeholder="https://example.com/image.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Photo 3 URL</label>
          <input
            type="text"
            name="photo3"
            bind:value={photo3}
            placeholder="https://example.com/image.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Photo 4 URL</label>
          <input
            type="text"
            name="photo4"
            bind:value={photo4}
            placeholder="https://example.com/image.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Photo 5 URL</label>
          <input
            type="text"
            name="photo5"
            bind:value={photo5}
            placeholder="https://example.com/image.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Photo 6 URL</label>
          <input
            type="text"
            name="photo6"
            bind:value={photo6}
            placeholder="https://example.com/image.jpg"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex gap-4 pt-4">
        <button
          type="submit"
          class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Save class="w-5 h-5"/>
          {m.save_changes()}
        </button>

        <a
          href="/products/{product.id}"
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl shadow-lg text-center transition duration-300 flex items-center justify-center"
        >
          Cancel
        </a>
      </div>
    </form>

  </div>
</div>