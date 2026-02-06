<script lang="ts">
    import { Mail, Globe, Smartphone, Monitor, Clock } from 'lucide-svelte';
    let { data } = $props();
</script>

<div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-5xl mx-auto">
        <header class="mb-8">
            <h1 class="text-3xl font-black text-gray-800 flex items-center gap-3">
                <Mail class="text-sky-500" size={32} /> Tracking Index
            </h1>
        </header>

        <div class="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Campaign/ID</th>
                        <th class="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Location</th>
                        <th class="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Device</th>
                        <th class="px-6 py-4 text-sm font-bold text-gray-500 uppercase">Opened At</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    {#each data.logs as log}
                        <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4">
                                <div class="font-bold text-gray-800">{log.title}</div>
                                <div class="text-xs font-mono text-gray-400">{log.emailId}</div>
                            </td>
                            <td class="px-6 py-4 text-gray-600">
                                <span class="flex items-center gap-2"><Globe size={14}/> {log.country}</span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="flex items-center gap-2 text-gray-600">
                                    {#if log.device === 'Mobile'}<Smartphone size={14} class="text-orange-500"/>{:else}<Monitor size={14} class="text-blue-500"/>{/if}
                                    {log.device}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-gray-500 text-sm">
                                <span class="flex items-center gap-2"><Clock size={14}/> {new Date(log.dateCreated).toLocaleString()}</span>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- <script lang="ts">
	import { 
		Mail, 
		Clock, 
		Globe, 
		Smartphone, 
		Monitor, 
		ExternalLink,
		RefreshCw
	} from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
	
	// Svelte 5 derived state for stats
	const totalOpens = $derived(data.logs.length);
	const uniqueEmails = $derived(new Set(data.logs.map(l => l.emailId)).size);

	async function refresh() {
		await invalidateAll();
	}
</script>

<div class="min-h-screen bg-slate-50 p-4 sm:p-8">
	<div class="max-w-6xl mx-auto">
		<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
			<div>
				<h1 class="text-3xl font-black text-slate-800 flex items-center gap-2">
					<Mail class="text-sky-500" size={32} />
					Email Analytics
				</h1>
				<p class="text-slate-500 font-medium">Tracking pixel instances and engagement</p>
			</div>
			
			<button 
				onclick={refresh}
				class="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition flex items-center gap-2 font-bold text-slate-600"
			>
				<RefreshCw size={18} /> Refresh Data
			</button>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
			<div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100" in:fly={{ y: 20, duration: 400 }}>
				<p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Loads</p>
				<p class="text-4xl font-black text-sky-600">{totalOpens}</p>
			</div>
			<div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100" in:fly={{ y: 20, duration: 400, delay: 100 }}>
				<p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tracked Campaigns</p>
				<p class="text-4xl font-black text-teal-600">{uniqueEmails}</p>
			</div>
			<div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100" in:fly={{ y: 20, duration: 400, delay: 200 }}>
				<p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
				<p class="text-sm font-bold text-emerald-500 flex items-center gap-1 mt-4">
					<span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
					System Active
				</p>
			</div>
		</div>

		<div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr class="bg-slate-50 border-b border-slate-200">
							<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Email / Campaign</th>
							<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Location</th>
							<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Device</th>
							<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Timestamp</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100">
						{#each data.logs as log, i}
							<tr in:fade={{ delay: i * 30 }} class="hover:bg-slate-50/80 transition-colors">
								<td class="px-6 py-4">
									<div class="font-bold text-slate-800">{log.title}</div>
									<div class="text-xs font-mono text-slate-400">{log.emailId}</div>
								</td>
								<td class="px-6 py-4">
									<div class="flex items-center gap-2 text-slate-600 font-medium">
										<Globe size={14} class="text-slate-400" />
										{log.country || 'Unknown'}
									</div>
								</td>
								<td class="px-6 py-4">
									<div class="flex items-center gap-2 text-slate-600">
										{#if log.device?.toLowerCase() === 'mobile'}
											<Smartphone size={14} class="text-orange-500" />
										{:else}
											<Monitor size={14} class="text-indigo-500" />
										{/if}
										<span class="capitalize font-medium">{log.device}</span>
									</div>
								</td>
								<td class="px-6 py-4 text-slate-500 text-sm font-medium">
									<div class="flex items-center gap-2">
										<Clock size={14} />
										{new Date(log.dateCreated).toLocaleString()}
									</div>
								</td>
							</tr>
						{:else}
							<tr>
								<td colspan="4" class="px-6 py-20 text-center text-slate-400 italic">
									No tracking data recorded yet.
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div> -->