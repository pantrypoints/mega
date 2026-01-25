<script lang="ts">
  import type { PageData } from './$types';

  const { data } = $props<{ data: PageData }>();
  const { product } = data;
</script>


<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
  <div class="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500">

    <h1 class="text-3xl font-extrabold text-gray-800 mb-6">
      {m.product_edit()}
    </h1>

    <form method="POST" action="?/update" class="space-y-6">

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          {m.product_name()}
        </label>
        <input
          name="name"
          value={product.name}
          required
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          {m.headline()}
        </label>
        <input
          name="headline"
          value={product.headline}
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          {m.description()}
        </label>
        <textarea
          name="description"
          rows="4"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl"
        >
{product.description}</textarea>
      </div>

      <div class="flex gap-4">
        <button
          type="submit"
          class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg"
        >
          {m.save_changes()}
        </button>

        <a
          href={`/products/${product.id}`}
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl text-center"
        >
          {m.cancel()}
        </a>
      </div>

    </form>
  </div>
</div>
