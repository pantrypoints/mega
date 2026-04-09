<script lang="ts">
import { ArrowLeft, Star, Tag, Ruler, Handshake, Edit, Trash2, Package } from 'lucide-svelte';
import { m } from '$lib/paraglide/messages.js';
import { scale } from 'svelte/transition';
import { enhance } from '$app/forms';

let { 
    item, 
    isOwner, 
    owner, 
    currentUserId, 
    itemType, 
    backLink, 
    editLink, 
    deleteAction, 
    getDescription = null, 
    buildTransactionParams = null 
}: {
    item: any; 
    isOwner: boolean; 
    owner: any; 
    currentUserId: string; 
    itemType: 'product' | 'wish' | 'service' | 'request'; 
    backLink: string; 
    editLink: string; 
    deleteAction: string; 
    getDescription?: ((code: string) => string) | null; 
    buildTransactionParams?: ((item: any) => URLSearchParams) | null;
} = $props();

// Image Gallery State
let currentPhoto = $state(item.photos?.[0] || '/blank.jpg');
function handleThumbnailClick(url: string) {
    currentPhoto = url;
}

// Amount Modal State
let isAmountModalOpen = $state(false);
let newAmount = $state(item.amount || 0);

function closeAmountModal() {
    isAmountModalOpen = false;
    newAmount = item.amount || 0; // reset on close
}

// Transaction params builder
function defaultBuildTransactionParams(item: any): URLSearchParams {
    const params = new URLSearchParams();
    params.set('initial', itemType === 'wish' ? 'w' : 'p');
    params.set('name', item.name);
    params.set('points', String(item.points));
    params.set('measure', item.measure || '');
    params.set('category', item.category);
    params.set('photo', item.photos?.[0] || '');
    params.set('giverId', item.userId);
    return params;
}

const transactionParams = (buildTransactionParams || defaultBuildTransactionParams)(item);
const transactionHref = `/transactions/new?${transactionParams.toString()}`;

const labels = {
    product: { back: m.back_to_products(), type: 'Product', typeLower: 'product', action: m.barter_do() },
    wish: { back: m.back_to_wishes(), type: 'Wish', typeLower: 'wish', action: m.barter_do() },
    service: { back: m.back_to_services(), type: 'Service', typeLower: 'service', action: m.barter_do() },
    request: { back: m.back_to_requests(), type: 'Request', typeLower: 'request', action: m.barter_do() }
}[itemType] || { back: 'Back', type: 'Item', typeLower: 'item', action: 'Exchange' };

// Format date for the UI
const lastUpdated = item.dateAmountChange 
    ? new Date(item.dateAmountChange).toLocaleDateString() 
    : 'Never';
</script>

<svelte:head>
    <title>{item.name} - Circle App</title>
</svelte:head>

