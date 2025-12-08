<script lang='ts'>
    import { enhance } from '$app/forms';
    import type { PageServerData } from './$types';
    import { Bell, MessageCircle, LogOut, ChartNoAxesCombined, CircleQuestionMark, Megaphone, Shirt, Utensils, Users, User, Tally5 } from 'lucide-svelte';
    import Lang from '$lib/components/Lang.svelte';

    import { goto } from '$app/navigation';
    import { setLocale } from '$lib/paraglide/runtime';
    import { m } from '$lib/paraglide/messages.js';

    // The `data` prop now includes `unreadMessageCount` from the layout load function
    let { data }: { data: PageServerData } = $props();

    // Safely access userId, providing a fallback (like 'me') if not found
    const userId = data?.user?.id || 'me';

    // 💡 Access unread message count from merged layout/page data
    // The `data` object is guaranteed to contain `unreadMessageCount`
    const unreadCount = data.unreadMessageCount ?? 0; 
    const hasUnread = unreadCount > 0;
</script>


<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
    <div class="w-full max-w-lg bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 transform transition duration-500 hover:shadow-3xl">
        <!-- User Info and Logout -->
        <div class="text-center mb-4">
            <h1 class="text-3xl font-extrabold text-gray-800 mb-1">
                {m.welcome()} <span class="text-sky-600">{data.user.username}</span>!
            </h1>
            <p class="text-sm text-gray-500 mb-4">Your user ID is {data.user.id}.</p>
        </div>
        <Lang />
        
        <!-- Menu Grid: Optimized for mobile (2 columns default, 3 on medium screens) -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
            
            <!-- 1. Posts Card -->
            <button 
                onclick={() => goto('/posts')} 
                class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center"
            >
                <div class="p-2 mb-1">
                    <!-- Responsive icon size: w-10 h-10 on mobile, w-12 h-12 on larger screens -->
                    <Megaphone class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {m.posts()}
                </div>
            </button>
            
            <!-- 2. Products Card -->
            <button 
                onclick={() => goto('/products')} 
                class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center"
            >
                <div class="p-2 mb-1">
                    <Shirt class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {m.products()}
                </div>
            </button>
            
            <!-- 3. Services Card -->
            <button 
                onclick={() => goto('/services')} 
                class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center"
            >
                <div class="p-2 mb-1">
                    <Utensils class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {m.services()}
                </div>
            </button>
            
            <!-- 4. Points Card (Tally5) -->
            <button 
                onclick={() => goto('/points')} 
                class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center"
            >
                <div class="p-2 mb-1">
                    <Tally5 class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {m.points()}
                </div>
            </button>
            
            <!-- 5. Chat Card (MessageCircle) -->
            <button
                onclick={() => goto('/chat')} 
                class="relative bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center"
                class:bg-red-50={hasUnread}
                class:border-red-400={hasUnread}
            >
                <!-- 💡 Conditional Animated Bell -->
                {#if hasUnread}
                    <div class="absolute top-2 right-2 p-1 bg-red-500 rounded-full animate-ping-once">
                        <Bell class="w-5 h-5 text-yellow-300" />
                    </div>
                    <div class="p-2 mb-1">
                        <Bell class="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
                    </div>
                    <div class="text-xs font-bold text-red-600 mb-1">
                        ({unreadCount}) New Message
                    </div>
                {:else}
                    <div class="p-2 mb-1">
                        <MessageCircle class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
                    </div>
                {/if}

                <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap mt-1">
                    Chat
                </div>
            </button>



            
            <!-- 6. Users Card (Shops) -->
            <button 
                onclick={() => goto('/users')} 
                class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center"
            >
                <div class="p-2 mb-1">
                    <Users class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {m.users()}
                </div>
            </button>
            
            <!-- 7. Profile Card -->
            <button 
                onclick={() => goto(`/users/${userId}`)} 
                class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center"
            >
                <div class="p-2 mb-1">
                    <User class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {m.profile()}
                </div>
            </button>
            
            <!-- 8. Stats Card -->
            <button 
                onclick={() => goto('/stats')} 
                class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center"
            >
                <div class="p-2 mb-1">
                    <ChartNoAxesCombined class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {m.stats()}
                </div>
            </button>
            
            <!-- 9. How To Use Card -->
            <button 
                onclick={() => goto('/how')} 
                class="bg-sky-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center"
            >
                <div class="p-2 mb-1">
                    <CircleQuestionMark class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                    {m.how()}
                </div>
            </button>
            
            <!-- 10. Logout Button (Form) -->
            <form method='post' action='?/logout' use:enhance class="contents">
                <button 
                    class="bg-red-50 border border-sky-200 p-3 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center"
                >
                    <div class="p-2 mb-1">
                        <LogOut class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
                    </div>
                    <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                        {m.sign_out()}
                    </div>
                </button>
            </form>
        </div>
    </div>
</div>


<style>
    /* Custom animation for a single "pop" on the menu item */
    @keyframes ping-once {
        0% { transform: scale(0.2); opacity: 0; }
        50% { transform: scale(1.5); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
    }
    /* Use a custom class since Tailwind's `animate-ping` runs infinitely */
    .animate-ping-once {
        animation: ping-once 1.5s ease-out;
    }
</style>


