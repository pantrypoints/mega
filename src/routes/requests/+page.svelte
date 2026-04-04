<script lang="ts">
    import ResourceList from '$lib/components/List.svelte';
    import { getNAICSDescription } from '$lib/data/naicsData';
    import { m } from '$lib/paraglide/messages.js';
    let { data } = $props();
</script>

<ResourceList 
    {...data} 
    basePath="/requests" 
    title={m.requests()} 
    createLabel={m.create_request()} 
    getDesc={getNAICSDescription} 
/>