{#if isAmountModalOpen}
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-all duration-300" onclick={closeAmountModal}>
    <div class="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6" onclick={(e) => e.stopPropagation()}>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-2">Update Inventory Amount</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Enter the current available stock for {item.name}.</p>
        
        <form method="POST" action="?/updateAmount" use:enhance={() => {
            return async ({ update }) => {
                await update();
                closeAmountModal();
            };
        }}>
            <input type="hidden" name="productId" value={item.id} />
            
            <div class="mb-6">
                <label class="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">
                    Available Amount
                </label>
                <input 
                    type="number" 
                    name="amount" 
                    step="0.01"
                    bind:value={newAmount} 
                    required 
                    class="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg font-semibold"
                />
            </div>

            <div class="flex gap-3">
                <button type="submit" class="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl transition duration-200">
                    Save
                </button>
                <button type="button" onclick={closeAmountModal} class="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-2.5 rounded-xl transition duration-200">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</div>
{/if}



<div class="min-h-screen bg-sky-50 dark:bg-slate-950 flex flex-col items-center p-4 sm:p-8 transition-colors">
    <div class="w-full max-w-4xl bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-600">
        
        <a href={backLink} class="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-teal-800 dark:hover:text-teal-300 transition mb-6 font-medium">
            <ArrowLeft class="w-4 h-4 mr-1" /> {labels.back}
        </a>

        <div class="flex items-start justify-between gap-4 mb-2">
            <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white">{item.name}</h1>
            
            {#if isOwner}
                <div class="flex space-x-3 mt-1">
                    <a href={editLink} class="flex items-center justify-center p-2 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-full shadow-md hover:bg-sky-200 transition">
                        <Edit class="w-5 h-5" />
                    </a>
                    <form method="POST" action={deleteAction} onsubmit={() => confirm(`Delete this ${labels.typeLower}?`)} use:enhance>
                        <button type="submit" class="flex items-center justify-center p-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full shadow-md hover:bg-red-200 transition">
                            <Trash2 class="w-5 h-5" />
                        </button>
                    </form>
                </div>
            {/if}
        </div>

        <p class="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-8">{item.headline}</p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div class="space-y-4">
                <div class="relative w-full h-96 bg-gray-100 dark:bg-slate-800 rounded-2xl overflow-hidden mb-4 shadow-inner">
                    {#key currentPhoto}
                        <img in:scale={{ duration: 300, start: 0.95, opacity: 0 }} src={currentPhoto} alt="Selected" class="w-full h-full object-contain"/>
                    {/key}
                </div>
                {#if item.photos && item.photos.length > 0}
                    <div class="flex gap-3 justify-center">
                        {#each item.photos as photo, i (i)}
                            <button onclick={() => handleThumbnailClick(photo)} class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 {photo === currentPhoto ? 'border-teal-500 scale-110' : 'border-transparent opacity-60'}">
                                <img src={photo} alt="Thumb {i}" class="w-full h-full object-cover" />
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>

            <div class="space-y-6">
                <div class="space-y-3 p-5 bg-sky-50 dark:bg-sky-950/30 rounded-2xl border-l-4 border-sky-400 dark:border-sky-600">
                    
                    {#if itemType === 'product'}
                        <div class="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm mb-4 border border-sky-100 dark:border-slate-700">
                            <div>
                                <div class="flex items-center text-gray-800 dark:text-slate-200">
                                    <Package class="w-4 h-4 mr-2 text-teal-600 dark:text-teal-400" />
                                    <span class="font-bold text-lg">Available:</span>
                                    <span class="ml-2 text-2xl font-extrabold text-teal-600 dark:text-teal-400">
                                        {item.amount || 0}
                                    </span>
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                                    Last updated: {lastUpdated}
                                </div>
                            </div>
                            
                            {#if isOwner}
                                <button onclick={() => isAmountModalOpen = true} class="p-2 text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 bg-sky-50 hover:bg-sky-100 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition">
                                    <Edit class="w-4 h-4" />
                                </button>
                            {/if}
                        </div>
                    {/if}

                    <div class="flex items-center text-gray-800 dark:text-slate-200">
                        <span class="font-bold text-lg">{m.points_value()}:</span>
                        <span class="ml-2 text-2xl font-extrabold text-sky-700">{item.points.toFixed(0)}</span>
                    </div>

                    {#if item.measure}
                        <div class="flex items-center text-gray-600 dark:text-slate-400">
                            <Ruler class="w-4 h-4 mr-2" />
                            <span class="font-semibold">{m.measure()}:</span>
                            <span class="ml-2">{item.measure}</span>
                        </div>
                    {/if}

                    <div class="flex items-center text-gray-600 dark:text-slate-400">
                        <Tag class="w-4 h-4 mr-2" />
                        <span class="font-semibold">{m.category()}:</span>
                        <span class="ml-2">{getDescription ? getDescription(item.category) : item.category}</span>
                    </div>

                    <div class="flex items-center text-gray-600 dark:text-slate-400">
                        <span class="font-semibold">{m.seller()}:</span>
                        <a href={`/users/${owner.slug}`} class="flex items-center ml-2 hover:bg-sky-50 p-1 rounded-lg">
                            <img src={owner.avatar} alt="Avatar" class="w-8 h-8 rounded-full object-cover" />
                            <span class="ml-2 text-sm truncate hover:text-sky-600">{owner.username}</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-2 p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border-t border-gray-100">
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-3 border-b pb-2">
                    {m.description()}
                </h3>
                <p class="text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {item.description || `No detailed description provided.`}
                </p>
            </div>
        </div>

        <div class="mt-10">
            {#if isOwner}
                <a href={transactionHref} class="w-full bg-teal-600 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:bg-teal-700 flex items-center justify-center gap-2">
                    <Handshake class="w-5 h-5" /> {labels.action}
                </a>
            {:else}
                <div class="w-full text-center py-3 rounded-2xl font-bold text-lg bg-red-100 text-red-600">
                    {m.to_avail()}
                </div>
            {/if}
        </div>
    </div>
</div>


<!-- <script lang="ts">
    import { ArrowLeft, Star, Tag, Ruler, Handshake, Edit, Trash2 } from 'lucide-svelte';
    import { m } from '$lib/paraglide/messages.js';
    import { scale } from 'svelte/transition';
    import { enhance } from '$app/forms';

    // Use $props() instead of export let
    let { 
        item, 
        isOwner, 
        owner, 
        currentUserId, 
        itemType, 
        backLink, 
        editLink, 
        deleteAction,
        getDescription = null,
        buildTransactionParams = null
    }: {
        item: any;
        isOwner: boolean;
        owner: any;
        currentUserId: string;
        itemType: 'product' | 'wish' | 'service' | 'request';
        backLink: string;
        editLink: string;
        deleteAction: string;
        getDescription?: ((code: string) => string) | null;
        buildTransactionParams?: ((item: any) => URLSearchParams) | null;
    } = $props();
    
    // State for image gallery
    let currentPhoto = $state(item.photos?.[0] || '/blank.jpg');
    
    function handleThumbnailClick(url: string) {
        currentPhoto = url;
    }
    
    // Default transaction parameters builder
    function defaultBuildTransactionParams(item: any): URLSearchParams {
        const params = new URLSearchParams();
        params.set('initial', itemType === 'wish' ? 'w' : 'p');
        params.set('name', item.name);
        params.set('points', String(item.points));
        params.set('measure', item.measure || '');
        params.set('category', item.category);
        params.set('photo', item.photos?.[0] || '');
        params.set('giverId', item.userId);
        return params;
    }
    
    // Use custom or default transaction builder
    const transactionParams = (buildTransactionParams || defaultBuildTransactionParams)(item);
    const transactionHref = `/transactions/new?${transactionParams.toString()}`;
    
    // Labels based on item type
    const labels = {
        product: {
            back: m.back_to_products(),
            type: 'Product',
            typeLower: 'product',
            action: m.barter_do()
        },
        wish: {
            back: m.back_to_wishes(),
            type: 'Wish',
            typeLower: 'wish',
            action: m.barter_do()
            // action: m.fulfill_wish()
        },
        service: {
            back: m.back_to_services(),
            type: 'Service',
            typeLower: 'service',
            action: m.barter_do()
            // action: m.request_service()
        },
        request: {
            back: m.back_to_requests(),
            type: 'Request',
            typeLower: 'request',
            action: m.barter_do()
            // action: m.offer_help()
        }
    }[itemType] || {
        back: 'Back',
        type: 'Item',
        typeLower: 'item',
        action: 'Exchange'
    };
</script>

<svelte:head>
    <title>{item.name} - Circle App</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 dark:bg-slate-950 flex flex-col items-center p-4 sm:p-8 transition-colors">
    <div class="w-full max-w-4xl bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-600 transform transition duration-500 hover:shadow-3xl">

        <a href={backLink} class="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-teal-800 dark:hover:text-teal-300 transition mb-6 font-medium">
            <ArrowLeft class="w-4 h-4 mr-1" />
            {labels.back}
        </a>
        
        <div class="flex items-start justify-between gap-4 mb-2">
            <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white">
                {item.name}
            </h1>
            {#if isOwner}
                <div class="flex space-x-3 mt-1">
                    
                    <a href={editLink} 
                       class="flex items-center justify-center p-2 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-full shadow-md hover:bg-sky-200 dark:hover:bg-sky-800 transition duration-150 transform hover:scale-105"
                       title="Edit {labels.type}">
                        <Edit class="w-5 h-5" />
                    </a>
            
                    <form method="POST" action={deleteAction} onsubmit={() => confirm(`Delete this ${labels.typeLower} permanently?`)} use:enhance>
                        <button type="submit" 
                                class="flex items-center justify-center p-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full shadow-md hover:bg-red-200 dark:hover:bg-red-800 transition duration-150 transform hover:scale-105"
                                title="Delete {labels.type}">
                            <Trash2 class="w-5 h-5" />
                        </button>
                    </form>
                </div>
            {/if}
        </div>
        
        <p class="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-8">
            {item.headline}
        </p>
        

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div class="space-y-4">
                <div class="relative w-full h-96 bg-gray-100 dark:bg-slate-800 rounded-2xl overflow-hidden mb-4 shadow-inner">
                    {#key currentPhoto}
                        <img in:scale={{ duration: 300, start: 0.95, opacity: 0 }} 
                             src={currentPhoto} 
                             alt="Selected {labels.typeLower}" 
                             class="w-full h-full object-contain"/>
                    {/key}
                </div>
                
                {#if item.photos && item.photos.length > 0}
                    <div class="flex gap-3 justify-center">
                        {#each item.photos as photo, i (i)}
                            <button onclick={() => handleThumbnailClick(photo)} 
                                    class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 transform active:scale-90 focus:outline-none {photo === currentPhoto ? 'border-teal-500 dark:border-teal-400 scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}">
                                <img src={photo} alt="{labels.type} {i + 1}" class="w-full h-full object-cover" />
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
            
            <div class="space-y-6">
                <div class="space-y-3 p-5 bg-sky-50 dark:bg-sky-950/30 rounded-2xl border-l-4 border-sky-400 dark:border-sky-600 transition-colors">
                    
                    <div class="flex items-center text-gray-800 dark:text-slate-200">
                        <span class="font-bold text-lg">{m.points_value()}:</span>
                        <span class="ml-2 text-2xl font-extrabold text-sky-700 dark:text-sky-400">{item.points.toFixed(0)}</span>
                    </div>
                    

                    {#if item.measure}
                        <div class="flex items-center text-gray-600 dark:text-slate-400">
                            <Ruler class="w-4 h-4 mr-2" />
                            <span class="font-semibold">{m.measure()}:</span>
                            <span class="ml-2">{item.measure}</span>
                        </div>
                    {/if}
                    

                    <div class="flex items-center text-gray-600 dark:text-slate-400">
                        <Tag class="w-4 h-4 mr-2" />
                        <span class="font-semibold">{m.category()}:</span>
                        <span class="ml-2">
                            {#if getDescription}
                                {getDescription(item.category)} ({item.category})
                            {:else}
                                {item.category}
                            {/if}
                        </span>
                    </div>
                    

                    <div class="flex items-center text-gray-600 dark:text-slate-400">
                        <span class="font-semibold">{m.seller()}:</span>
                        <a href={`/users/${owner.slug}`} 
                           class="flex items-center ml-2 hover:bg-sky-50 dark:hover:bg-sky-950/50 p-1 rounded-lg transition-colors duration-200">
                            <img src={owner.avatar} alt="Owner Avatar" class="w-8 h-8 rounded-full object-cover" />
                            <span class="ml-2 text-sm truncate hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200">
                                {owner.username}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            

            <div class="lg:col-span-2 p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border-t border-gray-100 dark:border-slate-700 transition-colors">
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-3 border-b pb-2 dark:border-slate-700">
                    {m.description()}
                </h3>
                <p class="text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {item.description || `No detailed description provided for this ${labels.typeLower}.`}
                </p>
            </div>
        </div>
        

        <div class="mt-10">
            {#if isOwner}
                <a href={transactionHref} 
                   class="w-full bg-teal-600 dark:bg-teal-500 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2">
                    <Handshake class="w-5 h-5" />
                    {labels.action}
                </a>
            {:else}
                <div class="w-full text-center py-3 rounded-2xl font-bold text-lg bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400">
                    {m.to_avail()}
                </div>
            {/if}
        </div>
    </div>
</div> -->