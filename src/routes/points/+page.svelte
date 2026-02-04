<script lang="ts">
  import type { PageData } from './$types';
  import { ArrowRightLeft, Heart, Send, User, TrendingUp, TrendingDown, ArrowRight } from 'lucide-svelte';
  import { m } from '$lib/paraglide/messages.js';

  export let data: PageData;
  const { stats, topPartners, transactions } = data;

  let activeTab: 'exchange' | 'donation' | 'transfer' = 'exchange';

  $: currentTop = topPartners[activeTab];
  $: currentStats = stats[activeTab];
  $: filteredTx = transactions.filter(t => t.kind === activeTab);
</script>



<div class="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-4 sm:p-6 lg:p-8">
  <div class="max-w-6xl mx-auto">
    
    <div class="mb-8 text-center">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
        {m.points()}
      </h1>
<!--       <p class="text-lg text-gray-600">
        {m.tx_manage()}
      </p> -->
    </div>

    <div class="bg-white rounded-3xl shadow-2xl border-t-4 border-sky-500 overflow-hidden">
      
      <div class="border-b border-gray-200 bg-gray-50">
        <div class="flex">
          {#each ['exchange', 'donation', 'transfer'] as tab}
            <button
              on:click={() => activeTab = tab}
              class="flex-1 px-6 py-4 text-center font-bold transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
              class:bg-white={activeTab === tab}
              class:text-sky-600={activeTab === tab}
              class:border-b-4={activeTab === tab}
              class:border-sky-600={activeTab === tab}
              class:text-gray-500={activeTab !== tab}
              class:hover:bg-gray-100={activeTab !== tab}>
              {#if tab === 'exchange'}<ArrowRightLeft class="w-4 h-4"/>{/if}
              {#if tab === 'donation'}<Heart class="w-4 h-4"/>{/if}
              {#if tab === 'transfer'}<Send class="w-4 h-4"/>{/if}
              {tab}
            </button>
          {/each}
        </div>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p class="text-emerald-600 font-bold text-xs uppercase tracking-widest mb-1">Total Given (Out)</p>
              <h2 class="text-3xl font-black text-emerald-700">{currentStats.giver.toFixed(2)}</h2>
            </div>
            <TrendingUp class="w-12 h-12 text-emerald-200" />
          </div>
          <div class="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p class="text-sky-600 font-bold text-xs uppercase tracking-widest mb-1">Total Received (In)</p>
              <h2 class="text-3xl font-black text-sky-700">{currentStats.getter.toFixed(2)}</h2>
            </div>
            <TrendingDown class="w-12 h-12 text-sky-200" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm">
                <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">Biggest Recipient</h3>
                {#if currentTop.biggestGetter}
                    <a href="/users/{currentTop.biggestGetter.slug}" class="flex items-center gap-4 group">
                        <div class="relative">
                            {#if currentTop.biggestGetter.avatar}
                                <img src={currentTop.biggestGetter.avatar} alt="" class="w-14 h-14 rounded-full border-2 border-sky-500 p-0.5" />
                            {:else}
                                <div class="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center"><User /></div>
                            {/if}
                            <div class="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1"><ArrowRight class="w-3 h-3"/></div>
                        </div>
                        <div>
                            <p class="font-bold text-gray-900 group-hover:text-sky-600 transition">{currentTop.biggestGetter.username}</p>
                            <p class="text-xs text-gray-500">{currentTop.biggestGetter.total.toFixed(2)} points total</p>
                        </div>
                    </a>
                {:else}
                    <p class="text-sm italic text-gray-400">No recipients yet</p>
                {/if}
            </div>

            <div class="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm">
                <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">Biggest Provider</h3>
                {#if currentTop.biggestGiver}
                    <a href="/users/{currentTop.biggestGiver.slug}" class="flex items-center gap-4 group">
                        <div class="relative">
                            {#if currentTop.biggestGiver.avatar}
                                <img src={currentTop.biggestGiver.avatar} alt="" class="w-14 h-14 rounded-full border-2 border-emerald-500 p-0.5" />
                            {:else}
                                <div class="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center"><User /></div>
                            {/if}
                            <div class="absolute -bottom-1 -right-1 bg-sky-500 text-white rounded-full p-1 rotate-180"><ArrowRight class="w-3 h-3"/></div>
                        </div>
                        <div>
                            <p class="font-bold text-gray-900 group-hover:text-sky-600 transition">{currentTop.biggestGiver.username}</p>
                            <p class="text-xs text-gray-500">{currentTop.biggestGiver.total.toFixed(2)} points total</p>
                        </div>
                    </a>
                {:else}
                    <p class="text-sm italic text-gray-400">No providers yet</p>
                {/if}
            </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-xs font-bold text-gray-400 uppercase border-b border-gray-100">
                <th class="px-4 py-3">Transaction</th>
                <th class="px-4 py-3">Role</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3 text-right">Points</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              {#each filteredTx as tx}
                <tr class="hover:bg-gray-50 transition">
                  <td class="px-4 py-4">
                    <p class="font-bold text-gray-900">{tx.name}</p>
                    <p class="text-xs text-gray-400 font-mono">{tx.category}</p>
                  </td>
                  <td class="px-4 py-4">
                    <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter"
                      class:bg-emerald-100={tx.isGiver} class:text-emerald-700={tx.isGiver}
                      class:bg-sky-100={!tx.isGiver} class:text-sky-700={!tx.isGiver}>
                      {tx.isGiver ? 'Giver' : 'Getter'}
                    </span>
                  </td>
                  <td class="px-4 py-4">
                    <span class="text-sm text-gray-600 italic">{tx.status}</span>
                  </td>
                  <td class="px-4 py-4 text-right font-black" class:text-emerald-600={tx.isGiver} class:text-sky-600={!tx.isGiver}>
                    {tx.isGiver ? '-' : '+'}{tx.points.toFixed(2)}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>