<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import FAB from '$lib/components/FAB.svelte';
	let { data, children } = $props();
</script>

<!-- Page content -->
<div class="min-h-screen relative">
	{@render children()}
</div>

<!-- Persistent FAB -->
<FAB user={data.user} class="fixed bottom-6 right-6 z-[9999]" />

