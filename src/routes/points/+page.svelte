<script lang="ts">
	import { onMount } from "svelte";
	import { Chart, registerables } from "chart.js";
	Chart.register(...registerables);

	// Tabs
	const tabs = [
		"Balances",
		"Transactions",
		"Purchases (Debts)",
		"Sales (Credits)",
		"Aggregated Debts",
		"Aggregated Credits",
		"Stats"
	] as const;

	let activeTab: (typeof tabs)[number] = "Balances";

	// Mock data
	let balances = [
		{ user: "shopA", total: 150 },
		{ user: "juan", total: 90 },
		{ user: "maria", total: -40 }
	];

	let transactions = [
		{ id: 1, user: "maria", amount: 30, date: "2025-01-01", type: "debit" },
		{ id: 2, user: "juan", amount: -20, date: "2025-01-03", type: "credit" },
		{ id: 3, user: "shopA", amount: 40, date: "2025-01-06", type: "debit" }
	];

	let dateFilter = "";
	let valueFilter = 0;

	let chartPoints = [10, 20, 15, 18, 24, 30, 22];

	let chartEl: HTMLCanvasElement;
	let chart: Chart;

	onMount(() => {
		if (!chartEl) return;

		if (chart) chart.destroy();

		chart = new Chart(chartEl, {
			type: "line",
			data: {
				labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				datasets: [
					{
						label: "Transactions Per Day",
						data: chartPoints,
						borderWidth: 3,
						borderColor: "#0d9488", // teal-600
						backgroundColor: "rgba(13,148,136,0.15)",
						tension: 0.3,
						fill: true
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: { display: false }
				},
				scales: {
					y: { beginAtZero: true }
				}
			}
		});
	});
</script>

<!-- PAGE CONTAINER -->
<div class="min-h-screen bg-sky-50 flex justify-center p-6 sm:p-10">
	<div class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500">

		<h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">
			Points & Transactions Dashboard
		</h1>

		<!-- TABS -->
		<div class="border-b mb-8 flex gap-6 justify-center">
			{#each tabs as tab}
				<button
					on:click={() => activeTab = tab}
					class="pb-3 px-3 font-semibold transition border-b-2"
					class:text-teal-600={activeTab === tab}
					class:border-teal-600={activeTab === tab}
					class:text-gray-500={activeTab !== tab}
					class:border-transparent={activeTab !== tab}
					class:hover:text-teal-500={activeTab !== tab}
				>
					{tab}
				</button>
			{/each}
		</div>

		<!-- TAB CONTENT -->
		{#if activeTab === "Balances"}
			<h2 class="text-xl font-bold mb-4">Total balance per user</h2>

			<div class="space-y-3">
				{#each balances as b}
					<div class="flex justify-between p-4 rounded-xl border shadow-sm bg-sky-50">
						<span class="font-semibold">{b.user}</span>
						<span class={b.total >= 0 ? "text-green-600" : "text-red-600"}>
							{b.total} pts
						</span>
					</div>
				{/each}
			</div>

		{:else if activeTab === "Transactions"}
			<div class="flex gap-2 mb-4">
				<input type="date" bind:value={dateFilter} class="input border p-2 rounded-lg" />
				<input type="number" placeholder="Min value" bind:value={valueFilter} class="input w-32 border p-2 rounded-lg" />
			</div>

			{#each transactions.filter(t => (!dateFilter || t.date >= dateFilter) && (!valueFilter || Math.abs(t.amount) >= valueFilter)) as t}
				<div class="p-4 border rounded-xl flex justify-between bg-white shadow-sm">
					<div>
						<div class="font-semibold">{t.user}</div>
						<div class="text-xs text-gray-500">{t.date}</div>
					</div>

					<div class={t.amount > 0 ? "text-red-600" : "text-green-600"}>
						{t.amount} pts
					</div>
				</div>
			{/each}

		{:else if activeTab === "Stats"}
			<h2 class="text-xl font-bold mb-4">Statistics</h2>

			<div class="grid grid-cols-2 gap-6 mb-8">
				<div class="p-4 border rounded-xl bg-sky-50 text-center">
					<div class="text-sm text-gray-500">Avg resolution time</div>
					<div class="text-3xl font-bold">4.7 days</div>
				</div>

				<div class="p-4 border rounded-xl bg-sky-50 text-center">
					<div class="text-sm text-gray-500">Unique transaction partners</div>
					<div class="text-3xl font-bold">12</div>
				</div>
			</div>

			<!-- CHART -->
			<div class="p-6 border rounded-2xl bg-white shadow-lg">
				<h3 class="text-sm text-gray-600 mb-2">Weekly Transaction Volume</h3>
				<canvas bind:this={chartEl} class="w-full h-64"></canvas>
			</div>

		{:else}
			<p class="text-gray-500 text-center">This tab will be customized next.</p>
		{/if}

	</div>
</div>
