<script lang='ts'>
    import favicon from '$lib/assets/favicon.svg';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { setLocale } from '$lib/paraglide/runtime';
    import { m } from '$lib/paraglide/messages.js';
    import Lang from '$lib/components/Lang.svelte';    
    
    // Type imports
    import type { ActionData, PageServerData } from './$types';

    // Consolidate data access from the load function (data) and the form action (form)
    let { form, data }: { form: ActionData, data: PageServerData } = $props();

    // State for the password visibility toggle
    let passwordVisible = $state(false);

    // State for the custom modal visibility
    let isModalOpen = $state(false);

    // Function to toggle password visibility
    function togglePasswordVisibility() {
        passwordVisible = !passwordVisible;
    }
</script>



{#if isModalOpen}
<div 
    class="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 transition-opacity"
    role="dialog"
    aria-modal="true"
    onclick={() => isModalOpen = false}
    onkeydown={(e) => e.key === 'Escape' && (isModalOpen = false)}
    tabindex="-1"
>
    <div 
        class="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 scale-100"
        role="document"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
    >
        <!-- Modal content -->
    </div>
</div>
{/if}



<!-- Main Login Card -->
<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 transform transition duration-500 hover:shadow-3xl">

        <!-- Centered SVG Icon -->
        <div class="flex justify-center mb-6">
            <img src={favicon} alt="Menu" class="" />
        </div>

        <Lang />
    
        <h1 class="mt-8 text-3xl font-extrabold text-gray-800 text-center mb-1">{m.welcome()}</h1>
        <p class="text-center text-gray-500 mb-8">{m.sign_in_to_account()}</p>

        <!-- Display Server Message/Error -->
        {#if form?.message}
            <p class="text-sm bg-red-100 text-red-600 p-3 rounded-lg border border-red-300 mb-4 animate-pulse">
                {form.message}
            </p>
        {/if}

        <form method="post" action="?/login" use:enhance class="space-y-6">
            <!-- Username Field -->
            <label class="block">
                <span class="text-gray-700 font-medium">Username</span>
                <input 
                    name="username" 
                    placeholder="{m.enter_username()}"
                    class="mt-1 block w-full px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                />
            </label>

            <!-- Password Field with Visibility Toggle -->
            <label class="block">
                <span class="text-gray-700 font-medium">Password</span>
                <div class="relative mt-1">
                    <input 
                        type={passwordVisible ? 'text' : 'password'} 
                        name="password"
                        placeholder="••••••••"
                        class="block w-full pr-12 px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800
                               focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                    />
                    <button 
                        type="button" 
                        class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-sky-500 transition"
                        onclick={togglePasswordVisibility}
                        aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                    >
                        {#if passwordVisible}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.638 0-8.406-2.583-11.85-6.071m-.151-.013L2.43 11.2m.112-1.127l1.011-1.011m1.127-.112l1.011-1.011m1.127-.112l1.011-1.011m1.127-.112l1.011-1.011m1.127-.112l1.011-1.011m1.127-.112l1.011-1.011M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7a2 2 0 00-2-2h-5.586a1 1 0 00-.707.293l-4.586 4.586A2 2 0 005 11.414V17a2 2 0 002 2h8a2 2 0 002-2v-5.586a1 1 0 00-.293-.707l-4.586-4.586A2 2 0 0013.414 7H18z" />
                            </svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        {/if}
                    </button>
                </div>
            </label>

            <!-- Forgot Password Link -->
            <div class="flex justify-end text-sm">
                <!-- <a 
                    href="#" 
                    onclick="event.preventDefault(); isModalOpen = true"
                    class="font-semibold text-sky-600 hover:text-teal-500 transition duration-150"
                >
                    Forgot Password?
                </a> -->
            </div>

            <!-- Login Button -->
            <button 
                class="w-full bg-teal-600 text-white font-bold px-4 py-3 rounded-xl shadow-lg hover:bg-teal-700 
                       focus:outline-none focus:ring-4 focus:ring-teal-300 transition duration-150 transform hover:scale-[1.01]"
                >
                {m.sign_in()}
            </button>

            <!-- Register Link/Button -->
            <div class="text-center pt-2">
                <p class="text-sm text-gray-600">
                        {m.no_account()}
                    <a href="/register" class="font-semibold text-sky-600 hover:text-teal-500 transition duration-150">
                        {m.register_here()}
                    </a>
                </p>
            </div>
        </form>
    </div>
</div>


