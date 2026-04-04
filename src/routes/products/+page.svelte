<script lang="ts">
    import ResourceList from '$lib/components/List.svelte';
    import { m } from '$lib/paraglide/messages.js';
    import { hsChapters, hsSubcategories, hsDetails } from '$lib/data/hsData';

    let { data } = $props();

    /** Product-specific HS Code Description logic */
    function getHSDescription(code: string): string {
        if (!code) return 'Not Classified';
        const cleanCode = code.replace(/\D/g, '');
        const chapter = cleanCode.substring(0, 2);
        const subcategory = cleanCode.substring(0, 4);

        if (hsDetails[subcategory]?.[code]) return hsDetails[subcategory][code];
        if (hsSubcategories[chapter]?.[subcategory]) return hsSubcategories[chapter][subcategory];
        if (hsChapters[chapter]) return hsChapters[chapter];
        
        return 'Unknown Category';
    }
</script>

<svelte:head>
    <title>{m.products()} - Catalog</title>
</svelte:head>

<ResourceList 
    {...data} 
    basePath="/products" 
    title={m.products()} 
    createLabel={m.create_product()} 
    getDesc={getHSDescription} 
/>

