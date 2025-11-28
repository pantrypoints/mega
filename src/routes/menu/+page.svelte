<script lang='ts'>
    import { enhance } from '$app/forms';
    import type { PageServerData } from './$types';
    
    let { data }: { data: PageServerData } = $props();
    
    import { goto } from '$app/navigation';
    import { setLocale } from '$lib/paraglide/runtime';
    import { m } from '$lib/paraglide/messages.js'; 
</script>


<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
    <div class="w-full max-w-lg bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 transform transition duration-500 hover:shadow-3xl">
        
        <!-- User Info and Logout -->
        <div class="text-center mb-8">
            <h1 class="text-3xl font-extrabold text-gray-800 mb-1">
                Hi, <span class="text-teal-600">{data.user.username}</span>!
            </h1>
            <p class="text-sm text-gray-500 mb-4">Your user ID is {data.user.id}.</p>
        </div>

        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">
             {m.menu_title()} <!-- Placeholder for a message key like 'menu_title' -->
        </h2>

        <!-- Language Switch Buttons -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('en')}>EN</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('es')}>ES</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('fr')}>FR</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('zh')}>中文</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('bn')}>BN</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('tl')}>TL</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('cb')}>CB</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('ps')}>PS</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('vi')}>VI</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('ru')}>RU</button>
        </div>

        <!-- Menu Grid: Manually defined cards (now 3 columns for better spacing) -->
        <div class="grid grid-cols-3 gap-4">
            
            <!-- 1. Posts Card -->
            <button 
                onclick={() => goto('/posts')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl mb-1">📝</div>
                <div class="text-gray-800 font-semibold text-sm"> 
                    <!-- Calling message function manually -->
                    {m.posts()} 
                </div>
            </button>
            
            <!-- 2. Products Card -->
            <button 
                onclick={() => goto('/products')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl mb-1">📦</div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.products()}
                </div>
            </button>
            
            <!-- 3. Services Card -->
            <button 
                onclick={() => goto('/services')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl mb-1">🛠️</div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.services()}
                </div>
            </button>
            
            <!-- 4. Points Card -->
            <button 
                onclick={() => goto('/points')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl mb-1">💰</div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.points()}
                </div>
            </button>
            
            <!-- 5. Shops Card -->
            <button 
                onclick={() => goto('/shops')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl mb-1">🏪</div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.shops()}
                </div>
            </button>
            
            <!-- 6. Profile Card -->
            <button 
                onclick={() => goto('/profile')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl mb-1">👤</div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.profile()}
                </div>
            </button>
            
            <!-- 7. Stats Card -->
            <button 
                onclick={() => goto('/stats')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl mb-1">📊</div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.stats()}
                </div>
            </button>
        </div>

        <!-- Back to Home Button -->
        <button 
            onclick={() => goto('/posts')} 
            class="mt-8 w-full bg-teal-500 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition shadow-lg"
        > 
            {m.back_to_posts()} 
        </button>
        
        <!-- Logout Form -->
        <form method='post' action='?/logout' use:enhance class="mt-4">
            <button 
                type="submit" 
                class="bg-red-500 w-full text-white px-4 py-3 rounded-xl hover:bg-red-600 transition font-semibold shadow-md"
            >
                {m.sign_out()}
            </button>
        </form>
    </div>
</div>

