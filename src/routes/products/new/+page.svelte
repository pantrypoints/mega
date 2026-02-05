<!-- from gemini jundalisay ata -->

<script lang="ts">
    import { enhance } from '$app/forms';
    import { Save, Pencil, Megaphone, Sigma, ArrowLeft, Pen, Image, Tag, ChevronDown, Ruler } from 'lucide-svelte';
    import type { ActionData } from './$types';
    import { m } from '$lib/paraglide/messages.js';
    
    // Import the same HS Code data and utilities as the edit page
    import {
        getSortedChaptersList,
        hsChapters,
        getSubcategoriesForChapter,
        getDetailsForSubcategory
    } from '$lib/data/hsData';
    
    import ImageKit from 'imagekit-javascript';
    import { PUBLIC_IMAGEKIT_URL_ENDPOINT, PUBLIC_IMAGEKIT_PUBLIC_KEY } from '$env/static/public';

    // Image States
    let photoUrls = $state(['', '', '']);
    let uploadingIndices = $state(new Set<number>());
    
    const ik = new ImageKit({
        urlEndpoint: PUBLIC_IMAGEKIT_URL_ENDPOINT,
        publicKey: PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });

    async function uploadPhoto(e: Event, index: number) {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        
        if (file.size > 500 * 1024) {
            alert("File too large (>500KB)");
            return;
        }
        
        uploadingIndices.add(index);
        
        try {
            const authRes = await fetch('/api/imagekit-auth');
            const authData = await authRes.json();
            
            const result = await ik.upload({
                file,
                fileName: `prod_${Date.now()}_${index}`,
                ...authData
            });
            
            photoUrls[index] = result.url;
        } catch (err) {
            console.error(err);
        } finally {
            uploadingIndices.delete(index);
        }
    }

    // Form State (Runes)
    let name = $state("");
    let headline = $state("");
    let description = $state("");
    let points = $state("");
    let measure = $state("");
    
    // HS Selection State
    let selectedChapter = $state('');
    let selectedSubcategory = $state('');
    let selectedDetail = $state('');

    // Generate the sorted list once
    const sortedChapters = getSortedChaptersList();

    // Derived Logic
    const availableSubcategories = $derived(
        selectedChapter ? getSubcategoriesForChapter(selectedChapter) : []
    );
    
    const availableDetails = $derived(
        selectedSubcategory ? getDetailsForSubcategory(selectedSubcategory) : []
    );

    // The final category value submitted to the database
    const category = $derived.by(() => {
        if (selectedDetail) return selectedDetail;
        if (selectedSubcategory) return selectedSubcategory;
        return selectedChapter;
    });

    // Reset Functions
    function handleChapterChange() {
        selectedSubcategory = '';
        selectedDetail = '';
    }

    function handleSubcategoryChange() {
        selectedDetail = '';
    }

    // Props
    let { form } = $props<{ form: ActionData }>();
</script>

