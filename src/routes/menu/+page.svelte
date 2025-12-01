<script lang='ts'>
    import { enhance } from '$app/forms';
    import type { PageServerData } from './$types';
    import { Trophy, Megaphone, Shirt, Utensils, Users, User, Tally5 } from 'lucide-svelte';

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
<svg version="1.1" fill="gray" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"> <g> <g> <path d="M313.365,107.393c-9.915-11.15-25.377-17.545-42.422-17.545c-30.441,0-57.651,20.784-60.659,46.36 c-1.349,11.698,2.281,23.047,10.221,31.955c9.756,10.946,25.08,17.223,42.048,17.223c31.23,0,58.04-20.365,61.036-46.333 C324.939,127.569,321.309,116.326,313.365,107.393z M299.176,136.207c-1.537,13.335-18.31,24.6-36.625,24.6 c-9.818,0-18.678-3.363-23.699-8.998c-3.307-3.71-4.703-8.011-4.156-12.758c1.543-13.118,18.48-24.626,36.246-24.626 c9.886,0,18.879,3.477,24.058,9.299C297.274,126.281,299.846,130.518,299.176,136.207z"/> </g> </g> <g> <g> <path d="M301.752,369.483c-3.072-2.061-10.262-6.883-4.458-40.363c0.149-0.73,0.732-3.429,1.637-7.623 c2.061-9.557,5.897-27.344,10.066-47.179c0.01-0.044,0.02-0.09,0.028-0.134c4.256-21.437,0.887-40.19-9.737-54.233 c-9.591-12.678-24.776-20.45-42.754-21.882c-26.586-2.127-54.398,13.739-62.918,29.357c-3.939,6.92-2.053,12.54-0.568,15.289 c1.84,3.4,4.524,5.306,6.485,6.697c3.021,2.144,10.093,7.163,3.377,40.573c-0.628,3.056-9.999,50.701-11.238,57.465 c-0.009,0.045-0.016,0.091-0.025,0.136c-3.692,21.54-0.041,40.365,11.152,53.959c18.024,21.89,45.458,20.839,46.532,20.839 c25.569-0.001,51.128-15.882,58.91-31.079c3.757-7.021,1.727-12.589,0.167-15.298 C306.483,372.657,303.748,370.822,301.752,369.483z M284.926,269.336c-4.149,19.742-7.969,37.457-10.023,46.979 c-1.397,6.474-1.679,7.789-1.779,8.328c-0.007,0.043-0.016,0.087-0.023,0.132c-6.24,35.864,0.075,51.56,9.013,60.341 c-2.442,2.179-5.787,4.532-9.928,6.668c-8.144,4.202-17.165,6.375-24.762,5.974c-11.067-0.591-19.858-4.584-25.418-11.549 c-6.475-8.108-8.6-20.003-6.146-34.399c1.336-7.279,10.72-54.936,11.114-56.832c0.007-0.042,0.016-0.082,0.025-0.124 c7.178-35.688,1.274-51.544-7.43-60.556c2.498-2.114,5.905-4.379,10.1-6.405c8.251-3.985,17.332-5.924,24.911-5.322 c11.048,0.88,19.729,5.102,25.106,12.21C285.947,243.056,287.76,255.005,284.926,269.336z"/> </g> </g> <g> <g> <path d="M459.614,394.961c33.831-40.598,52.388-90.748,52.388-141.964c0-62.775-26.778-121.727-75.397-165.998 c-48.299-43.977-112.438-68.197-180.603-68.197S123.696,43.022,75.397,87C26.776,131.269,0,190.223,0,252.998 s26.776,121.729,75.396,165.998c48.299,43.978,112.438,68.197,180.603,68.197c42.625,0,84.634-9.73,121.869-28.187l89.22,33.412 c1.402,0.525,2.86,0.78,4.307,0.78c3.039,0,6.028-1.127,8.339-3.259c3.409-3.147,4.755-7.946,3.48-12.407L459.614,394.961z M381.425,434.094c-3.269-1.225-6.904-1-10.001,0.616c-34.94,18.256-74.853,27.906-115.424,27.906 c-127.606,0-231.422-94.033-231.422-209.617S128.393,43.379,255.999,43.379s231.423,94.034,231.423,209.617 c0,48.095-17.515,93.34-50.652,130.846c-2.776,3.141-3.759,7.483-2.606,11.513l18.72,65.498L381.425,434.094z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
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
                        <svg version="1.1" id="Layer_1" fill="red" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <path d="M256,0C114.841,0,0,114.841,0,256s114.841,256,256,256s256-114.841,256-256S397.159,0,256,0z M256,485.345 C129.539,485.345,26.655,382.461,26.655,256S129.539,26.655,256,26.655S485.345,129.539,485.345,256S382.461,485.345,256,485.345z "/> </g> </g> <g> <g> <path d="M338.722,115.086c-6.343-3.732-14.513-1.611-18.244,4.733s-1.613,14.513,4.733,18.244 c41.646,24.492,67.517,69.683,67.517,117.937c0,75.394-61.335,136.729-136.729,136.729c-75.393,0-136.729-61.337-136.729-136.729 c0-48.254,25.87-93.445,67.517-117.937c6.345-3.73,8.464-11.899,4.733-18.244c-3.73-6.345-11.898-8.462-18.244-4.733 C123.523,144.347,92.616,198.342,92.616,256c0,90.091,73.293,163.384,163.384,163.384S419.384,346.091,419.382,256 C419.382,198.343,388.475,144.347,338.722,115.086z"/> </g> </g> <g> <g> <path d="M256,74.832c-7.361,0-13.328,5.968-13.328,13.328V256c0,7.361,5.967,13.328,13.328,13.328 c7.361,0,13.328-5.967,13.328-13.328V88.16C269.328,80.801,263.361,74.832,256,74.832z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                    </div>
                    <div class="text-gray-800 font-semibold text-sm">
                        {m.sign_out()}
                    </div>
                </button>
            </form>

        </div>
    </div>
</div>

