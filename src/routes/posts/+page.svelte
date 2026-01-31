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


<div class="min-h-screen bg-sky-50 flex flex-col items-center p-4 sm:p-8">
 
    <!-- Header -->
    <div class="w-full max-w-4xl mb-8 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
            Posts
        </h1>
        <p class="text-lg text-gray-600">
            What's happening?
        </p>
    </div>

    <!-- Create Post Card -->
    <div class="w-full max-w-4xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 transform transition duration-500 hover:shadow-3xl mb-10">
        <form onsubmit={createPost} class="space-y-4">
            <textarea 
                bind:value={content} 
                name="content" 
                required 
                rows="4"
                class="w-full p-5 rounded-2xl border-2 border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none transition duration-200 resize-none"
                placeholder="What's happening in your universe? Share your thoughts, announcements, or updates..."
                disabled={loading}
            ></textarea>
            
            {#if error}
                <div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm font-medium">
                    {error}
                </div>
            {/if}
            
            <button
                type="submit"
                disabled={loading || !content.trim()}
                class="w-full flex items-center justify-center py-2 bg-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-teal-700 transition duration-200 active:scale-[.99] transform disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
            >
                <Megaphone class="w-5 h-5 mr-3" />
                {loading ? 'Posting...' : 'Create Post'}
            </button>
        </form>
    </div>

    <!-- Posts Feed -->
    <div class="w-full max-w-4xl">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Recent Posts</h2>
        
        <div class="space-y-6">
            {#each posts as post}
                <div class="bg-white p-8 rounded-3xl shadow-2xl transform transition duration-500 hover:shadow-3xl">
                    <!-- Post Header -->
                    <div class="flex items-center gap-4 mb-6">
                        {#if post.avatar}
                            <img 
                                src={post.avatar} 
                                alt="User avatar" 
                                class="w-14 h-14 rounded-full border-2 border-sky-100 object-cover shadow-sm"
                            />
                        {:else}
                            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold border-2 border-sky-100 shadow-sm">
                                {post.username?.charAt(0).toUpperCase() || '?'}
                            </div>
                        {/if}
                        
                        <div class="flex-1">
                            <p class="font-bold text-lg text-gray-900">
                                {post.username ?? "Unknown User"}
                            </p>
                            <p class="text-sm text-gray-500">
                                {new Date(post.dateCreated).toLocaleString([], {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                    </div>
                    
                    <!-- Post Content -->
                    <div class="markdown-content text-gray-800 leading-relaxed mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        {@html marked.parse(post.content)}
                    </div>
                    
                    <!-- Post Footer (Optional: Add actions like like, comment, share) -->
                    <!-- <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <button class="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition">
                            <Heart class="w-5 h-5" />
                            <span>Like</span>
                        </button>
                        <button class="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition">
                            <MessageCircle class="w-5 h-5" />
                            <span>Comment</span>
                        </button>
                    </div> -->
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


