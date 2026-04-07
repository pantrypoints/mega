<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as m from '$lib/paraglide/messages';
  import { MapPin, Mail, Clock, MessageCircle, Send, Globe } from 'lucide-svelte';
  
  let mapInitialized = false;
  let mapContainer: HTMLDivElement;
  let map: any; // Store map instance for cleanup
  
  const officeLat = 14.5555;
  const officeLng = 121.0117;
  
  onMount(async () => {
    // 1. Dynamically import Leaflet only on the client
    const L = await import('leaflet');
    
    // 2. Safety check for the container
    if (!mapContainer || mapInitialized) return;

    // 3. Initialize Map
    map = L.map(mapContainer).setView([officeLat, officeLng], 16);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // 4. Add Marker
    const marker = L.marker([officeLat, officeLng]).addTo(map);
    marker.bindPopup(`
      <div class="text-slate-900 font-sans">
        <b class="text-sky-600">Pantrypoints</b><br/>
        11F, Frabelle Business Center<br/>
        111 Rada, Legazpi Village<br/>
        Makati City
      </div>
    `).openPopup();
    
    mapInitialized = true;
  });

  // 5. Explicit Cleanup
  onDestroy(() => {
    if (map) {
      map.remove();
    }
  });

  
  // Contact methods
  const contactMethods = [
    // { icon: Phone, label: m.phone(), value: '+63 2 1234 5678', href: 'tel:+63212345678', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/50' },
    { icon: Mail, label: m.email(), value: 'hello@pantrypoints.com', href: 'mailto:hello@pantrypoints.com', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/50' },
    // { icon: MessageCircle, label: m.viber(), value: '+63 912 3456 789', href: 'viber://chat?number=639123456789', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/50' }
  ];
  
  // Business hours
  const businessHours = [
    { day: m.monday_friday(), hours: m.weekday_hours(), active: true },
    { day: m.saturday(), hours: m.saturday_hours(), active: true },
    { day: m.sunday(), hours: m.closed(), active: false }
  ];
</script>




<svelte:head>
  <title>{m.contact_us()} — Pantrypoints</title>
  <meta name="description" content={m.contact_description()} />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    .custom-marker {
      width: 30px;
      height: 30px;
      background: #0ea5e9;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .custom-marker:hover {
      transform: scale(1.1);
      background: #0284c7;
    }
    .custom-marker-wrapper {
      background: transparent;
    }
  </style>
</svelte:head>

<div class="min-h-screen bg-sky-50 dark:bg-black flex flex-col items-center p-4 sm:p-8">
  <div class="w-full max-w-5xl bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-600">
    
    <!-- Back Button -->
    <a href="/" class="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition mb-6 font-medium">
      ← {m.back_to_home()}
    </a>

    <!-- Header -->
    <div class="mb-8 text-center sm:text-left">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">
        {m.contact_us()}
      </h1>
      <p class="text-xl text-sky-600 dark:text-sky-400 font-semibold">
        {m.contact_subtitle()}
      </p>
      <p class="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl">
        {m.contact_description()}
      </p>
    </div>

    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
      
      <!-- Left Column: Contact Info & Hours -->
      <div class="space-y-6">
        <!-- Address Card -->
        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950/50 flex items-center justify-center">
                <MapPin class="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{m.office_address()}</h3>
              <address class="not-italic text-gray-600 dark:text-gray-400 leading-relaxed">
                11F, Frabelle Business Center<br />
                111 Rada, Legazpi Village<br />
                Makati City, 1229 Metro Manila<br />
                Philippines
              </address>
              <a href="https://maps.google.com/?q=11F+Frabelle+Business+Center+111+Rada+Legazpi+Village+Makati" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="inline-flex items-center gap-1 mt-3 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition">
                <Globe class="w-4 h-4" />
                {m.view_on_map()}
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Methods -->
        {#each contactMethods as method}
          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition group">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl {method.bg} flex items-center justify-center group-hover:scale-110 transition">
                  <method.icon class="w-6 h-6 {method.color}" />
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{method.label}</p>
                  <a href={method.href} class="text-lg font-semibold text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition">
                    {method.value}
                  </a>
                </div>
              </div>
              <Send class="w-4 h-4 text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition" />
            </div>
          </div>
        {/each}

        <!-- Business Hours -->
        <!-- <div class="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/50 flex items-center justify-center">
              <Clock class="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{m.business_hours()}</h3>
          </div>
          <div class="space-y-2">
            {#each businessHours as hours}
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <span class="font-medium text-gray-700 dark:text-gray-300">{hours.day}</span>
                <span class="text-gray-600 dark:text-gray-400 {!hours.active ? 'opacity-50' : ''}">
                  {hours.hours}
                </span>
              </div>
            {/each}
          </div>
          <div class="mt-4 pt-3 text-xs text-gray-500 dark:text-gray-500 italic">
            {m.holiday_note()}
          </div>
        </div> -->

        <!-- Quick Contact Form (Optional) -->
        <div class="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30 rounded-2xl p-6 border border-sky-200 dark:border-sky-800">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-sky-500 dark:bg-sky-600 flex items-center justify-center">
              <MessageCircle class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{m.quick_question()}</h3>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {m.quick_question_desc()}
          </p>
          <a href="https://www.facebook.com/pantrypoints/" 
             target="_blank" 
             rel="noopener noreferrer"
             class="flex items-center justify-center gap-2 w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition transform hover:scale-[1.02]">
            <MessageCircle class="w-4 h-4" />
            {m.message_us_on_messenger()}
          </a>
        </div>
        
      </div>

      <!-- Right Column: Map -->
      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/50 flex items-center justify-center">
              <MapPin class="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{m.find_us()}</h3>
          </div>
          
          <!-- Map Container -->
          <div class="overflow-hidden rounded-xl shadow-lg">
            <div bind:this={mapContainer} class="w-full h-[400px] bg-gray-200 dark:bg-gray-700"></div>
          </div>
          
          <div class="mt-4 text-center">
            <a href="https://www.openstreetmap.org/directions?engine=graphhopper&route=&destination=14.5555%2C121.0117" 
               target="_blank" 
               rel="noopener noreferrer"
               class="inline-flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition">
              <MapPin class="w-4 h-4" />
              {m.get_directions()}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Note -->
<!--     <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>{m.contact_response_time()}</p>
    </div> -->
  </div>
</div>
