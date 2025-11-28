<!-- <script lang="ts">
    // The import path is now correct because ProductCard.svelte is assumed to be in src/lib/components
    import ProductCard from '$lib/components/ProductCard.svelte';
    import { goto } from '$app/navigation';
    
    // NOTE: This assumes you have a +page.server.ts file that returns the 'data' prop.
    // Since I cannot access your server file, I'm providing a dummy 'data' here for testing.
    let { data } = $props();

    // Mock Data structure for testing purposes
    if (typeof data === 'undefined') {
        data = {
            products: [
                { id: '1', name: 'Premium Mat', headline: 'Ultra-grip TPE', points: 1500, measure: '1 item', photo1: 'https://placehold.co/600x400/00A896/FFFFFF?text=Yoga+Mat' },
                { id: '2', name: 'Resistance Band Set', headline: '5 levels of resistance', points: 800, measure: 'Set of 5', photo1: 'https://placehold.co/600x400/C19A6B/FFFFFF?text=Resistance+Bands' },
                { id: '3', name: 'Meditation Cushion', headline: 'Organic Buckwheat hull filling', points: 2200, measure: '1 item', photo1: 'https://placehold.co/600x400/98C1D9/FFFFFF?text=Cushion' }
            ]
        };
    }
</script>

<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 transform transition duration-500 hover:shadow-3xl">

        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Product Catalog</h2>
        <button 
            onclick={() => goto('/products/new')} 
            class="bg-green-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-green-700 transition duration-150 ease-in-out font-medium text-sm"
        >
            + Add Product
        </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#if data.products && data.products.length > 0}
            {#each data.products as product (product.id)}
                <ProductCard {product} />
            {/each}
        {:else}
            <p class="col-span-full text-center text-gray-500 italic">No products available yet.</p>
        {/if}
    </div>
</div>
 -->