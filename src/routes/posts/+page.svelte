<script lang="ts">
    // Removed: import { invalidateAll } from '$app/navigation';
    // Removed: import { afterUpdate } from 'svelte'; // FIX: Removed unused import causing Svelte 5 error
    import { onMount, onDestroy } from 'svelte';

    // State variables
    let content = $state('');
    let loading = $state(false);
    let error = $state('');
    
    // Props from load function
    let { data } = $props();
    let posts = $state(data.posts); 
    
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
                // SUCCESS PATH: Clear input, state reset happens in finally
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

<div class="bg-sky-50 flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500">
        <!-- The form uses the manual createPost handler attached to the submit event -->
        <form on:submit={createPost} class="mb-8"> 
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
                class="mt-3 w-full py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            > 
                {loading ? 'Posting...' : 'Post'}
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
                    <p class="text-gray-800">{post.content}</p> 
                </div> 
            {/each} 
        </div> 
    </div> 
</div>