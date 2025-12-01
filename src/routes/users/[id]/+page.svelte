<script lang="ts">
  import type { PageData } from './$types';
  import { Users, ArrowLeft, User, Star, Tag, MapPin, Calendar, Mail, Phone } from 'lucide-svelte';
  import { page } from '$app/stores';

  export let data: PageData;

  const { user, products, services } = data;
  
  // Tab state - check URL hash or default to 'products'
  let activeTab: 'products' | 'services' = 'products';
  
  $: {
    const hash = $page.url.hash.slice(1);
    if (hash === 'products' || hash === 'services') {
      activeTab = hash as 'products' | 'services';
    }
  }

  function setTab(tab: 'products' | 'services') {
    activeTab = tab;
    window.location.hash = tab;
  }


    import { Circle, TrendingUp } from 'lucide-svelte';
    import { onMount } from 'svelte';

    // Mock data for 10 spokes (Performance Metrics, max value 100)
    const mockData = [
        { label: 'Focus', value: 85 },
        { label: 'Speed', value: 70 },
        { label: 'Quality', value: 95 },
        { label: 'Collaboration', value: 60 },
        { label: 'Adaptability', value: 80 },
        { label: 'Innovation', value: 75 },
        { label: 'Resourcefulness', value: 90 },
        { label: 'Communication', value: 65 },
        { label: 'Strategic Thinking', value: 50 },
        { label: 'Experience', value: 92 }
    ];

    // Chart dimensions and constants
    const spokes = mockData.length;
    const radius = 150; // Max radius for the chart
    const center = radius + 30; // Center position (used for SVG coordinates)
    const rings = 4; // Number of concentric rings
    const angleStep = (2 * Math.PI) / spokes;
    
    // Function to calculate Cartesian coordinates from a value and index
    function getCoordinate(index: number, value: number, max: number = 100) {
        const angle = angleStep * index - (Math.PI / 2); // Start at 12 o'clock (-90 degrees)
        const currentRadius = (value / max) * radius;
        const x = center + currentRadius * Math.cos(angle);
        const y = center + currentRadius * Math.sin(angle);
        return { x, y };
    }

    // Generate the path string for the main data polygon
    $: dataPolygonPath = mockData
        .map((d, i) => {
            const { x, y } = getCoordinate(i, d.value);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        })
        .join(' ');
        
    // Generate the path string for the grid rings
    let ringPaths: string[] = [];
    for (let r = 1; r <= rings; r++) {
        const ringRadius = (r / rings) * radius;
        const ringPath = mockData
            .map((_, i) => {
                const angle = angleStep * i - (Math.PI / 2);
                const x = center + ringRadius * Math.cos(angle);
                const y = center + ringRadius * Math.sin(angle);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');
        ringPaths = [...ringPaths, ringPath];
    }
    
    // Trigger CSS animation class on mount for visual effect
    let animated = false;
    onMount(() => {
        animated = true;
    });

</script>

<svelte:head>
  <title>{user.username} - Circle App</title>
</svelte:head>

<div class="min-h-screen bg-sky-50 flex flex-col items-center p-4 sm:p-8">
  <div class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 transform transition duration-500 hover:shadow-3xl">
    <!-- Back Button -->
    <a
      href="/users"
      class="inline-flex items-center text-teal-600 hover:text-teal-800 transition mb-6 font-medium"
    >
      <ArrowLeft class="w-4 h-4 mr-1" />
      Back to Users
    </a>

    <!-- User Profile Header -->
    <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
      <!-- Avatar -->
      <div class="">
        {#if user.avatar}
          <img
            src={user.avatar}
            alt={user.username}
            class="w-32 h-32 rounded-full object-cover border-4 border-teal-100 shadow-xl"
          />
        {:else}
          <div class="w-32 h-32 rounded-full bg-teal-500 flex items-center justify-center border-4 border-teal-100 shadow-xl">
            <User class="w-16 h-16 text-white" />
          </div>
        {/if}
      </div>

      <!-- User Info -->
      <div class="flex-grow text-center sm:text-left">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
          {user.username}
        </h1>
        <p class="text-xl font-semibold text-teal-600 mb-4">@{user.codename}</p>
        
        <div class="flex flex-wrap gap-3 justify-center sm:justify-start text-sm text-gray-600">
          {#if user.location}
            <div class="flex items-center gap-1">
              <MapPin class="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          {/if}
          {#if user.email}
            <div class="flex items-center gap-1">
              <Mail class="w-4 h-4" />
              <span>{user.email}</span>
            </div>
          {/if}
          {#if user.phone}
            <div class="flex items-center gap-1">
              <Phone class="w-4 h-4" />
              <span>{user.phone}</span>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <div class="w-full max-w-4xl bg-white p-6 sm:p-10 my-8">
      <header class="text-center mb-10">
          <p class="text-lg text-gray-500 mt-2">Personality ID</p>
      </header>

      <div class="flex flex-col lg:flex-row gap-8 justify-center items-start">
          

            <!-- Chart Container -->
            <div class="flex-shrink-0">
                <svg width={center * 2} height={center * 2} viewBox={`0 0 ${center * 2} ${center * 2}`}>
                    
                    <!-- 1. Grid Rings (The "Web") -->
                    {#each ringPaths as path, i (i)}
                        <path 
                            d={path} 
                            fill="none" 
                            stroke={i === rings - 1 ? '#cbd5e1' : '#e2e8f0'} 
                            stroke-width="1"
                            class="transition-all duration-1000"
                        />
                    {/each}

                    <!-- 2. Spokes (Axis lines) -->
                    {#each Array(spokes) as _, i (i)}
                        {@const { x, y } = getCoordinate(i, 100)}
                        <line 
                            x1={center} 
                            y1={center} 
                            x2={x} 
                            y2={y} 
                            stroke="#e2e8f0" 
                            stroke-width="1"
                            class="transition-all duration-1000"
                        />
                    {/each}
                    
                    <!-- 3. Data Polygon (The filled area) -->
                    <path 
                        d={dataPolygonPath}
                        fill="#0d9488" 
                        fill-opacity="0.6"
                        stroke="#0f766e"
                        stroke-width="2"
                        class:animate-radar={animated}
                    />

                    <!-- 4. Data Points -->
                    {#each mockData as d, i (i)}
                        {@const { x, y } = getCoordinate(i, d.value)}
                        <circle 
                            cx={x} 
                            cy={y} 
                            r="4" 
                            fill="#f97316"
                            stroke="#fff"
                            stroke-width="1.5"
                            title="{d.label}: {d.value}"
                            class:animate-point={animated}
                        />
                    {/each}
                    
                    <!-- NEW: Data Point Labels (Scores) -->
                    {#each mockData as d, i (i)}
                        {@const { x, y } = getCoordinate(i, d.value)}
                        <text
                            x={x}
                            y={y}
                            text-anchor="middle"
                            dominant-baseline="middle"
                            fill="#111827"
                            font-size="14"
                            font-weight="bold"
                            style="text-shadow: 0 0 3px #fff, 0 0 3px #fff;"
                            class:animate-point={animated}
                            dy={y < center ? -10 : 15}
                        >
                            {d.value}
                        </text>
                    {/each}

                    <!-- 5. Labels -->
                    {#each mockData as d, i (i)}
                        {@const { x, y } = getCoordinate(i, 100)}
                        <text
                            x={x}
                            y={y}
                            text-anchor={x > center + 5 ? 'start' : (x < center - 5 ? 'end' : 'middle')}
                            dominant-baseline={y > center + 5 ? 'hanging' : (y < center - 5 ? 'auto' : 'central')}
                            fill="#374151"
                            font-size="12"
                            font-weight="600"
                            dx={x > center ? 5 : (x < center ? -5 : 0)}
                            dy={y > center ? 15 : (y < center ? -5 : 0)}
                        >
                            {d.label}
                        </text>
                    {/each}
                    
                </svg>
            </div>

      </div>
    </div>


    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex gap-8">
        <button
          on:click={() => setTab('products')}
          class="pb-4 px-2 font-semibold transition-colors border-b-2"
          class:text-teal-600={activeTab === 'products'}
          class:border-teal-600={activeTab === 'products'}
          class:text-gray-500={activeTab !== 'products'}
          class:border-transparent={activeTab !== 'products'}
          class:hover:text-teal-500={activeTab !== 'products'}
        >
          Products ({products.length})
        </button>
        <button
          on:click={() => setTab('services')}
          class="pb-4 px-2 font-semibold transition-colors border-b-2"
          class:text-teal-600={activeTab === 'services'}
          class:border-teal-600={activeTab === 'services'}
          class:text-gray-500={activeTab !== 'services'}
          class:border-transparent={activeTab !== 'services'}
          class:hover:text-teal-500={activeTab !== 'services'}
        >
          Services ({services.length})
        </button>
      </nav>
    </div>

    <!-- Tab Content: Products -->
    {#if activeTab === 'products'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#if products.length === 0}
          <p class="text-gray-500 text-center col-span-full py-10">
            No products available yet.
          </p>
        {:else}
          {#each products as product (product.id)}
            <a href="/products/{product.id}">
              <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
                <!-- Product Image -->
                <div class="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={product.photo1 || 'https://placehold.co/800x600/f0f9ff/0e7490?text=No+Image'}
                    alt={product.name}
                    class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <!-- Product Info -->
                <div class="p-6 space-y-3">
                  <h3 class="text-xl font-bold text-gray-900 truncate">{product.name}</h3>
                  <p class="text-sm text-gray-500 line-clamp-2">{product.headline || 'No description'}</p>

                  <!-- Price and Category -->
                  <div class="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div class="flex items-center text-lg font-extrabold text-orange-600">
                      <Star class="w-4 h-4 mr-1 fill-orange-500 text-orange-500" />
                      {product.points.toFixed(0)} Points
                    </div>
                    <span class="flex items-center text-xs px-2 py-1 bg-teal-50 text-teal-600 rounded-full font-medium">
                      <Tag class="w-3 h-3 mr-1" />
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          {/each}
        {/if}
      </div>
    {:else}
      <!-- Tab Content: Services -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#if services.length === 0}
          <p class="text-gray-500 text-center col-span-full py-10">
            No services available yet.
          </p>
        {:else}
          {#each services as service (service.id)}
            <a href="/services/{service.id}">
              <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
                <!-- Service Image -->
                <div class="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={service.photo1 || 'https://placehold.co/800x600/f0f9ff/0e7490?text=No+Image'}
                    alt={service.name}
                    class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <!-- Service Info -->
                <div class="p-6 space-y-3">
                  <h3 class="text-xl font-bold text-gray-900 truncate">{service.name}</h3>
                  <p class="text-sm text-gray-500 line-clamp-2">{service.headline || 'No description'}</p>

                  <!-- Price and Category -->
                  <div class="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div class="flex items-center text-lg font-extrabold text-orange-600">
                      <Star class="w-4 h-4 mr-1 fill-orange-500 text-orange-500" />
                      {service.points.toFixed(0)} Points
                    </div>
                    <span class="flex items-center text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full font-medium">
                      <Tag class="w-3 h-3 mr-1" />
                      {service.category}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          {/each}
        {/if}
      </div>
    {/if}
  </div>
</div>



<style>
    /* Keyframe for a simple animation to reveal the chart on load */
    @keyframes drawRadar {
        from {
            stroke-dasharray: 0 1000;
            fill-opacity: 0.1;
        }
        to {
            stroke-dasharray: 1000 0;
            fill-opacity: 0.6;
        }
    }

    /* Keyframe for points to fade in */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* Apply the animation to the data polygon path */
    .animate-radar {
        /* Set a large dash array value initially */
        stroke-dasharray: 1000; 
        stroke-dashoffset: 1000;
        animation: drawRadar 1.5s ease-out forwards;
        animation-delay: 0.5s;
    }
    
    /* Apply animation to the data points and scores */
    .animate-point {
        opacity: 0;
        animation: fadeIn 0.5s ease-in forwards;
        animation-delay: 2s; /* Start after the radar draw finishes */
    }

</style>