<svelte:head>
    <title>Create New Product - Circle App</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
    <div class="w-full max-w-3xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500">
        <!-- Back Button -->
        <a href="/products" class="inline-flex items-center text-sky-600 hover:text-sky-800 transition mb-6 font-medium">
            <ArrowLeft class="w-4 h-4 mr-1" />
            {m.back_to_products()}
        </a>

        <!-- Header -->
        <h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1">
            {m.create_product()}
        </h1>
        
        <!-- Error Message -->
        {#if form?.message}
            <p class="text-sm bg-red-100 text-red-600 p-3 rounded-lg border border-red-300 mb-4 animate-pulse">
                {form.message}
            </p>
        {/if}

        <!-- Form -->
        <form method="POST" use:enhance class="space-y-8">
            <!-- Hidden input for category -->
            <input type="hidden" name="category" value={category} />

            <!-- Product Name -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="name">
                    <Pencil class="w-4 h-4" />
                    {m.product_name()}
                    <span class="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    bind:value={name}
                    required
                    placeholder="{m.enter_name()}"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                />
            </div>

            <!-- Headline -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="headline">
                    <Megaphone class="w-4 h-4" />
                    {m.headline()}
                </label>
                <input
                    type="text"
                    id="headline"
                    name="headline"
                    bind:value={headline}
                    maxlength="100"
                    placeholder="{m.short_headline()}"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                />
            </div>

            <!-- Description -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="description">
                    <Pen class="w-4 h-4" />
                    {m.description()}
                </label>
                <textarea
                    id="description"
                    name="description"
                    bind:value={description}
                    rows="4"
                    placeholder="{m.add_details()}"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition resize-none"
                ></textarea>
            </div>

            <!-- Points and Measure -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Points -->
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="points">
                        <Sigma class="w-4 h-4" />
                        {m.points()}
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        id="points"
                        name="points"
                        bind:value={points}
                        required
                        placeholder="0.00"
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                </div>

                <!-- Measure -->
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="measure">
                        <Ruler class="w-4 h-4" />
                        {m.measure()}
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="measure"
                        name="measure"
                        bind:value={measure}
                        required
                        placeholder="{m.measure_example()}"
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    />
                </div>
            </div>

            <!-- HS Code Classification -->
            <div class="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
                <label class="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-1">
                    <Tag class="w-4 h-4" />
                    {m.category()} {m.optional()} 
                </label>

                <!-- Selected Code Display -->
                <div class="mb-6 p-4 bg-white rounded-xl border border-sky-200 shadow-sm">
                    <div class="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                        {m.selected_code()}
                    </div>
                    <div class="text-xl font-mono font-bold text-gray-900">
                        {category || '---'}
                    </div>
                    {#if selectedChapter}
                        <p class="text-sm text-gray-500 mt-1 italic">
                            {hsChapters[selectedChapter]}
                        </p>
                    {/if}
                </div>

                <!-- Chapter Selection -->
                <div class="mb-6">
                    <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">
                        Chapter
                    </label>
                    <div class="relative">
                        <select
                            bind:value={selectedChapter}
                            onchange={handleChapterChange}
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10"
                        >
                            <option value="">-- {m.select_chapter()} --</option>
                            {#each sortedChapters as { code, name }}
                                <option value={code}>{code} - {name}</option>
                            {/each}
                        </select>
                        <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                <!-- Subcategory Selection (only shown if chapter is selected) -->
                {#if selectedChapter}
                    <div class="mb-6">
                        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">
                            Subcategory
                        </label>
                        <div class="relative">
                            <select
                                bind:value={selectedSubcategory}
                                onchange={handleSubcategoryChange}
                                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10"
                            >
                                <option value="">-- {m.select_subcat()} --</option>
                                {#each availableSubcategories as item}
                                    <option value={item.code}>{item.code} - {item.name}</option>
                                {/each}
                            </select>
                            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                {/if}

                <!-- Detail Selection (only shown if subcategory is selected and has details) -->
                {#if selectedSubcategory && availableDetails.length > 0}
                    <div class="mb-6">
                        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">
                            Specific Item
                        </label>
                        <div class="relative">
                            <select
                                bind:value={selectedDetail}
                                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white appearance-none pr-10"
                            >
                                <option value="">-- {m.select_detail()} --</option>
                                {#each availableDetails as item}
                                    <option value={item.code}>{item.code} - {item.name}</option>
                                {/each}
                            </select>
                            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                {/if}
            </div>

            <!-- Image Upload Section -->
            <div>
                <h2 class="text-lg font-bold text-teal-700 flex items-center gap-2 mb-4">
                    <Image class="w-5 h-5" />
                    {m.image_urls()} ({m.optional()})
                </h2>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {#each [0, 1, 2] as i}
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-gray-700">
                                {i === 0 ? 'Primary Photo' : `Photo ${i + 1}`}
                            </label>
                            
                            <div class="relative h-40 w-full bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center overflow-hidden">
                                {#if photoUrls[i]}
                                    <img src={photoUrls[i]} alt="Preview" class="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onclick={() => photoUrls[i] = ''} 
                                        class="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600 transition">
                                        ✕
                                    </button>
                                {:else}
                                    <Image class="w-8 h-8 text-gray-400" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onchange={(e) => uploadPhoto(e, i)} 
                                        class="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                {/if}
                                
                                {#if uploadingIndices.has(i)}
                                    <div class="absolute inset-0 bg-white/80 flex items-center justify-center">
                                        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-500"></div>
                                    </div>
                                {/if}
                            </div>
                            
                            <!-- Hidden inputs for form submission -->
                            <input type="hidden" name="photo{i + 1}" value={photoUrls[i]} />

                            <!-- {#if i === 0}
                                <input type="hidden" name="photo1" value={photoUrls[0]} />
                            {:else if i === 1}
                                <input type="hidden" name="photo2" value={photoUrls[1]} />
                            {:else if i === 2}
                                <input type="hidden" name="photo3" value={photoUrls[2]} />
                            {/if} -->
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 pt-6">
                <button
                    type="submit"
                    disabled={uploadingIndices.size > 0}
                    class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    <Save class="w-5 h-5" />
                    {uploadingIndices.size > 0 ? 'Uploading Images...' : m.create_product()}
                </button>
                
                <a
                    href="/products"
                    class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl shadow-lg text-center transition duration-300 flex items-center justify-center"
                >
                    {m.cancel()}
                </a>
            </div>
        </form>
    </div>
</div>