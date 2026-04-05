<script lang="ts">
  import type { PageData } from './$types';
  import ItemDetail from '$lib/components/Servicedetail.svelte';
  
  let { data } = $props();
  const { request, isOwner, owner, currentUserId } = data;
</script>

<ItemDetail 
  item={request}
  isOwner={isOwner}
  owner={owner}
  currentUserId={currentUserId}
  itemType="request"
  backLink="/requests"
  deleteAction="?/deleterequest"
  editLink={`/requests/${request.id}/edit`}
/>
