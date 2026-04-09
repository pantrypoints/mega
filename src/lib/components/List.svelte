<script lang="ts">
    import { Search, ArrowUpDown, Star, Tag } from 'lucide-svelte';
    import { goto } from '$app/navigation';
    import { m } from '$lib/paraglide/messages.js';

    let { items, search, sort, direction, error, basePath, title, createLabel, getDesc, user }: any = $props();

    let currentSearch = $state(search);
    
    // Determine if user is logged in
    let isLoggedIn = $derived(!!user);

    // Sync currentSearch if the user navigates
    $effect(() => {
        currentSearch = search;
    });

    function updateUrl(newParams: Record<string, string>) {
        const params = new URLSearchParams(window.location.search);
        Object.entries(newParams).forEach(([k, v]) => {
            if (v) params.set(k, v);
            else params.delete(k);
        });
        
        goto(`${basePath}?${params.toString()}`, { keepFocus: true });
    }

    const handleSearch = (e: SubmitEvent) => {
        e.preventDefault();
        updateUrl({ search: currentSearch });
    };
    
    const handleSort = (key: string) => {
        const newDir = (sort === key && direction === 'asc') ? 'desc' : 'asc';
        updateUrl({ sort: key, direction: newDir, search: currentSearch });
    };
</script>

<div class="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 sm:p-8 transition-colors">
    <div class="w-full max-w-6xl mx-auto space-y-8">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border-t-4 border-sky-500">
            <div class="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <h1 class="text-3xl font-black text-gray-800 dark:text-white">{title}</h1>
                
                <!-- Only show create button if user is logged in -->
                {#if isLoggedIn}
                    <a href="{basePath}/new" class="bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 text-center">
                        {createLabel}
                    </a>
                {/if}
            </div>

            <!-- Rest of your template remains the same -->
            <form onsubmit={handleSearch} class="flex flex-col sm:flex-row gap-4">
                <div class="relative flex-grow">
                    <input 
                        type="search" 
                        bind:value={currentSearch} 
                        placeholder={m.search_by()} 
                        class="w-full p-3 pl-10 border dark:border-slate-700 rounded-xl dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-sky-500" 
                    />
                    <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button type="submit" class="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition">
                    {m.search()}
                </button>
            </form>

            <div class="mt-6 flex flex-wrap gap-3 text-sm border-t dark:border-slate-800 pt-4">
                <span class="font-bold text-gray-500 self-center">{m.sort_by()}:</span>
                {#each ['dateCreated', 'name', 'points'] as key}
                    <button onclick={() => handleSort(key)} 
                            class="px-4 py-2 rounded-full transition flex items-center gap-2 {sort === key ? 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400'}">
                        {key === 'dateCreated' ? 'Newest' : key.charAt(0).toUpperCase() + key.slice(1)}
                        <ArrowUpDown size={14} />
                    </button>
                {/each}
            </div>
        </div>

        {#if error}<div class="p-4 bg-red-100 text-red-700 rounded-xl">{error}</div>{/if}

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each items as item (item.id)}
                <a href="{basePath}/{item.id}">
                    <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl">
                        <div class="h-48 bg-gray-200 dark:bg-slate-800">
                            <img src={item.mainPhoto || '/blank.jpg'} 
                              onerror={(e) => (e.currentTarget.src = '/blank.jpg')}
                              alt={item.name} 
                              class="w-full h-full object-cover" />
                        </div>
                        <div class="p-6 space-y-3">
                            <h3 class="text-xl font-bold text-black dark:text-white truncate">{item.name}</h3>
                            <p class="text-sm text-gray-500 line-clamp-2">{item.headline}</p>
                            <!-- <span class="inline-flex items-center text-xs px-3 py-1 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full font-bold">
                                <Tag size={12} class="mr-1" /> {getDesc(item.category)}
                            </span> -->
                            <div class="flex justify-between items-center pt-3 border-t dark:border-slate-800">
                                <div class="flex items-center text-lg font-black text-orange-600">
                                    <Star size={16} class="mr-1 fill-orange-500" /> {item.points} Points
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            {:else}
                <p class="col-span-full text-center py-20 text-gray-400">{m.nothing_found()}</p>
            {/each}
        </div>
    </div>
</div>