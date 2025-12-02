<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { marked } from 'marked'; 
    import { Megaphone } from 'lucide-svelte';

    // State variables
    let content = $state('');
    let loading = $state(false);
    let error = $state('');

    // Props from load function
    let { data } = $props();
    let posts = $state(data.posts);

    // Configure marked globally for sanitization and GFM support
    marked.setOptions({
        sanitize: true,
        smartLists: true,
        gfm: true,
        breaks: true // Enables GFM line breaks
    });

    async function createPost(event: Event) {
        // Prevent default form submission
        event.preventDefault();

        if (!content.trim()) {
            error = 'Please enter some content';
            return;
        }

        loading = true; // Button disables here
        error = '';

        try {
            const response = await fetch(window.location.pathname, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content })
            });

            if (response.ok) {
                // SUCCESS PATH: Clear input
                content = '';
            } else {
                // FAILURE PATH
                const result = await response.json();
                error = result.message || 'Failed to create post';
            }
        } catch (err) {
            console.error('Error creating post:', err);
            error = 'Network error or failed to connect to API.';
        } finally {
            // FIX: This block always executes, ensuring the loading state is reset
            loading = false;
        }
    }

    // --- SSE Setup ---
    let events: EventSource | null = null;

    onMount(() => {
        // The SSE URL is the current path: /posts
        events = new EventSource(window.location.pathname);
        events.onmessage = (event) => {
            const post = JSON.parse(event.data);
            // Prepend new post to the local state array
            posts = [post, ...posts];
        };
    });

    onDestroy(() => {
        if (events) {
            events.close();
        }
    });
</script>


<div class="flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500">
        <!-- The form uses the manual createPost handler attached to the submit event -->
        <form onsubmit={createPost} class="mb-8">
            <textarea 
                bind:value={content} 
                name="content" 
                required 
                class="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none" 
                placeholder="What's happening in your universe?" 
                disabled={loading}
            ></textarea>
            <button
  type="submit"
  disabled={loading || !content.trim()}
  class="mt-3 w-full flex items-center justify-center
         py-3 bg-teal-600 text-white font-bold rounded-full
         shadow-md hover:bg-teal-700 transition transform hover:scale-105
         disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
>
  <Megaphone class="w-5 h-5 mx-4" /> {loading ? 'Posting...' : 'Post'}
</button>

        </form>

        {#if error}
            <div class="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
                {error}
            </div>
        {/if}

        <div class="space-y-5">
            {#each posts as post}
                <div class="p-5 bg-sky-100 rounded-2xl shadow-inner border border-sky-200">
                    <div class="flex items-center gap-3 mb-3">
                        {#if post.avatar}
                            <img src={post.avatar} alt="avatar" class="w-10 h-10 rounded-full border border-gray-300 object-cover" />
                        {:else}
                            <div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                                ?
                            </div>
                        {/if}
                        <div>
                            <p class="font-semibold text-gray-800">
                                {post.username ?? "Unknown User"}
                            </p>
                            <p class="text-xs text-gray-500">
                                {new Date(post.dateCreated).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    
                    <!-- NEW: Markdown rendering using {@html} -->
                    <div class="markdown-content text-gray-800">
                        {@html marked.parse(post.content)}
                    </div>
                    
                </div>
            {/each}
        </div>
    </div>
</div>

<!-- <style>
    .markdown-content :global(h2) {
        /* Based on #rendered-output h2 in the Canvas */
        @apply text-xl font-bold mt-4 mb-2 border-b border-sky-300 pb-1;
    }
    .markdown-content :global(strong) {
        /* Based on #rendered-output strong in the Canvas */
        @apply font-extrabold text-sky-700;
    }
    /* Marked.js wraps content in <p> tags by default, so we style them here */
    .markdown-content :global(p) {
        /* Based on #rendered-output p in the Canvas */
        @apply mb-3 leading-relaxed;
    }
    .markdown-content :global(blockquote) {
        /* Based on #rendered-output blockquote in the Canvas */
        @apply border-l-4 border-sky-400 pl-4 py-2 italic text-gray-600 bg-sky-100 rounded-lg my-3;
    }
    .markdown-content :global(a) {
        /* Based on #rendered-output a in the Canvas */
        @apply text-blue-600 underline hover:text-blue-800;
    }
    .markdown-content :global(ul) {
        @apply list-disc list-inside mt-2 ml-4;
    }
    .markdown-content :global(ol) {
        @apply list-decimal list-inside mt-2 ml-4;
    }
</style> -->

