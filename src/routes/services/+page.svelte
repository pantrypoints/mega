<script lang="ts">
    import ResourceList from '$lib/components/List.svelte';
    import { getNAICSDescription } from '$lib/data/naicsData';
    import { m } from '$lib/paraglide/messages.js';
    let { data } = $props();
</script>

<ResourceList 
    {...data} 
    basePath="/services" 
    title={m.services()} 
    createLabel={m.create_service()} 
    getDesc={getNAICSDescription} 
/>


