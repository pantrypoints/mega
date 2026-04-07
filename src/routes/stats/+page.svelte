<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import { Users, Package, Zap, TrendingUp, ShoppingBag, Briefcase, Heart, MessageSquare, ArrowRightLeft, HandHeart } from 'lucide-svelte';
  
  let activeTab = $state('users');
  
  let { data } = $props();
  
  // Helper function to generate SVG path from trend data
  function getPath(trend: number[]) {
    if (!trend || trend.length === 0) return '';
    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min || 1;
    const step = 160 / (trend.length - 1);
    
    return trend.map((value, i) => {
      const x = i * step;
      const y = 40 - ((value - min) / range) * 30;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 dark:from-black dark:to-teal-950 p-4 sm:p-8">
  <div class="mx-auto max-w-6xl">
    
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
        {m.server_dashboard()}
      </h1>
      <p class="text-sm font-bold text-gray-500 dark:text-gray-400 opacity-70">
        {m.updated_realtime()}
      </p>
    </div>

    <div class="overflow-hidden rounded-3xl border-t-4 border-sky-500 dark:border-sky-600 bg-white dark:bg-gray-900 shadow-2xl">
      <!-- Tabs -->
      <div class="flex border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
        {#each [
          { id: 'users', label: m.users(), icon: Users },
          { id: 'items', label: m.items(), icon: Package },
          { id: 'points', label: m.points(), icon: Zap }
        ] as tab}
          <button 
            onclick={() => activeTab = tab.id}
            class="flex-1 px-6 py-5 text-center font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs
            {activeTab === tab.id 
              ? 'bg-white dark:bg-gray-900 text-sky-600 dark:text-sky-400 border-b-4 border-sky-600 dark:border-sky-400' 
              : 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}"
          >
            <tab.icon class="w-4 h-4" />
            {tab.label}
          </button>
        {/each}
      </div>

      <div class="p-6 lg:p-10">
        <!-- Users Tab -->
        {#if activeTab === 'users'}
          <div class="grid gap-6 md:grid-cols-3">
            <div class="bg-sky-50 dark:bg-sky-950/50 rounded-2xl p-8 border border-sky-100 dark:border-sky-900 flex flex-col justify-center">
              <p class="text-sky-600 dark:text-sky-400 font-black text-xs uppercase tracking-widest mb-1">
                {m.total_users()}
              </p>
              <h2 class="text-6xl font-black text-sky-900 dark:text-sky-300 tracking-tighter">
                {data.userStats.total}
              </h2>
            </div>
            <div class="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-gray-400 dark:text-gray-500 font-bold text-xs uppercase">
                  {m.monthly_registration_trend()}
                </h3>
                <TrendingUp class="text-emerald-400 dark:text-emerald-500 w-5 h-5" />
              </div>
              <svg viewBox="0 0 160 40" class="w-full h-24 stroke-sky-500 dark:stroke-sky-400 fill-none stroke-[3]" preserveAspectRatio="none">
                <path d={getPath(data.userStats.trend)} stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>

        <!-- Items Tab -->
        {:else if activeTab === 'items'}
          <div class="mb-10 flex items-end gap-4">
            <div class="h-16 w-2 bg-sky-500 dark:bg-sky-600 rounded-full"></div>
            <div>
              <p class="text-gray-400 dark:text-gray-500 font-bold text-xs uppercase">
                {m.total_items()}
              </p>
              <h2 class="text-5xl font-black text-gray-900 dark:text-white leading-none">
                {Object.values(data.itemStats.counts).reduce((a, b) => a + b, 0)}
              </h2>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Products -->
            <div class="bg-orange-50 dark:bg-orange-950/50 rounded-2xl p-6 border border-orange-100 dark:border-orange-900 group">
              <ShoppingBag class="text-orange-500 dark:text-orange-400 w-8 h-8 mb-4 group-hover:scale-110 transition" />
              <p class="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase mb-1">{m.products()}</p>
              <p class="text-3xl font-black text-gray-900 dark:text-white">{data.itemStats.counts.products}</p>
              <div class="mt-4 flex flex-wrap gap-1">
                {#each data.itemStats.topProducts as cat}
                  <span class="text-[9px] bg-white/60 dark:bg-gray-800/60 px-2 py-0.5 rounded-full font-bold text-orange-800 dark:text-orange-300">#{cat.category}</span>
                {/each}
              </div>
            </div>

            <!-- Services -->
            <div class="bg-purple-50 dark:bg-purple-950/50 rounded-2xl p-6 border border-purple-100 dark:border-purple-900 group">
              <Briefcase class="text-purple-500 dark:text-purple-400 w-8 h-8 mb-4 group-hover:scale-110 transition" />
              <p class="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase mb-1">{m.services()}</p>
              <p class="text-3xl font-black text-gray-900 dark:text-white">{data.itemStats.counts.services}</p>
              <div class="mt-4 flex flex-wrap gap-1">
                {#each data.itemStats.topServices as cat}
                  <span class="text-[9px] bg-white/60 dark:bg-gray-800/60 px-2 py-0.5 rounded-full font-bold text-purple-800 dark:text-purple-300">#{cat.category}</span>
                {/each}
              </div>
            </div>

            <!-- Wishes -->
            <div class="bg-pink-50 dark:bg-pink-950/50 rounded-2xl p-6 border border-pink-100 dark:border-pink-900">
              <Heart class="text-pink-500 dark:text-pink-400 w-8 h-8 mb-4" />
              <p class="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase mb-1">{m.wishes()}</p>
              <p class="text-3xl font-black text-gray-900 dark:text-white">{data.itemStats.counts.wishes}</p>
            </div>

            <!-- Requests -->
            <div class="bg-blue-50 dark:bg-blue-950/50 rounded-2xl p-6 border border-blue-100 dark:border-blue-900">
              <MessageSquare class="text-blue-500 dark:text-blue-400 w-8 h-8 mb-4" />
              <p class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">{m.requests()}</p>
              <p class="text-3xl font-black text-gray-900 dark:text-white">{data.itemStats.counts.requests}</p>
            </div>
          </div>

        <!-- Points Tab -->
        {:else if activeTab === 'points'}
          <div class="grid gap-6">
            <div class="bg-emerald-600 dark:bg-emerald-700 rounded-3xl p-8 text-white flex justify-between items-center shadow-lg shadow-emerald-100 dark:shadow-emerald-950/50">
              <div>
                <p class="opacity-70 text-xs font-bold uppercase tracking-widest mb-1">
                  {m.circulating_wealth()}
                </p>
                <h2 class="text-6xl font-black tracking-tighter">{data.pointStats.total.toLocaleString()}</h2>
              </div>
              <Zap class="w-16 h-16 opacity-30" />
            </div>

            <div class="grid md:grid-cols-3 gap-4">
              {#each data.pointStats.breakdown as type}
                <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      {#if type.kind === 'debt'}
                        <ArrowRightLeft class="text-red-500 dark:text-red-400 w-5 h-5" />
                      {:else if type.kind === 'credit'}
                        <HandHeart class="text-emerald-500 dark:text-emerald-400 w-5 h-5" />
                      {/if}
                    </div>
                    <div>
                      <p class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase">
                        {type.kind === 'debt' ? m.exchange() : m.donation()}
                      </p>
                      <p class="text-2xl font-black text-gray-900 dark:text-white">{type.txCount}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-xs font-bold text-gray-400 dark:text-gray-500">{m.total_volume()}</p>
                    <p class="font-bold text-sky-600 dark:text-sky-400">{type.total.toLocaleString()} {m.pts()}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

