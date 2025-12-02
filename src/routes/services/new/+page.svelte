<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  
  export let form: ActionData;
</script>

<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
  <div class="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 transform transition duration-500 hover:shadow-3xl">
    <h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1">Create New Service</h1>
    <p class="text-center text-gray-500 mb-8">Add a new service</p>

    <!-- Display Server Message/Error -->
    {#if form?.message}
      <p class="text-sm bg-red-100 text-red-600 p-3 rounded-lg border border-red-300 mb-4 animate-pulse">
        {form.message}
      </p>
    {/if}

    <form method="POST" use:enhance class="space-y-6">
      <!-- service Name -->
      <div>
        <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
          Service Name <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter service name"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
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
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
        />
      </div>

      <!-- Points and Category Row -->
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
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-semibold text-gray-700 mb-2">
            Category <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="category"
            name="category"
            required
            placeholder="e.g., Electronics, Food"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <!-- Headline -->
      <div>
        <label for="headline" class="block text-sm font-semibold text-gray-700 mb-2">
          Headline
        </label>
        <input
          type="text"
          id="headline"
          name="headline"
          placeholder="Short catchy headline"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
        />
      </div>

      <!-- Photo URL -->
      <div>
        <label for="photo1" class="block text-sm font-semibold text-gray-700 mb-2">
          Photo URL
        </label>
        <input
          type="url"
          id="photo1"
          name="photo1"
          placeholder="https://example.com/image.jpg"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="Detailed service description..."
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div class="flex gap-4">
        <button
          type="submit"
          class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
        >
          Create service
        </button>
        <a
          href="/services"
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl shadow-lg transition duration-300 text-center"
        >
          Cancel
        </a>
      </div>
    </form>
  </div>
</div>
