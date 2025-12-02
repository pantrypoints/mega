<script lang="ts">
    import { ArrowLeft, Save, Pen, Image, DollarSign, Ruler, Tag } from 'lucide-svelte';
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';

    import { setLocale } from '$lib/paraglide/runtime';
    import { m } from '$lib/paraglide/messages.js'; 

    export let data: PageData;
    const { service } = data;

    let name = service.name;
    let headline = service.headline || '';
    let description = service.description || '';
    let points = String(service.points);
    let measure = service.measure;
    let category = service.category;

    let photo1 = service.photo1 || '';
    let photo2 = service.photo2 || '';
    let photo3 = service.photo3 || '';
    let photo4 = service.photo4 || '';
    let photo5 = service.photo5 || '';
    let photo6 = service.photo6 || '';

    const categories = ['Tools', 'Skills', 'Goods', 'Time', 'Consulting'];
    const measures = ['hour', 'day', 'unit', 'job', 'm2', 'kg'];
</script>

<svelte:head>
    <title>Edit {service.name} - Circle App</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
    <div class="w-full max-w-3xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 transform transition duration-500 hover:shadow-3xl">

        <!-- Back Button -->
        <a href="/services/{service.id}" class="inline-flex items-center text-teal-600 hover:text-teal-800 transition mb-6 font-medium">
            <ArrowLeft class="w-4 h-4 mr-1" /> Back to Service Detail
        </a>


        <h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1">{m.edit()} {service.name}</h1>
        <p class="text-center text-gray-500 mb-8">Update your service details</p>

        <form method="POST" action="?" use:enhance class="space-y-8">

            <!-- Service Name -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Service Name <span class="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    bind:value={name}
                    required
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2
                    focus:ring-teal-500 focus:border-transparent transition"
                />
            </div>

            <!-- Headline -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Headline</label>
                <input
                    type="text"
                    name="headline"
                    bind:value={headline}
                    maxlength="100"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2
                    focus:ring-teal-500 focus:border-transparent transition"
                />
            </div>

            <!-- Description -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <Pen class="w-4 h-4" /> Description
                </label>
                <textarea
                    name="description"
                    bind:value={description}
                    rows="4"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2
                    focus:ring-teal-500 focus:border-transparent transition resize-none"
                ></textarea>
            </div>

            <!-- Points + Category -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <!-- Points -->
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                        <DollarSign class="w-4 h-4"/> Points <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="points"
                        bind:value={points}
                        required
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2
                        focus:ring-teal-500 focus:border-transparent transition"
                    />
                </div>

                <!-- Category -->
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                        <Tag class="w-4 h-4"/> Category <span class="text-red-500">*</span>
                    </label>
                    <select
                        name="category"
                        bind:value={category}
                        required
                        class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white focus:ring-2
                        focus:ring-teal-500 focus:border-transparent transition"
                    >
                        {#each categories as c}
                            <option value={c}>{c}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <!-- Measure -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <Ruler class="w-4 h-4" /> Unit of Measure <span class="text-red-500">*</span>
                </label>
                <select
                    name="measure"
                    bind:value={measure}
                    required
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white focus:ring-2
                    focus:ring-teal-500 focus:border-transparent transition"
                >
                    {#each measures as m}
                        <option value={m}>{m}</option>
                    {/each}
                </select>
            </div>

            <!-- Image Gallery -->
            <h2 class="text-lg font-bold text-teal-700 flex items-center gap-2 mt-6">
                <Image class="w-5 h-5" /> Image Gallery URLs (Optional)
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {#each [
                    { label: 'Primary Photo URL', name: 'photo1', bind: photo1 },
                    { label: 'Photo 2 URL', name: 'photo2', bind: photo2 },
                    { label: 'Photo 3 URL', name: 'photo3', bind: photo3 },
                    { label: 'Photo 4 URL', name: 'photo4', bind: photo4 },
                    { label: 'Photo 5 URL', name: 'photo5', bind: photo5 },
                    { label: 'Photo 6 URL', name: 'photo6', bind: photo6 }
                ] as field}
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                        <input
                            type="url"
                            name={field.name}
                            bind:value={field.bind}
                            placeholder="https://example.com/image.jpg"
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2
                            focus:ring-teal-500 focus:border-transparent transition"
                        />
                    </div>
                {/each}

            </div>

            <!-- Buttons -->
            <div class="flex gap-4 pt-4">
                <button
                    type="submit"
                    class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                    <Save class="w-5 h-5"/> Save Changes
                </button>

                <a
                    href="/services/{service.id}"
                    class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl shadow-lg text-center transition duration-300"
                >
                    Cancel
                </a>
            </div>

        </form>
    </div>
</div>






<!-- <script lang="ts">
	import { ArrowLeft, Save, Tag, Ruler, DollarSign, Pen, Image } from 'lucide-svelte';
    import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
    // The load function ensures this is only accessible to the owner
    const { service } = data; 
    
    // Bindables for the form fields
    let name = service.name;
    let headline = service.headline || '';
    let description = service.description || '';
    let points = String(service.points);
    let measure = service.measure;
    let category = service.category;

    let photo1 = service.photo1 || '';
    let photo2 = service.photo2 || '';
    let photo3 = service.photo3 || '';
    let photo4 = service.photo4 || '';
    let photo5 = service.photo5 || '';
    let photo6 = service.photo6 || '';
    
    // Simple categories for example
    const categories = ['Tools', 'Skills', 'Goods', 'Time', 'Consulting'];
    const measures = ['hour', 'day', 'unit', 'job', 'm2', 'kg'];
</script>


<svelte:head>
	<title>Edit {service.name} - Circle App</title>
</svelte:head>


<div class="min-h-screen bg-sky-50 flex flex-col items-center p-4 sm:p-8">
	<div class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500">

		<a href="/services/{service.id}" class="inline-flex items-center text-teal-600 hover:text-teal-800 transition mb-6 font-medium" >
			<ArrowLeft class="w-4 h-4 mr-1" /> Back to Service Detail
		</a>


		<h1 class="text-3xl font-extrabold text-gray-900 mb-6 pb-2">
			Editing: {service.name}
		</h1>


		<form method="POST" action="?" use:enhance class="space-y-6">        
            <h2 class="text-xl font-bold text-teal-700 mt-4">General Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        bind:value={name}
                        required
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                    />
                </div>
                
                <div>
                    <label for="headline" class="block text-sm font-medium text-gray-700 mb-1">Short Headline</label>
                    <input
                        type="text"
                        name="headline"
                        id="headline"
                        bind:value={headline}
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                        maxlength="100"
                    />
                </div>
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Pen class="w-4 h-4"/> Description</label>
                <textarea
                    name="description"
                    id="description"
                    bind:value={description}
                    rows="4"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                ></textarea>
            </div>
            
            <h2 class="text-xl font-bold text-teal-700 mt-6">Pricing & Classification</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    
                <div>
                    <label for="points" class="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><DollarSign class="w-4 h-4"/> Points Value *</label>
                    <input
                        type="number"
                        name="points"
                        id="points"
                        bind:value={points}
                        step="1"
                        min="1"
                        required
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                    />
                </div>
                
                <div>
                    <label for="measure" class="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Ruler class="w-4 h-4"/> Unit of Measure *</label>
                    <select
                        name="measure"
                        id="measure"
                        bind:value={measure}
                        required
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150 bg-white appearance-none"
                    >
                        {#each measures as m}
                            <option value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                        {/each}
                    </select>
                </div>

                <div>
                    <label for="category" class="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Tag class="w-4 h-4"/> Category *</label>
                    <select
                        name="category"
                        id="category"
                        bind:value={category}
                        required
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150 bg-white appearance-none"
                    >
                        {#each categories as cat}
                            <option value={cat}>{cat}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <h2 class="text-xl font-bold text-teal-700 mt-6 flex items-center gap-1"><Image class="w-5 h-5"/> Image Gallery URLs (Optional)</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {#each [
                    { label: 'Primary Photo URL', name: 'photo1', bind: photo1 },
                    { label: 'Photo 2 URL', name: 'photo2', bind: photo2 },
                    { label: 'Photo 3 URL', name: 'photo3', bind: photo3 },
                    { label: 'Photo 4 URL', name: 'photo4', bind: photo4 },
                    { label: 'Photo 5 URL', name: 'photo5', bind: photo5 },
                    { label: 'Photo 6 URL', name: 'photo6', bind: photo6 },
                ] as field}
                    <div>
                        <label for={field.name} class="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                        <input
                            type="url"
                            name={field.name}
                            id={field.name}
                            bind:value={field.bind}
                            placeholder="https://placehold.co/..."
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                        />
                    </div>
                {/each}
            </div>

            <button
                type="submit"
                class="w-full bg-teal-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-teal-700 transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2 mt-8">
                <Save class="w-5 h-5" /> Save Changes
            </button>
		</form>
	</div>
</div>

 -->