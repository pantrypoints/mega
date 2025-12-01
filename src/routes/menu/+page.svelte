<script lang='ts'>
    import { enhance } from '$app/forms';
    import type { PageServerData } from './$types';
    import { LogOut, ChartNoAxesCombined, CircleQuestionMark, Megaphone, Shirt, Utensils, Users, User, Tally5 } from 'lucide-svelte';

    let { data }: { data: PageServerData } = $props();
    
    import { goto } from '$app/navigation';
    import { setLocale } from '$lib/paraglide/runtime';
    import { m } from '$lib/paraglide/messages.js'; 


    // Safely access userId, providing a fallback (like 'me') if not found
    const userId = data?.user?.id || 'me'; 
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
             {m.menu_title()}
        </h2>

        <!-- Language Switch Buttons -->
        <div class="flex flex-wrap justify-center gap-2 mb-8">
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('bn')}>BN</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('cb')}>CB</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('en')}>EN</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('es')}>ES</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('fr')}>FR</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('ps')}>PS</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('ru')}>RU</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('tl')}>TL</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('vi')}>VI</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('zh')}>中文</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('jp')}>JP</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('ar')}>AR</button>
            <button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" onclick={() => setLocale('hi')}>HI</button>
        </div>

        <!-- Menu Grid: Manually defined cards (now 3 columns for better spacing) -->
        <div class="grid grid-cols-3 gap-4">
            
            <!-- 1. Posts Card -->
            <button 
                onclick={() => goto('/posts')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl p-4 mb-1">
                    <Megaphone class="w-16 h-16 text-gray-500" />
                </div>
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
                <div class="text-3xl p-4 mb-1">
                    <Shirt class="w-16 h-16 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.products()}
                </div>
            </button>
            
            <!-- 3. Services Card -->
            <button 
                onclick={() => goto('/services')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl p-4 mb-1">
                    <Utensils class="w-16 h-16 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.services()}
                </div>
            </button>
            
            <!-- 4. Points Card -->
            <button 
                onclick={() => goto('/points')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl p-4 mb-1">
                    <Tally5 class="w-16 h-16 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.points()}
                </div>
            </button>
            
            <!-- 5. Users Card -->
            <button 
                onclick={() => goto('/users')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl p-4 mb-1">
                    <Users class="w-16 h-16 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.shops()}
                </div>
            </button>
            
            <!-- 6. Profile Card -->
            <button onclick={() => goto(`/users/${userId}`)} class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center" >
                <div class="text-3xl p-4 mb-1">
                  <User class="w-16 h-16 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.profile()}
                </div>
            </button>
            
            <!-- 7. Stats Card -->
            <button 
                onclick={() => goto('/stats')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl p-4 mb-1">
                   <ChartNoAxesCombined class="w-16 h-16 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.stats()}
                </div>
            </button>


            <!-- 8 how to use -->
            <button 
                onclick={() => goto('/how')} 
                class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
            >
                <div class="text-3xl p-4 mb-1">
                    <CircleQuestionMark class="w-16 h-16 text-gray-500" />
                </div>
                <div class="text-gray-800 font-semibold text-sm">
                    {m.how()}
                </div>
            </button>


            <!-- 9 logout -->
            <form method='post' action='?/logout' use:enhance class="">
                <button 
                    class="bg-red-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center"
                >
                    <div class="text-3xl p-4 mb-1">
                        <LogOut class="w-16 h-16 text-gray-500" />
                    </div>
                    <div class="text-gray-800 font-semibold text-sm">
                        {m.sign_out()}
                    </div>
                </button>
            </form>

        </div>
    </div>
</div>

