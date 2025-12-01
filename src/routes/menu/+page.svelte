<script lang='ts'>
    import { enhance } from '$app/forms';
    import type { PageServerData } from './$types';
    import { Shirt, Utensils, Users, User, Tally5 } from 'lucide-svelte';

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
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="gray" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <g> <g> <path d="M449.511,137.648v-82.38c0-9.072-4.668-17.227-12.487-21.814c-7.849-4.605-17.29-4.7-25.251-0.247 c-76.024,42.516-158.725,67.345-245.805,73.802c-0.667,0.049-79.372,0.393-79.372,0.393c-19.767,0-36.105,14.923-38.366,34.091 H32.075C14.39,141.493,0,155.881,0,173.567v70.468c0,17.686,14.39,32.075,32.075,32.075h16.153 c1.628,13.795,10.544,25.383,22.785,30.799l57.485,158.648c3.593,9.875,13.067,16.511,23.578,16.511h57.687 c8.178,0,15.86-3.999,20.551-10.697c4.691-6.7,5.822-15.287,3.03-22.96l-49.389-136.237 c80.482,8.361,157.039,32.601,227.817,72.183c3.905,2.184,8.166,3.273,12.42,3.273c4.417-0.001,8.83-1.175,12.829-3.521 c7.819-4.588,12.489-12.742,12.489-21.816v-82.38C484.711,275.353,512,245.204,512,208.781 C512,172.357,484.711,142.207,449.511,137.648z M47.951,251.372H32.075c-4.047,0-7.338-3.291-7.338-7.338v-70.467 c0-4.044,3.291-7.337,7.338-7.337h15.876V251.372z M80.93,284.245c-4.85-2.174-8.242-7.039-8.242-12.688V146.044h0.001 c0-7.667,6.239-13.905,13.906-13.905h67.333v153.324c0,0-67.92-0.026-68.213-0.044C83.234,285.132,82.712,285.004,80.93,284.245z M210.091,456.853c0.04,0.101,0.066,0.173-0.041,0.324c-0.105,0.151-0.183,0.151-0.288,0.151h-57.687 c-0.147,0-0.282-0.093-0.327-0.215L98.515,310.199h58.411L210.091,456.853z M424.774,362.294c0,0.179,0,0.322-0.267,0.479 c-0.318,0.184-0.508,0.079-0.66-0.006c-76.034-42.52-158.469-68.045-245.182-75.96v-156.04 c86.72-7.927,169.155-33.454,245.179-75.97c0.156-0.085,0.349-0.19,0.663-0.006c0.267,0.157,0.267,0.298,0.267,0.477V362.294z M449.511,254.873v-92.185c21.503,4.314,37.752,23.339,37.752,46.092C487.263,231.534,471.013,250.56,449.511,254.873z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
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
                    <svg version="1.1" fill="gray" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve"> <g> <g> <path d="M466.45,49.374c-7.065-8.308-17.368-13.071-28.267-13.071H402.41v-11.19C402.41,11.266,391.143,0,377.297,0H134.705 c-13.848,0-25.112,11.266-25.112,25.112v11.19H73.816c-10.899,0-21.203,4.764-28.267,13.071 c-6.992,8.221-10.014,19.019-8.289,29.624c9.4,57.8,45.775,108.863,97.4,136.872c4.717,11.341,10.059,22.083,16.008,32.091 c19.002,31.975,42.625,54.073,68.627,64.76c2.635,26.644-15.094,51.885-41.794,57.9c-0.057,0.013-0.097,0.033-0.153,0.046 c-5.211,1.245-9.09,5.921-9.09,11.513v54.363h-21.986c-19.602,0-35.549,15.947-35.549,35.549v28.058 c0,6.545,5.305,11.85,11.85,11.85H390.56c6.545,0,11.85-5.305,11.85-11.85v-28.058c0-19.602-15.947-35.549-35.549-35.549h-21.988 V382.18c0-5.603-3.893-10.286-9.118-11.52c-0.049-0.012-0.096-0.028-0.145-0.04c-26.902-6.055-44.664-31.55-41.752-58.394 c25.548-10.86,48.757-32.761,67.479-64.264c5.949-10.009,11.29-20.752,16.008-32.095c51.622-28.01,87.995-79.072,97.395-136.87 C476.465,68.392,473.443,57.595,466.45,49.374z M60.652,75.192c-0.616-3.787,0.431-7.504,2.949-10.466 c2.555-3.004,6.277-4.726,10.214-4.726h35.777v21.802c0,34.186,4.363,67.3,12.632,97.583 C89.728,153.706,67.354,116.403,60.652,75.192z M366.861,460.243c6.534,0,11.85,5.316,11.85,11.85v16.208H134.422v-16.208 c0-6.534,5.316-11.85,11.85-11.85H366.861z M321.173,394.03v42.513H191.96V394.03H321.173z M223.037,370.331 c2.929-3.224,5.607-6.719,8.002-10.46c7.897-12.339,12.042-26.357,12.228-40.674c4.209,0.573,8.457,0.88,12.741,0.88 c4.661,0,9.279-0.358,13.852-1.036c0.27,19.239,7.758,37.45,20.349,51.289H223.037z M378.709,81.803 c0,58.379-13.406,113.089-37.747,154.049c-23.192,39.03-53.364,60.525-84.956,60.525c-31.597,0-61.771-21.494-84.966-60.523 c-24.342-40.961-37.748-95.671-37.748-154.049V25.112c0-0.78,0.634-1.413,1.412-1.413h242.591c0.78,0,1.414,0.634,1.414,1.413 V81.803z M451.348,75.192c-6.702,41.208-29.074,78.51-61.569,104.191c8.268-30.283,12.631-63.395,12.631-97.58V60.001h35.773 c3.938,0,7.66,1.723,10.214,4.726C450.915,67.688,451.963,71.405,451.348,75.192z"/> </g> </g> <g> <g> <path d="M327.941,121.658c-1.395-4.288-5.103-7.414-9.566-8.064l-35.758-5.196l-15.991-32.402 c-1.997-4.044-6.116-6.605-10.626-6.605c-4.511,0-8.63,2.561-10.626,6.605l-15.991,32.402l-35.758,5.196 c-4.464,0.648-8.172,3.775-9.566,8.065c-1.393,4.291-0.231,8.999,2.999,12.148l25.875,25.221l-6.109,35.613 c-0.763,4.446,1.064,8.938,4.714,11.59c3.648,2.651,8.487,3,12.479,0.902L256,190.32l31.982,16.813 c1.734,0.911,3.627,1.36,5.512,1.36c2.456,0,4.902-0.763,6.966-2.263c3.65-2.652,5.477-7.144,4.714-11.59l-6.109-35.613 l25.875-25.221C328.172,130.658,329.334,125.949,327.941,121.658z M278.064,146.405c-2.793,2.722-4.068,6.644-3.408,10.489 l3.102,18.09l-16.245-8.541c-1.725-0.908-3.62-1.36-5.514-1.36c-1.894,0-3.788,0.454-5.514,1.36l-16.245,8.541l3.102-18.09 c0.66-3.844-0.615-7.766-3.408-10.489l-13.141-12.81l18.162-2.64c3.859-0.56,7.196-2.985,8.922-6.482l8.123-16.458l8.122,16.458 c1.727,3.497,5.062,5.921,8.922,6.482l18.162,2.64L278.064,146.405z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
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

