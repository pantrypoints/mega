<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import FAB from '$lib/components/FAB.svelte';
	let { data, children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} sizes="any" type="image/svg+xml">
    <!-- You can also add other sizes/formats for maximum compatibility -->
    <!-- <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png"> -->
</svelte:head>


<!-- Page content -->
<div class="min-h-screen relative">
	{@render children()}
</div>

<!-- Persistent FAB -->
<FAB user={data.user} class="fixed bottom-6 right-6 z-[9999]" />

