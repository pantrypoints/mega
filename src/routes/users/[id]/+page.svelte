<script lang="ts">
  import type { PageData } from './$types';
  import { Sparkles, MessageCircle, Users, ArrowLeft, User, Star, Tag, MapPin, Calendar, Mail, Phone } from 'lucide-svelte';
  import { page } from '$app/stores';

  export let data: PageData;

  const { user, products, services } = data;

  const currentUserId = data.currentUser?.id; // You might need to adjust based on how you pass your user session


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

  // 1. Define the attributes in order and map the quiz values (0-4)
  // Using the values provided: 2.5, 2, 0.5, 2, 3, 1, 1, 2.5, 3, 2
  const personalityAttributes = [
    { label: 'Heart', value: user.heart},
    { label: 'Brain', value: user.brain},
    { label: 'Body', value: user.body},
    { label: 'Luna', value: user.luna},
    { label: 'Mercury', value: user.mercury},
    { label: 'Saturn', value: user.saturn},
    { label: 'Apollo', value: user.apollo},
    { label: 'Jupiter', value: user.jupiter},
    { label: 'Venus', value: user.venus},
    { label: 'Mars', value: user.mars}
  ];

  // 2. Calculate Top 3 Dominant Types
  const topThree = [...personalityAttributes]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  // Chart dimensions
  const spokes = personalityAttributes.length;
  const radius = 150; 
  const center = radius + 40; 
  const rings = 4; // Represents scores 1, 2, 3, 4
  const angleStep = (2 * Math.PI) / spokes;

  // Function to calculate coordinates (Max value is now 4 instead of 100)
  function getCoordinate(index: number, value: number, max: number = 4) {
    const angle = angleStep * index - (Math.PI / 2);
    const currentRadius = (value / max) * radius;
    const x = center + currentRadius * Math.cos(angle);
    const y = center + currentRadius * Math.sin(angle);
    return { x, y };
  }

  $: dataPolygonPath = personalityAttributes
    .map((d, i) => {
      const { x, y } = getCoordinate(i, d.value);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ') + ' Z';

  let ringPaths: string[] = [];
  for (let r = 1; r <= rings; r++) {
    const ringPath = personalityAttributes
      .map((_, i) => {
        const { x, y } = getCoordinate(i, r);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ') + ' Z';
    ringPaths = [...ringPaths, ringPath];
  }

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

    <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
      <div class="flex-shrink-0">
        {#if user.avatar}
          <img src={user.avatar} alt={user.username} class="w-32 h-32 rounded-full object-cover border-4 border-teal-100 shadow-xl" />
        {:else}
          <div class="w-32 h-32 rounded-full bg-teal-500 flex items-center justify-center border-4 border-teal-100 shadow-xl">
            <User class="w-16 h-16 text-white" />
          </div>
        {/if}
      </div>
      
      <div class="flex-grow text-center sm:text-left">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">{user.username}</h1>
        
        <div class="flex flex-wrap gap-3 justify-center sm:justify-start text-sm text-gray-600 mb-3">
          {#if user.city}
            <div class="flex items-center gap-1">
              <MapPin class="w-4 h-4" />
              <span>{user.city}</span>
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
        
        <div class="inline-flex flex-wrap items-center gap-2 bg-teal-50 border border-teal-100 px-4 py-2 rounded-2xl">
          <div class="flex items-center gap-1">
            <Sparkles class="w-4 h-4 text-teal-600" />
            <span class="text-xs font-bold text-teal-600 uppercase tracking-widest">Dominant Traits:</span>
          </div>
          
          <div class="flex flex-wrap items-center gap-2">
            {#each topThree as trait, index}
              <div class="flex items-center gap-1 bg-white/70 px-2 py-1 rounded-lg">
                <span class="text-sm font-semibold text-teal-800">{trait.label}</span>
                <span class="text-xs text-gray-500">({trait.percentage}%)</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>


    <div class="w-full bg-white rounded-2xl border border-gray-100 p-4 sm:p-10 my-8 flex flex-col items-center">
      <header class="text-center mb-6">
        <h3 class="text-2xl font-bold text-gray-800">Personality ID</h3>
        <p class="text-sm text-gray-400">Rolling average of your personality structure</p>
      </header>

      <div class="relative overflow-visible">
        <svg width={center * 2} height={center * 2} viewBox={`0 0 ${center * 2} ${center * 2}`} class="overflow-visible">
          {#each ringPaths as path, i}
            <path d={path} fill="none" stroke={i === rings - 1 ? '#cbd5e1' : '#f1f5f9'} stroke-width="1.5" />
          {/each}

          {#each Array(spokes) as _, i}
            {@const { x, y } = getCoordinate(i, 4)}
            <line x1={center} y1={center} x2={x} y2={y} stroke="#f1f5f9" stroke-width="1" />
          {/each}

          <path d={dataPolygonPath} fill="rgba(13, 148, 136, 0.4)" stroke="#0f766e" stroke-width="3" class:animate-radar={animated} />

          {#each personalityAttributes as d, i}
            {@const { x, y } = getCoordinate(i, d.value)}
            <circle cx={x} cy={y} r="5" fill="#f97316" stroke="#fff" stroke-width="2" class:animate-point={animated} />
            <text x={x} y={y} dy={y < center ? -15 : 20} text-anchor="middle" font-size="12" font-weight="bold" fill="#f97316" class:animate-point={animated}>
              {d.value.toFixed(1)}
            </text>
          {/each}

          {#each personalityAttributes as d, i}
            {@const { x, y } = getCoordinate(i, 4.4)}
            <text 
              x={x} y={y} 
              text-anchor="middle" 
              dominant-baseline="middle" 
              fill="#374151" 
              font-size="13" 
              font-weight="800" 
              class="uppercase tracking-tighter"
            >
              {d.label}
            </text>
          {/each}
        </svg>
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
    from { stroke-dasharray: 0 1000; fill-opacity: 0; }
    to { stroke-dasharray: 1000 0; fill-opacity: 0.4; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }

  .animate-radar {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: drawRadar 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-point {
    opacity: 0;
    animation: fadeIn 0.4s ease-out forwards;
    animation-delay: 1s;
  }
</style>

