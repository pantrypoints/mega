<script lang="ts">
    import { goto } from '$app/navigation';
    
    // Define the type for the product prop
    interface Product {
        id: string;
        name: string;
        headline?: string;
        points: number;
        measure: string;
        photo1?: string;
    }
    
    let { product } = $props<{ product: Product }>();
</script>

<!-- The entire card is a clickable button, now matching the new rounded, shadow, and border-top style -->
<button 
    onclick={() => goto(`/products/${product.id}`)} 
    class="block text-left w-full h-full 
           bg-white dark:bg-gray-800 
           rounded-3xl shadow-2xl border-t-4 border-teal-500 
           hover:shadow-xl hover:ring-4 hover:ring-teal-300/60 
           transform transition duration-500 ease-in-out 
           overflow-hidden group"
>
    {#if product.photo1}
        <!-- Image Section -->
        <div class="relative w-full h-48 overflow-hidden">
            <img 
                src={product.photo1} 
                alt={product.name} 
                class="w-full h-full object-cover 
                       transition-transform duration-500 
                       group-hover:scale-105"
            />
        </div>
    {/if}

    <!-- Content Section -->
    <div class="p-4 sm:p-5">
        <h3 class="font-bold text-xl text-gray-900 dark:text-white group-hover:text-teal-600 transition">
            {product.name}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {product.headline || 'No description provided.'}
        </p>

        <!-- Price/Points and Measure -->
        <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <span class="text-lg font-extrabold text-teal-600 dark:text-teal-400">
                {product.points} pts
            </span>
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {product.measure}
            </span>
        </div>
    </div>
</button>