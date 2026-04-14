<script lang="ts">
  import type { PageData } from './$types';
  import { LockKeyholeOpen, Info, Pen, HandPlatter, HandHelping, HandHeart, HandCoins, ArrowRightLeft, Heart, Brain, BicepsFlexed, Moon, FlaskConical, Orbit, Sun, HandFist, Flower, Sword, Sparkles, MessageCircle, Users, ArrowLeft, User, Star, Tag, MapPin, Calendar, Mail, Phone } from 'lucide-svelte';
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
  
  // --- EXISTING PATH FOR VIEWED USER ---
  $: dataPolygonPath = personalityAttributes
    .map((d, i) => {
      const { x, y } = getCoordinate(i, d.value);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ') + ' Z';






  // --- NEW: LOGIC FOR CURRENT USER OVERLAY ---
  let currentUserAttributes: {label: string, value: number}[] = [];
  let matchPercentage = 0;
  let currentUserPolygonPath = '';

  $: if (data.currentUser && currentUserId !== user.id) {
    // 1. Map current user attributes
    currentUserAttributes = [
      { label: 'Heart', value: data.currentUser.heart || 0 },
      { label: 'Brain', value: data.currentUser.brain || 0 },
      { label: 'Body', value: data.currentUser.body || 0 },
      { label: 'Luna', value: data.currentUser.luna || 0 },
      { label: 'Mercury', value: data.currentUser.mercury || 0 },
      { label: 'Saturn', value: data.currentUser.saturn || 0 },
      { label: 'Apollo', value: data.currentUser.apollo || 0 },
      { label: 'Jupiter', value: data.currentUser.jupiter || 0 },
      { label: 'Venus', value: data.currentUser.venus || 0 },
      { label: 'Mars', value: data.currentUser.mars || 0 }
    ];

    // 2. Calculate % Match (Max difference per trait is 4. Total max diff is 4 * 10 = 40)
    let totalDiff = 0;
    for (let i = 0; i < personalityAttributes.length; i++) {
      totalDiff += Math.abs(personalityAttributes[i].value - currentUserAttributes[i].value);
    }
    const maxDiff = 40; 
    matchPercentage = Math.round(((maxDiff - totalDiff) / maxDiff) * 100);

    // 3. Generate Current User Path
    currentUserPolygonPath = currentUserAttributes
      .map((d, i) => {
        const { x, y } = getCoordinate(i, d.value);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ') + ' Z';
  }


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


    
    // Helper to get status label from code
    function getStatusLabel(code: string): string {
        const statusMap: Record<string, string> = {
            's': m.status_single(),
            'sp': m.status_single_parent(),
            'rnc': m.status_relationship_no_children(),
            'rwc': m.status_relationship_with_children(),
            'enc': m.status_engaged_no_children(),
            'ewc': m.status_engaged_with_children(),
            'mnc': m.status_married_no_children(),
            'mwc': m.status_married_with_children(),
            'dnc': m.status_divorced_no_children(),
            'dwc': m.status_divorced_with_children(),
            'wnc': m.status_widowed_no_children(),
            'wwc': m.status_widowed_with_children(),
            'sepnc': m.status_separated_no_children(),
            'sepwc': m.status_separated_with_children()
        };
        return statusMap[code] || code || m.not_specified();
    }

    // Helper to get seeking labels from comma-separated codes
    function getSeekingLabels(codes: string): string[] {
        if (!codes) return [];
        const codeArray = codes.split(',');
        const seekingMap: Record<string, string> = {
            'pc': m.seeking_professional_connections(),
            'bc': m.seeking_business_connections(),
            'ap': m.seeking_activity_partner(),
            'f': m.seeking_friendship(),
            'cf': m.seeking_close_friendship(),
            'rr': m.seeking_romantic_relationship(),
            'm': m.seeking_marriage()
        };
        return codeArray.map(code => seekingMap[code] || code);
    }

    // Helper to get ethnicity label
    function getEthnicityLabel(code: string): string {
        const ethnicityMap: Record<string, string> = {
            'east_asian': m.ethnicity_east_asian(),
            'south_asian': m.ethnicity_south_asian(),
            'southeast_asian': m.ethnicity_southeast_asian(),
            'middle_eastern': m.ethnicity_middle_eastern(),
            'white': m.ethnicity_white(),
            'latino': m.ethnicity_latino(),
            'native_american': m.ethnicity_native_american(),
            'african': m.ethnicity_african(),
            'pacific_islander': m.ethnicity_pacific_islander(),
            'arctic': m.ethnicity_arctic(),
            'other': m.ethnicity_other()
        };
        return ethnicityMap[code] || code || m.not_specified();
    }

    // Helper to get nationality label
    function getNationalityLabel(code: string): string {
        const nationalityMap: Record<string, string> = {
            'us': 'United States',
            'uk': 'United Kingdom',
            'ca': 'Canada',
            'au': 'Australia',
            'de': 'Germany',
            'fr': 'France',
            'jp': 'Japan',
            'cn': 'China',
            'in': 'India',
            'ph': 'Philippines',
            'vn': 'Vietnam',
            'th': 'Thailand',
            'id': 'Indonesia',
            'my': 'Malaysia',
            'sg': 'Singapore',
            'other': m.other()
        };
        return nationalityMap[code] || code || m.not_specified();
    }
</script>

<svelte:head>
  <title>{user.username} - Circle App</title>
</svelte:head>




<div class="min-h-screen bg-sky-50 dark:bg-black flex flex-col items-center p-4 sm:p-8">
  <div class="w-full max-w-4xl bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-600 transform transition duration-500 hover:shadow-3xl">
    
    <!-- Back Button -->
    <a href="/users" class="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" />
      {m.back_to_users()}
    </a>
    
    <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
      <div class="flex-shrink-0">
        {#if user.avatar}
          <img src={user.avatar} alt={user.username} class="w-32 h-32 rounded-full object-cover border-4 border-teal-100 dark:border-teal-900 shadow-xl" />
        {:else}
          <div class="w-32 h-32 rounded-full bg-teal-500 dark:bg-teal-600 flex items-center justify-center border-4 border-teal-100 dark:border-teal-900 shadow-xl">
            <User class="w-16 h-16 text-white" />
          </div>
        {/if}
        {#if currentUserId !== user.id}
          <a href="/chat?with={user.id}" class="my-6 flex items-center justify-center gap-2 bg-teal-600 dark:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-teal-700 dark:hover:bg-teal-600 transition transform hover:scale-105 text-center">
            <MessageCircle class="w-4 h-4" />
            {m.chat()}
          </a>
        {:else}
          <a href="/users/{user.slug}/edit" class="my-6 flex items-center justify-center gap-2 bg-teal-600 dark:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-teal-700 dark:hover:bg-teal-600 transition transform hover:scale-105 text-center">
            <Pen class="w-4 h-4" />
            {m.edit()}
          </a>  
          <a href="/security" class="my-6 flex items-center justify-center gap-2 bg-teal-600 dark:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-teal-700 dark:hover:bg-teal-600 transition transform hover:scale-105 text-center">
            <LockKeyholeOpen class="w-4 h-4" />
            {m.reset_password()}
          </a>

        {/if}
      </div>
      
      <div class="flex-grow text-center sm:text-left">
          <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{user.username}</h1>
          
          <!-- Basic Info - Always visible -->
          <div class="flex flex-wrap gap-3 justify-center sm:justify-start text-sm text-gray-600 dark:text-gray-400 mb-3">
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
          </div>


          <!-- Relationship Bar - Conditional Display -->
          {#if currentUserId === user.id}
              <!-- Current User - Always see their own details -->
              <div class="flex flex-wrap items-center gap-3 mb-4 p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 rounded-xl border border-pink-200 dark:border-pink-800">
                  <!-- Relationship Mode -->
                  <div class="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                      <Heart class="w-3.5 h-3.5 text-rose-500" />
                      <span class="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {user.rel === 'on' ? m.visible() : m.hidden()}
                      </span>
                  </div>

                  <!-- Status -->
                  {#if user.status}
                      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                          <Users class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          <span class="text-xs font-medium text-purple-700 dark:text-purple-300">{getStatusLabel(user.status)}</span>
                      </div>
                  {/if}

                  <!-- Seeking -->
                  {#if user.seeking}
                      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                          <Sparkles class="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                          <span class="text-xs font-medium text-pink-700 dark:text-pink-300">
                              {getSeekingLabels(user.seeking).slice(0, 2).join(', ')}{#if getSeekingLabels(user.seeking).length > 2}+{/if}
                          </span>
                      </div>
                  {/if}

                  <!-- Ethnicity -->
                  {#if user.ethnicity}
                      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                          <Users class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span class="text-xs font-medium text-amber-700 dark:text-amber-300">{getEthnicityLabel(user.ethnicity)}</span>
                      </div>
                  {/if}

                  <!-- Nationality -->
                  {#if user.nationality}
                      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <MapPin class="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                          <span class="text-xs font-medium text-green-700 dark:text-green-300">{getNationalityLabel(user.nationality)}</span>
                      </div>
                  {/if}
              </div>

          {:else if user.rel === 'on'}
              <!-- Other User - Only show if they have view ON -->
              <div class="flex flex-wrap items-center gap-3 mb-4 p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 rounded-xl border border-pink-200 dark:border-pink-800">
                  <!-- Status -->
                  {#if user.status}
                      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                          <Users class="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          <span class="text-xs font-medium text-purple-700 dark:text-purple-300">{getStatusLabel(user.status)}</span>
                      </div>
                  {/if}

                  <!-- Seeking -->
                  {#if user.seeking}
                      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                          <Sparkles class="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                          <span class="text-xs font-medium text-pink-700 dark:text-pink-300">
                              {getSeekingLabels(user.seeking).slice(0, 2).join(', ')}{#if getSeekingLabels(user.seeking).length > 2}+{/if}
                          </span>
                      </div>
                  {/if}

                  <!-- Ethnicity -->
                  {#if user.ethnicity}
                      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                          <Users class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span class="text-xs font-medium text-amber-700 dark:text-amber-300">{getEthnicityLabel(user.ethnicity)}</span>
                      </div>
                  {/if}

                  <!-- Nationality -->
                  {#if user.nationality}
                      <div class="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <MapPin class="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                          <span class="text-xs font-medium text-green-700 dark:text-green-300">{getNationalityLabel(user.nationality)}</span>
                      </div>
                  {/if}
              </div>
          {:else}
              <!-- Other User with view OFF - Show privacy notice -->
              <div class="flex items-center justify-center gap-2 mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <Info class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span class="text-xs text-gray-500 dark:text-gray-400">{m.privacy_view_off()}</span>
              </div>
          {/if}

          <!-- Dominant Traits with Colorful Badges bar -->
          <div class="inline-flex flex-wrap items-center gap-2 bg-teal-50 dark:bg-teal-950/50 border border-teal-100 dark:border-teal-900 px-4 py-2 rounded-2xl">
              <div class="flex items-center gap-1">
                  <Sparkles class="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span class="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">{m.dominant()}:</span>
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





<div class="w-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 sm:p-10 my-8 flex flex-col items-center">
      <header class="text-center mb-6">
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white">{m.personality_id()}</h3>
        <p class="text-sm text-gray-400 dark:text-gray-100">{m.ave()}</p>
        
        {#if data.currentUser && currentUserId !== user.id}
          <p class="text-sm font-bold mt-2 px-3 py-1 bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 rounded-full inline-block">
            Personality ID {matchPercentage}% match with yours
          </p>
        {/if}
      </header>
      
      <div class="relative overflow-visible">
        <svg width={center * 2} height={center * 2} viewBox={`0 0 ${center * 2} ${center * 2}`} class="overflow-visible">
          {#each ringPaths as path, i}
            <path d={path} fill="none" stroke={i === rings - 1 ? '#cbd5e1' : '#f1f5f9'} class={i === rings - 1 ? 'dark:stroke-gray-500' : 'dark:stroke-gray-700/50'} stroke-width="1.5" />
          {/each}

          {#each Array(spokes) as _, i}
            {@const { x, y } = getCoordinate(i, 4)}
            <line x1={center} y1={center} x2={x} y2={y} stroke="#f1f5f9" class="dark:stroke-gray-700" stroke-width="1" />
          {/each}

          {#if data.currentUser && currentUserId !== user.id}
            <path 
              d={currentUserPolygonPath} 
              fill={data.currentUser.gender === 'f' ? 'rgba(255, 182, 193, 0.15)' : 'rgba(59, 130, 246, 0.15)'} 
              stroke={data.currentUser.gender === 'f' ? 'rgba(219, 39, 119, 0.5)' : 'rgba(37, 99, 235, 0.5)'} 
              stroke-width="2" 
              stroke-dasharray="4,4"
              class="animate-radar" 
            />
          {/if}

          <path 
            d={dataPolygonPath} 
            fill={user.gender === 'f' ? 'rgba(255, 182, 193, 0.4)' : 'rgba(59, 130, 246, 0.4)'} 
            stroke={user.gender === 'f' ? '#db2777' : '#2563eb'} 
            stroke-width="3" 
            class="animate-radar" 
          />

          {#each personalityAttributes as d, i}
            {@const { x, y } = getCoordinate(i, d.value)}
            {@const colors = traitColors[d.label]}
            <circle cx={x} cy={y} r="5" fill={colors.iconColor.slice(5)} stroke="#fff" stroke-width="2" class="animate-point shadow-sm" />
            <text x={x} y={y} dy={y < center ? -15 : 20} text-anchor="middle" font-size="12" font-weight="bold" class="animate-point fill-current text-gray-700 dark:text-white" style="filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.2));">{d.value.toFixed(1)}</text>
          {/each}

          {#each personalityAttributes as d, i}
            {@const { x, y } = getCoordinate(i, 4.5)} 
            <text x={x} y={y} text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="800" class="uppercase tracking-tighter fill-current text-gray-800 dark:text-teal-300">{d.label}</text>
          {/each}
        </svg>
      </div>
    </div>




    <!-- Tabs -->
    <div class="border-b border-gray-200 dark:border-gray-800 mb-6">
      <nav class="flex gap-8">
        <button on:click={() => setTab('products')} class="pb-4 px-2 font-semibold transition-colors border-b-2"
          class:text-teal-600={activeTab === 'products'}
          class:dark:text-teal-400={activeTab === 'products'}
          class:border-teal-600={activeTab === 'products'}
          class:dark:border-teal-400={activeTab === 'products'}
          class:text-gray-500={activeTab !== 'products'}
          class:dark:text-gray-500={activeTab !== 'products'}
          class:border-transparent={activeTab !== 'products'}
          class:hover:text-teal-500={activeTab !== 'products'}
          class:dark:hover:text-teal-400={activeTab !== 'products'}>
          {m.products()} ({products.length})
        </button>
        <button on:click={() => setTab('services')} class="pb-4 px-2 font-semibold transition-colors border-b-2"
          class:text-teal-600={activeTab === 'services'}
          class:dark:text-teal-400={activeTab === 'services'}
          class:border-teal-600={activeTab === 'services'}
          class:dark:border-teal-400={activeTab === 'services'}
          class:text-gray-500={activeTab !== 'services'}
          class:dark:text-gray-500={activeTab !== 'services'}
          class:border-transparent={activeTab !== 'services'}
          class:hover:text-teal-500={activeTab !== 'services'}
          class:dark:hover:text-teal-400={activeTab !== 'services'}>
          {m.services()} ({services.length})
        </button>
        <button on:click={() => setTab('transactions')} class="pb-4 px-2 font-semibold transition-colors border-b-2"
          class:text-teal-600={activeTab === 'transactions'}
          class:dark:text-teal-400={activeTab === 'transactions'}
          class:border-teal-600={activeTab === 'transactions'}
          class:dark:border-teal-400={activeTab === 'transactions'}
          class:text-gray-500={activeTab !== 'transactions'}
          class:dark:text-gray-500={activeTab !== 'transactions'}
          class:border-transparent={activeTab !== 'transactions'}
          class:hover:text-teal-500={activeTab !== 'transactions'}
          class:dark:hover:text-teal-400={activeTab !== 'transactions'}>
          {m.tx()}
        </button>
      </nav>
    </div>
    
    <!-- Tab Content: Products -->
    {#if activeTab === 'products'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#if products.length === 0}
          <p class="text-gray-500 dark:text-gray-400 text-center col-span-full py-10">
            {m.nothing()}
          </p>
        {:else}
          {#each products as product (product.id)}
            <a href="/products/{product.id}">
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <!-- Product Image -->
                <div class="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img src={product.photo1 || 'https://placehold.co/800x600/f0f9ff/0e7490?text=No+Image'} alt={product.name} class="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <!-- Product Info -->
                <div class="p-6 space-y-3">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white truncate">{product.name}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.headline || 'No description'}</p>
                  <!-- Price and Category -->
                  <div class="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div class="flex items-center text-lg font-extrabold text-orange-600 dark:text-orange-400">
                      <Star class="w-4 h-4 mr-1 fill-orange-500 text-orange-500 dark:fill-orange-400 dark:text-orange-400" />
                      {product.points.toFixed(0)} {m.points()}
                    </div>
                    <span class="flex items-center text-xs px-2 py-1 bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-full font-medium">
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
          <p class="text-gray-500 dark:text-gray-400 text-center col-span-full py-10">
            {m.nothing()}
          </p>
        {:else}
          {#each services as service (service.id)}
            <a href="/services/{service.id}">
              <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <!-- Service Image -->
                <div class="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img src={service.photo1 || 'https://placehold.co/800x600/f0f9ff/0e7490?text=No+Image'} alt={service.name} class="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <!-- Service Info -->
                <div class="p-6 space-y-3">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white truncate">{service.name}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{service.headline || 'No description'}</p>
                  <!-- Price and Category -->
                  <div class="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div class="flex items-center text-lg font-extrabold text-orange-600 dark:text-orange-400">
                      <Star class="w-4 h-4 mr-1 fill-orange-500 text-orange-500 dark:fill-orange-400 dark:text-orange-400" />
                      {service.points.toFixed(0)} Points
                    </div>
                    <span class="flex items-center text-xs px-2 py-1 bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-full font-medium">
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
      <div class="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{m.type()}</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{m.role()}</th>
              <th class="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">{m.count()}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
            <tr>
              <td class="px-6 py-4 flex items-center gap-3">
                <div class="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg text-blue-600 dark:text-blue-400"><HandPlatter class="w-5 h-5" /></div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{m.exchange()}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{m.giver()}</td>
              <td class="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">{stats?.exchangeAsGiver || 0}</td>
            </tr>
            <tr>
              <td class="px-6 py-4 flex items-center gap-3">
                <div class="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg text-blue-600 dark:text-blue-400"><HandHelping class="w-5 h-5" /></div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{m.exchange()}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{m.getter()}</td>
              <td class="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">{stats?.exchangeAsGetter || 0}</td>
            </tr>
            <tr>
              <td class="px-6 py-4 flex items-center gap-3">
                <div class="p-2 bg-pink-50 dark:bg-pink-950 rounded-lg text-pink-600 dark:text-pink-400"><HandHeart class="w-5 h-5" /></div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{m.donation()}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{m.giver()}</td>
              <td class="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">{stats?.donationAsGiver || 0}</td>
            </tr>
            <tr>
              <td class="px-6 py-4 flex items-center gap-3">
                <div class="p-2 bg-pink-50 dark:bg-pink-950 rounded-lg text-pink-600 dark:text-pink-400"><HandCoins class="w-5 h-5" /></div>
                <span class="font-medium text-gray-700 dark:text-gray-300">{m.donation()}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{m.getter()}</td>
              <td class="px-6 py-4 text-center font-bold text-gray-900 dark:text-white">{stats?.donationAsGetter || 0}</td>
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