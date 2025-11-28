<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
  
  let name = $state('');
  let measure = $state('');
  let points = $state(0);
  let category = $state(1);
  let photo1 = $state('');
  let description = $state('');
  let headline = $state('');
  let loading = $state(false);
  let error = $state('');
  
  async function createProduct() {
    if (!name || !measure || points <= 0) {
      error = 'Please fill in all required fields';
      return;
    }
    
    loading = true;
    error = '';
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          measure, 
          points, 
          category, 
          photo1, 
          description, 
          headline 
        })
      });
      
      if (response.ok) {
        await invalidateAll();
        goto('/products');
      } else {
        const result = await response.json();
        error = result.message || 'Failed to create product';
      }
    } catch (err) {
      console.error('Error creating product:', err);
      error = 'Network error. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
  <h2 class="text-2xl font-bold mb-6">Create Product</h2>
  
  {#if error}
    <div class="bg-red-100 text-red-700 p-3 rounded mb-4">
      {error}
    </div>
  {/if}
  
  <form onsubmit={(e) => { e.preventDefault(); createProduct(); }}>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Name *</label>
        <input bind:value={name} required class="w-full border rounded px-3 py-2" />
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Measure *</label>
          <input bind:value={measure} required class="w-full border rounded px-3 py-2" placeholder="pcs, kg, etc" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Points *</label>
          <input bind:value={points} type="number" step="0.01" min="0.01" required class="w-full border rounded px-3 py-2" />
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Category *</label>
        <select bind:value={category} class="w-full border rounded px-3 py-2">
          <option value={1}>Category 1</option>
          <option value={2}>Category 2</option>
          <option value={3}>Category 3</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Photo URL</label>
        <input bind:value={photo1} type="url" class="w-full border rounded px-3 py-2" placeholder="https://..." />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Headline</label>
        <input bind:value={headline} class="w-full border rounded px-3 py-2" placeholder="Short catchy description" />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea bind:value={description} class="w-full border rounded px-3 py-2" rows="4" placeholder="Detailed product description"></textarea>
      </div>
      
      <div class="flex gap-3">
        <button 
          type="submit" 
          disabled={loading}
          class="flex-1 bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
        <button 
          type="button"
          onclick={() => goto('/products')}
          class="px-6 py-3 border rounded font-semibold hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  </form>
</div>

