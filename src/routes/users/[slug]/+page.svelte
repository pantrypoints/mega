<script lang="ts">
  import type { PageData } from './$types';
  import { HandPlatter, HandHelping, HandHeart, HandCoins, ArrowRightLeft, Heart, Brain, BicepsFlexed, Moon, FlaskConical, Orbit, Sun, HandFist, Flower, Sword, Sparkles, MessageCircle, Users, ArrowLeft, User, Star, Tag, MapPin, Calendar, Mail, Phone } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { m } from '$lib/paraglide/messages.js';
  
  export let data: PageData;
  const { user, products, services, stats } = data;
  const currentUserId = data.currentUser?.id;
  
  // Tab state - check URL hash or default to 'products'
  let activeTab: 'products' | 'services' | 'transactions' = 'products';
  
  $: {
    const hash = $page.url.hash.slice(1);
    // FIXED: Added 'transactions' to the condition
    if (hash === 'products' || hash === 'services' || hash === 'transactions') {
      activeTab = hash as 'products' | 'services' | 'transactions';
    }
  }
  
  // FIXED: Added 'transactions' type to parameter
  function setTab(tab: 'products' | 'services' | 'transactions') {
    activeTab = tab;
    window.location.hash = tab;
  }
  
  import { Circle, TrendingUp } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  // Color configuration for each personality trait
  const traitColors = {
    Heart: {
      bg: 'bg-pink-100',
      border: 'border-pink-200',
      iconColor: 'text-red-500',
      text: 'text-red-700',
      icon: Heart
    },
    Brain: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      text: 'text-yellow-800',
      icon: Brain
    },
    Body: {
      bg: 'bg-orange-100',
      border: 'border-orange-200',
      iconColor: 'text-orange-600',
      text: 'text-orange-800',
      icon: BicepsFlexed
    },
    Luna: {
      bg: 'bg-indigo-100',
      border: 'border-indigo-200',
      iconColor: 'text-indigo-600',
      text: 'text-indigo-800',
      icon: Moon
    },
    Mercury: {
      bg: 'bg-emerald-100',
      border: 'border-emerald-200',
      iconColor: 'text-emerald-600',
      text: 'text-emerald-800',
      icon: FlaskConical
    },
    Saturn: {
      bg: 'bg-purple-100',
      border: 'border-purple-200',
      iconColor: 'text-purple-600',
      text: 'text-purple-800',
      icon: Orbit
    },
    Apollo: {
      bg: 'bg-amber-100',
      border: 'border-amber-200',
      iconColor: 'text-amber-600',
      text: 'text-amber-800',
      icon: Sun
    },
    Jupiter: {
      bg: 'bg-blue-100',
      border: 'border-blue-200',
      iconColor: 'text-blue-600',
      text: 'text-blue-800',
      icon: HandFist
    },
    Venus: {
      bg: 'bg-rose-100',
      border: 'border-rose-200',
      iconColor: 'text-rose-500',
      text: 'text-rose-700',
      icon: Flower
    },
    Mars: {
      bg: 'bg-red-100',
      border: 'border-red-200',
      iconColor: 'text-red-600',
      text: 'text-red-800',
      icon: Sword
    }
  };
  
  // 1. Define the attributes in order and map the quiz values (0-4)
  const personalityAttributes = [
    { label: 'Heart', value: user.heart || 0 },
    { label: 'Brain', value: user.brain || 0 },
    { label: 'Body', value: user.body || 0 },
    { label: 'Luna', value: user.luna || 0 },
    { label: 'Mercury', value: user.mercury || 0 },
    { label: 'Saturn', value: user.saturn || 0 },
    { label: 'Apollo', value: user.apollo || 0 },
    { label: 'Jupiter', value: user.jupiter || 0 },
    { label: 'Venus', value: user.venus || 0 },
    { label: 'Mars', value: user.mars || 0 }
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
  <div class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 transform transition duration-500 hover:shadow-3xl">
    
    <!-- Back Button -->
    <a href="/users" class="inline-flex items-center text-sky-600 hover:text-sky-800 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" />
      {m.back_to_users()}
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
        {#if currentUserId !== user.id}
          <a href="/chat?with={user.id}" class="my-6 flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-teal-700 transition transform hover:scale-105 text-center">
            <MessageCircle class="w-4 h-4" />
            {m.chat()}
          </a>
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
        
        <!-- Dominant Traits with Colorful Badges -->
        <div class="inline-flex flex-wrap items-center gap-2 bg-teal-50 border border-teal-100 px-4 py-2 rounded-2xl">
          <div class="flex items-center gap-1">
            <Sparkles class="w-4 h-4 text-teal-600" />
            <span class="text-xs font-bold text-teal-600 uppercase tracking-widest">{m.dominant()}:</span>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            {#each topThree as trait}
              {@const colors = traitColors[trait.label]}
              <div class="flex items-center gap-2 px-3 py-2 rounded-xl border shadow-sm {colors.bg} {colors.border}">
                <svelte:component this={colors.icon} class="w-4 h-4 {colors.iconColor}" />
                <span class="text-sm font-bold {colors.text}">{trait.label}</span>
                <span class="text-xs font-semibold {colors.text} opacity-80">({trait.value.toFixed(1)})</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
    
    <div class="w-full bg-white rounded-2xl border border-gray-100 p-4 sm:p-10 my-8 flex flex-col items-center">
      <header class="text-center mb-6">
        <h3 class="text-2xl font-bold text-gray-800">{m.personality_id()}</h3>
        <p class="text-sm text-gray-400">{m.ave()}</p>
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
            {@const colors = traitColors[d.label]}
            <circle cx={x} cy={y} r="5" fill={colors.iconColor.slice(5)} stroke="#fff" stroke-width="2" class:animate-point={animated} />
            <text x={x} y={y} dy={y < center ? -15 : 20} text-anchor="middle" font-size="12" font-weight="bold" fill={colors.iconColor.slice(5)} class:animate-point={animated}>
              {d.value.toFixed(1)}
            </text>
          {/each}
          
          {#each personalityAttributes as d, i}
            {@const { x, y } = getCoordinate(i, 4.4)}
            {@const colors = traitColors[d.label]}
            <text x={x} y={y} text-anchor="middle" dominant-baseline="middle" fill={colors.iconColor.slice(5)} font-size="13" font-weight="800" class="uppercase tracking-tighter">
              {d.label}
            </text>
          {/each}
        </svg>
      </div>
    </div>
    
    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex gap-8">
        <button on:click={() => setTab('products')} class="pb-4 px-2 font-semibold transition-colors border-b-2"
          class:text-teal-600={activeTab === 'products'}
          class:border-teal-600={activeTab === 'products'}
          class:text-gray-500={activeTab !== 'products'}
          class:border-transparent={activeTab !== 'products'}
          class:hover:text-teal-500={activeTab !== 'products'}>
          {m.products()} ({products.length})
        </button>
        <button on:click={() => setTab('services')} class="pb-4 px-2 font-semibold transition-colors border-b-2"
          class:text-teal-600={activeTab === 'services'}
          class:border-teal-600={activeTab === 'services'}
          class:text-gray-500={activeTab !== 'services'}
          class:border-transparent={activeTab !== 'services'}
          class:hover:text-teal-500={activeTab !== 'services'}>
          {m.services()} ({services.length})
        </button>
        <!-- FIXED: Added proper class bindings for transactions tab -->
        <button on:click={() => setTab('transactions')} class="pb-4 px-2 font-semibold transition-colors border-b-2"
          class:text-teal-600={activeTab === 'transactions'}
          class:border-teal-600={activeTab === 'transactions'}
          class:text-gray-500={activeTab !== 'transactions'}
          class:border-transparent={activeTab !== 'transactions'}
          class:hover:text-teal-500={activeTab !== 'transactions'}>
          {m.tx()}
        </button>
      </nav>
    </div>
    
    <!-- Tab Content: Products -->
    {#if activeTab === 'products'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#if products.length === 0}
          <p class="text-gray-500 text-center col-span-full py-10">
            {m.nothing()}
          </p>
        {:else}
          {#each products as product (product.id)}
            <a href="/products/{product.id}">
              <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
                <!-- Product Image -->
                <div class="h-48 overflow-hidden bg-gray-100">
                  <img src={product.photo1 || 'https://placehold.co/800x600/f0f9ff/0e7490?text=No+Image'} alt={product.name} class="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <!-- Product Info -->
                <div class="p-6 space-y-3">
                  <h3 class="text-xl font-bold text-gray-900 truncate">{product.name}</h3>
                  <p class="text-sm text-gray-500 line-clamp-2">{product.headline || 'No description'}</p>
                  <!-- Price and Category -->
                  <div class="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div class="flex items-center text-lg font-extrabold text-orange-600">
                      <Star class="w-4 h-4 mr-1 fill-orange-500 text-orange-500" />
                      {product.points.toFixed(0)} {m.points()}
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
    
    <!-- Tab Content: Services -->
    {:else if activeTab === 'services'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#if services.length === 0}
          <p class="text-gray-500 text-center col-span-full py-10">
            {m.nothing()}
          </p>
        {:else}
          {#each services as service (service.id)}
            <a href="/services/{service.id}">
              <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
                <!-- Service Image -->
                <div class="h-48 overflow-hidden bg-gray-100">
                  <img src={service.photo1 || 'https://placehold.co/800x600/f0f9ff/0e7490?text=No+Image'} alt={service.name} class="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
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
    
    <!-- Tab Content: Transactions -->
    {:else if activeTab === 'transactions'}
      <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{m.type()}</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">{m.role()}</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">{m.count()}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr>
              <td class="px-6 py-4 flex items-center gap-3">
                <div class="p-2 bg-blue-50 rounded-lg text-blue-600"><HandPlatter class="w-5 h-5" /></div>
                <span class="font-medium text-gray-700">{m.exchange()}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{m.giver()}</td>
              <td class="px-6 py-4 text-center font-bold text-gray-900">{stats?.exchangeAsGiver || 0}</td>
            </tr>
            <tr>
              <td class="px-6 py-4 flex items-center gap-3">
                <div class="p-2 bg-blue-50 rounded-lg text-blue-600"><HandHelping class="w-5 h-5" /></div>
                <span class="font-medium text-gray-700">{m.exchange()}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{m.getter()}</td>
              <td class="px-6 py-4 text-center font-bold text-gray-900">{stats?.exchangeAsGetter || 0}</td>
            </tr>
            <tr>
              <td class="px-6 py-4 flex items-center gap-3">
                <div class="p-2 bg-pink-50 rounded-lg text-pink-600"><HandHeart class="w-5 h-5" /></div>
                <span class="font-medium text-gray-700">{m.donation()}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{m.giver()}</td>
              <td class="px-6 py-4 text-center font-bold text-gray-900">{stats?.donationAsGiver || 0}</td>
            </tr>
            <tr>
              <td class="px-6 py-4 flex items-center gap-3">
                <div class="p-2 bg-pink-50 rounded-lg text-pink-600"><HandCoins class="w-5 h-5" /></div>
                <span class="font-medium text-gray-700">{m.donation()}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{m.getter()}</td>
              <td class="px-6 py-4 text-center font-bold text-gray-900">{stats?.donationAsGetter || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Keyframe for a simple animation to reveal the chart on load */
  @keyframes drawRadar {
    from {
      stroke-dasharray: 0 1000;
      fill-opacity: 0;
    }
    to {
      stroke-dasharray: 1000 0;
      fill-opacity: 0.4;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
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
