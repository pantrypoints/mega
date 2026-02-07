<script lang="ts">
    import { Users, Package, Zap, ShoppingBag, Briefcase, Heart, MessageSquare, TrendingUp, ArrowRightLeft, Send, HandHeart } from 'lucide-svelte';
    
    let { data } = $props();
    let activeTab = $state('users');

    // Simple SVG Sparkline helper
    function getPath(values: number[]) {
        if (values.length < 2) return "";
        const max = Math.max(...values, 1);
        const height = 40;
        const width = 160;
        return values.map((v, i) => {
            const x = (i / (values.length - 1)) * width;
            const y = height - (v / max) * height;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    }
</script>



<div class="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-4 sm:p-8">
    <div class="mx-auto max-w-6xl">
        
        <div class="mb-10 text-center">
            <h1 class="text-3xl font-black text-gray-900 tracking-tighter">Server Dashboard</h1>
            <p class="text-sm font-bold text-gray-500 opacity-70">Updated Real-time</p>
        </div>

        <div class="overflow-hidden rounded-3xl border-t-4 border-sky-500 bg-white shadow-2xl">
            <div class="flex border-b border-gray-100 bg-gray-50/50">
                {#each ['users', 'items', 'points'] as tab}
                    <button 
                        onclick={() => activeTab = tab}
                        class="flex-1 px-6 py-5 text-center font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs
                        {activeTab === tab ? 'bg-white text-sky-600 border-b-4 border-sky-600' : 'text-gray-400 hover:bg-gray-100'}"
                    >
                        {#if tab === 'users'}<Users class="w-4 h-4"/>{/if}
                        {#if tab === 'items'}<Package class="w-4 h-4"/>{/if}
                        {#if tab === 'points'}<Zap class="w-4 h-4"/>{/if}
                        {tab}
                    </button>
                {/each}
            </div>

            <div class="p-6 lg:p-10">
                {#if activeTab === 'users'}
                    <div class="grid gap-6 md:grid-cols-3">
                        <div class="bg-sky-50 rounded-2xl p-8 border border-sky-100 flex flex-col justify-center">
                            <p class="text-sky-600 font-black text-xs uppercase tracking-widest mb-1">Total Users</p>
                            <h2 class="text-6xl font-black text-sky-900 tracking-tighter">{data.userStats.total}</h2>
                        </div>
                        <div class="md:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="text-gray-400 font-bold text-xs uppercase">Monthly Registration Trend</h3>
                                <TrendingUp class="text-emerald-400 w-5 h-5" />
                            </div>
                            <svg viewBox="0 0 160 40" class="w-full h-24 stroke-sky-500 fill-none stroke-[3]" preserveAspectRatio="none">
                                <path d={getPath(data.userStats.trend)} stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>

                {:else if activeTab === 'items'}
                    <div class="mb-10 flex items-end gap-4">
                        <div class="h-16 w-2 bg-sky-500 rounded-full"></div>
                        <div>
                            <p class="text-gray-400 font-bold text-xs uppercase">Total Inventory</p>
                            <h2 class="text-5xl font-black text-gray-900 leading-none">
                                {Object.values(data.itemStats.counts).reduce((a, b) => a + b, 0)}
                            </h2>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div class="bg-orange-50 rounded-2xl p-6 border border-orange-100 group">
                            <ShoppingBag class="text-orange-500 w-8 h-8 mb-4 group-hover:scale-110 transition" />
                            <p class="text-xs font-bold text-orange-600 uppercase mb-1">Products</p>
                            <p class="text-3xl font-black text-gray-900">{data.itemStats.counts.products}</p>
                            <div class="mt-4 flex flex-wrap gap-1">
                                {#each data.itemStats.topProducts as cat}
                                    <span class="text-[9px] bg-white/60 px-2 py-0.5 rounded-full font-bold text-orange-800">#{cat.category}</span>
                                {/each}
                            </div>
                        </div>

                        <div class="bg-purple-50 rounded-2xl p-6 border border-purple-100 group">
                            <Briefcase class="text-purple-500 w-8 h-8 mb-4 group-hover:scale-110 transition" />
                            <p class="text-xs font-bold text-purple-600 uppercase mb-1">Services</p>
                            <p class="text-3xl font-black text-gray-900">{data.itemStats.counts.services}</p>
                            <div class="mt-4 flex flex-wrap gap-1">
                                {#each data.itemStats.topServices as cat}
                                    <span class="text-[9px] bg-white/60 px-2 py-0.5 rounded-full font-bold text-purple-800">#{cat.category}</span>
                                {/each}
                            </div>
                        </div>

                        <div class="bg-pink-50 rounded-2xl p-6 border border-pink-100">
                            <Heart class="text-pink-500 w-8 h-8 mb-4" />
                            <p class="text-xs font-bold text-pink-600 uppercase mb-1">Wishes</p>
                            <p class="text-3xl font-black text-gray-900">{data.itemStats.counts.wishes}</p>
                        </div>

                        <div class="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                            <MessageSquare class="text-blue-500 w-8 h-8 mb-4" />
                            <p class="text-xs font-bold text-blue-600 uppercase mb-1">Requests</p>
                            <p class="text-3xl font-black text-gray-900">{data.itemStats.counts.requests}</p>
                        </div>
                    </div>

                {:else if activeTab === 'points'}
                    <div class="grid gap-6">
                        <div class="bg-emerald-600 rounded-3xl p-8 text-white flex justify-between items-center shadow-lg shadow-emerald-100">
                            <div>
                                <p class="opacity-70 text-xs font-bold uppercase tracking-widest mb-1">Circulating Wealth</p>
                                <h2 class="text-6xl font-black tracking-tighter">{data.pointStats.total.toLocaleString()}</h2>
                            </div>
                            <Zap class="w-16 h-16 opacity-30" />
                        </div>

                        <div class="grid md:grid-cols-3 gap-4">
                            {#each data.pointStats.breakdown as type}
                                <div class="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-between">
                                    <div class="flex items-center gap-4">
                                        <div class="p-3 bg-gray-50 rounded-xl">
                                            {#if type.kind === 'debt'}<ArrowRightLeft class="text-red-500"/>{/if}
                                            {#if type.kind === 'credit'}<HandHeart class="text-emerald-500"/>{/if}
                                        </div>
                                        <div>
                                            <p class="text-[10px] font-black text-gray-400 uppercase">{type.kind}</p>
                                            <p class="text-2xl font-black">{type.txCount}</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-xs font-bold text-gray-400">Total Volume</p>
                                        <p class="font-bold text-sky-600">{type.total.toLocaleString()} pts</p>
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