<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { marked } from 'marked'; 
    import { Megaphone } from 'lucide-svelte';
    import { m } from '$lib/paraglide/messages.js';

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


<div class="min-h-screen bg-sky-50 dark:bg-black flex flex-col items-center p-4 sm:p-8 transition-colors">
 
    <div class="w-full max-w-4xl mb-8 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            {m.posts()}
        </h1>
        <p class="text-lg text-gray-600 dark:text-slate-400">
            {m.whats_up()}
        </p>
    </div>

    <div class="w-full max-w-4xl bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 mb-10 transition-colors">
        <form onsubmit={createPost} class="space-y-4">
            <textarea bind:value={content} 
                name="content" 
                required 
                rows="4"
                class="w-full p-5 rounded-2xl border-2 border-gray-200 dark:border-slate-700 bg-transparent dark:text-white focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900/30 focus:outline-none transition resize-none"
                placeholder="{m.whats_up()}"
                disabled={loading}></textarea>
            
            {#if error}
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-2xl text-sm font-medium">
                    {error}
                </div>
            {/if}
            
            <button
                type="submit"
                disabled={loading || !content.trim()}
                class="w-full flex items-center justify-center py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg rounded-2xl shadow-lg transition disabled:bg-gray-400 dark:disabled:bg-slate-800 disabled:cursor-not-allowed"
            >
                <Megaphone class="w-5 h-5 mr-3" />
                {loading ? 'Posting...' : m.create_post() }
            </button>
        </form>
    </div>

    <div class="w-full max-w-4xl">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{m.recent_posts()}</h2>
      <div class="space-y-6">
        {#each posts as post}
          <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl transition-colors border border-transparent dark:border-slate-800">
            
            <div class="flex items-center gap-4 mb-6">
              <a href="/users/{post.slug || post.username}" class="shrink-0 transition-transform hover:scale-105">
                {#if post.avatar}
                  <img src={post.avatar} alt="{post.username}'s avatar" class="w-14 h-14 rounded-full border-2 border-sky-100 dark:border-slate-700 object-cover shadow-sm"/>
                {:else}
                  <div class="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold border-2 border-sky-100 dark:border-slate-700 shadow-sm">
                    {post.username?.charAt(0).toUpperCase() || '?'}
                  </div>
                {/if}
              </a>

              <div class="flex-1">
                <a href="/users/{post.slug || post.username}" class="group">
                  <p class="font-bold text-lg text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {post.username ?? "Unknown User"}
                  </p>
                </a>
                <p class="text-sm text-gray-500 dark:text-slate-400">
                  {new Date(post.dateCreated).toLocaleString([], {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <div class="markdown-content text-gray-800 dark:text-slate-200 leading-relaxed p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800">
              {@html marked.parse(post.content)}
            </div>
          </div>
        {/each}
      </div>
    </div>
</div>

<style>
  @reference "../layout.css";

    .markdown-content :global(h2) {
        @apply text-xl font-bold mt-4 mb-2 border-b border-sky-300 dark:border-sky-800 pb-1 dark:text-white;
    }
    .markdown-content :global(strong) {
        @apply font-extrabold text-sky-700 dark:text-sky-400;
    }
    .markdown-content :global(p) {
        @apply mb-3 leading-relaxed;
    }
    .markdown-content :global(blockquote) {
        @apply border-l-4 border-sky-400 pl-4 py-2 italic text-gray-600 dark:text-slate-400 bg-sky-100 dark:bg-sky-950/50 rounded-lg my-3;
    }
    .markdown-content :global(a) {
        @apply text-blue-600 dark:text-sky-400 underline hover:text-blue-800 dark:hover:text-sky-300;
    }
    .markdown-content :global(ul) {
        @apply list-disc list-inside mt-2 ml-4;
    }
    .markdown-content :global(ol) {
        @apply list-decimal list-inside mt-2 ml-4;
    }
</style>