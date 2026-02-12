<script lang="ts">
    import type { PageData } from './$types';
    import { Search, ArrowUpDown, Star, Tag, ExternalLink } from 'lucide-svelte';
    import { goto } from '$app/navigation';
    import { getNAICSDescription } from '$lib/data/naicsData';
    import { m } from '$lib/paraglide/messages.js';

    export let data: PageData;
    $: ({ requests, search, sort, direction, error } = data);

    let currentSearch = search;
    
    // --- State & Handlers for Search and Sort ---

    /** Submits the search query by updating the URL */
    function handleSearch() {
        const params = new URLSearchParams(window.location.search);
        if (currentSearch) {
            params.set('search', currentSearch);
        } else {
            params.delete('search');
        }
        // Preserve sorting parameters
        params.set('sort', sort);
        params.set('direction', direction);
        goto(`/requests?${params.toString()}`);
    }

    /** Updates the sorting order and direction */
    function handleSort(newSort: string) {
        const params = new URLSearchParams(window.location.search);
        
        let newDirection = 'asc';
        if (sort === newSort) {
            // If the same column is clicked, toggle direction
            newDirection = direction === 'asc' ? 'desc' : 'asc';
        } else {
            // If a new column is clicked, default to ascending
            newDirection = 'asc';
        }

        params.set('sort', newSort);
        params.set('direction', newDirection);
        
        // Preserve search term
        if (currentSearch) {
            params.set('search', currentSearch);
        }

        goto(`/requests?${params.toString()}`);
    }


    /** Helper to render the sort arrow */
    function getSortArrow(key: string) {
        if (sort !== key) return '';
        return direction === 'asc' ? '▲' : '▼';
    }
</script>


<svelte:head>
    <title>{m.requests()}</title>
</svelte:head>



<div class="min-h-screen bg-gray-50 p-4 sm:p-8">
    <div class="w-full max-w-6xl mx-auto space-y-8">
        <!-- Header -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border-t-4 border-sky-500 mb-6">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 class="text-3xl font-extrabold text-gray-800">{m.requests()}</h1>
                    <!-- <p class="text-gray-500 mt-1">Browse and manage services</p> -->
                </div>
                <a href="/requests/new"
                    class="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 text-center">
                    {m.create_request()}
                </a>
            </div>

        <!-- Search and Filter Bar -->

            <form on:submit|preventDefault={handleSearch} class="flex flex-col sm:flex-row gap-4">
                <!-- Search Input -->
                <div class="relative flex-grow">
                    <input
                        type="search"
                        bind:value={currentSearch}
                        placeholder="{m.search_by()}"
                        class="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    />
                    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                
                <!-- Search Button -->
                <button type="submit" class="sm:w-auto px-6 py-3 bg-sky-600 text-white rounded-xl font-semibold shadow-md hover:bg-sky-700 transition" >
                    {m.search()}
                </button>
            </form>


            <!-- Sort Controls -->
            <div class="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 pt-4 mt-4">
                <span class="font-semibold self-center">Sort by:</span>
                {#each ['dateCreated', 'name', 'points'] as key}
                    <button on:click={() => handleSort(key)} 
                        class="px-3 py-1.5 rounded-full transition duration-150 flex items-center gap-1"
                        class:bg-sky-100={sort === key}
                        class:text-sky-700={sort === key}
                        class:bg-gray-100={sort !== key}
                        class:hover:bg-sky-200={sort !== key}>
                        {key === 'dateCreated' ? 'Newest' : key.charAt(0).toUpperCase() + key.slice(1)}
                        <ArrowUpDown class="w-3 h-3" />
                        <span class="ml-1">{getSortArrow(key)}</span>
                    </button>
                {/each}
            </div>
        </div>

        {#if error}
            <div class="bg-red-100 text-red-700 p-4 rounded-xl font-medium">
                {error}
            </div>
        {/if}

        <!-- Requests List -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#if requests.length === 0}
                <p class="text-gray-500 text-center col-span-full py-10">
                    No services found matching your criteria. Try adjusting your search!


                </p>
            {:else}
                {#each requests as service (service.id)}
                <a href="/requests/{service.id}">
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
                        <!-- service Image -->
                        <div class="h-48 overflow-hidden bg-gray-100">
                            <img src={service.mainPhoto}
                                alt={service.name}
                                class="w-full h-full object-cover transition duration-500 group-hover:scale-105"/>
                        </div>

                        <!-- service Info -->
                        <div class="p-6 space-y-3">
                            <h3 class="text-xl font-bold text-gray-900 truncate">{service.name}</h3>
                            <p class="text-sm text-gray-500 line-clamp-2">{service.headline}</p>
                            <span class="flex items-center text-xs px-2 py-1 bg-sky-50 text-sky-600 rounded-full font-medium">
                                <Tag class="w-3 h-3 mr-1" />
                                {getNAICSDescription(service.category)} ({service.category})
                            </span>

                            <!-- Price and Category -->
                            <div class="flex justify-between items-center pt-2 border-t border-gray-100">
                                <div class="flex items-center text-lg font-extrabold text-orange-600">
                                    <Star class="w-4 h-4 mr-1 fill-orange-500 text-orange-500" />
                                    {service.points.toFixed(0)} Points
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                {/each}
            {/if}
        </div>
    </div>
</div>
