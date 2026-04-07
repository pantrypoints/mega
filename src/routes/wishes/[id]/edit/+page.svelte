<script lang="ts">
  import EditItem from '$lib/components/Productedit.svelte';
  import type { PageData } from './$types';
  
  let { data }: { data: PageData } = $props();
</script>

<EditItem 
  data={data}
  itemType="wish"
  backLink={`/wishes/${data.item.id}`}
/>

