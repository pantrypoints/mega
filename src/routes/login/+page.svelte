<script lang='ts'>
    import favicon from '$lib/assets/favicon.svg';
    import { enhance, deserialize } from '$app/forms';

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
    
    // State for verification step
    let isVerified = $state(false);
    let verificationError = $state('');
    let isVerifying = $state(false);
    let verifiedUsername = $state('');
    
    // Form data for verification
    let username = $state(data?.user?.username || '');
    let codename = $state('');
    let pin = $state('');
    let gender = $state('');
    
    // Password fields
    let newPassword = $state('');
    let confirmPassword = $state('');
    let passwordError = $state('');
    let resetSuccess = $state(false);
    let resetMessage = $state('');
    
    // Function to toggle password visibility
    function togglePasswordVisibility() {
        passwordVisible = !passwordVisible;
    }
    
    // Function to close modal
    function closeModal() {
        isModalOpen = false;
        // Reset state when closing
        setTimeout(() => {
            isVerified = false;
            verificationError = '';
            resetSuccess = false;
            resetMessage = '';
            codename = '';
            pin = '';
            gender = '';
            newPassword = '';
            confirmPassword = '';
            passwordError = '';
        }, 300);
    }
    
    // Function to open modal
    function openModal() {
        isModalOpen = true;
        isVerified = false;
        verificationError = '';
        resetSuccess = false;
        resetMessage = '';
        codename = '';
        pin = '';
        gender = '';
        newPassword = '';
        confirmPassword = '';
        passwordError = '';
    }
    
    // Handle form submission for verification
async function handleVerify(event: Event) {
    event.preventDefault();
    if (!username || !codename || !pin || !gender) {
        verificationError = 'Please fill in all fields';
        return;
    }
    isVerifying = true;
    verificationError = '';
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('codename', codename);
    formData.append('pin', pin);
    formData.append('gender', gender);
    
    try {
        const response = await fetch('?/verifyIdentity', {
            method: 'POST',
            body: formData
        });
        
        // Use deserialize instead of response.json()
        const result = deserialize(await response.text());
        
        // Check the SvelteKit action type
        if (result.type === 'success') {
            isVerified = true;
            // Access your actual server return data via result.data
            verifiedUsername = result.data?.username || username; 
            verificationError = '';
        } else if (result.type === 'failure') {
            // SvelteKit puts your fail(400, { message: '...' }) inside result.data
            verificationError = result.data?.message || 'Verification failed';
        } else {
            verificationError = 'Unexpected server response';
        }
    } catch (error) {
        verificationError = 'An error occurred during verification';
    } finally {
        isVerifying = false;
    }
}


    
    // Handle password reset submission
async function handleReset(event: Event) {
    event.preventDefault();
    if (!newPassword || !confirmPassword) {
        passwordError = 'Please fill in both password fields';
        return;
    }
    if (newPassword !== confirmPassword) {
        passwordError = 'Passwords do not match';
        return;
    }
    if (newPassword.length < 6) {
        passwordError = 'Password must be at least 6 characters';
        return;
    }
    
    passwordError = '';
    const formData = new FormData();
    formData.append('username', verifiedUsername);
    formData.append('newPassword', newPassword);
    formData.append('confirmPassword', confirmPassword);
    
    try {
        const response = await fetch('?/resetPassword', {
            method: 'POST',
            body: formData
        });
        
        // Use deserialize to parse the SvelteKit action response
        const result = deserialize(await response.text());
        
        // Check if the action was successful
        if (result.type === 'success') {
            resetSuccess = true;
            resetMessage = result.data?.message || 'Password reset successful';
            
            // Close modal after 2 seconds and redirect to login
            setTimeout(() => {
                closeModal();
                goto('/login');
            }, 2000);
        } else if (result.type === 'failure') {
            passwordError = result.data?.message || 'Failed to reset password';
        }
    } catch (error) {
        passwordError = 'An error occurred while resetting password';
    }
}

</script>


<!-- Modal Overlay -->
{#if isModalOpen}
<div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-all duration-300 overflow-y-auto"
    onclick={closeModal}
>
    <!-- Modal Content -->
    <div 
        class="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-t-4 border-teal-500 dark:border-teal-600 transform transition-all duration-300 scale-100 my-8 max-h-[90vh] overflow-y-auto"
        onclick={(e) => e.stopPropagation()}
    >
        <!-- Modal Header -->
        <div class="sticky top-0 z-10 p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-t-2xl">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white text-center">
                {#if resetSuccess}
                    {m.success()}
                {:else if isVerified}
                    {m.reset_password()}
                {:else}
                    {m.verify_identity_title()}
                {/if}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                {#if resetSuccess}
                    {resetMessage}
                {:else if isVerified}
                    {m.enter_new_password()}
                {:else}
                    {m.verify_identity()}
                {/if}
            </p>
            {#if !isVerified && !resetSuccess}
            <p class="text-xs text-red-500 dark:text-red-400 text-center mt-2">
                {m.failed_attempts_warning()}
            </p>
            {/if}
        </div>
        
        <!-- Modal Body -->
        <div class="p-6">
            {#if resetSuccess}
                <div class="text-center">
                    <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400">{m.redirecting_to_login()}</p>
                </div>
            {:else if !isVerified}


                <!-- Verification Form -->
                <form onsubmit={handleVerify} class="space-y-5">
                    <!-- Username Field -->
                    {#if !data?.user?.username}
                    <div>
                        <label class="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            {m.username()}
                        </label>
                        <input 
                            type="text"
                            bind:value={username}
                            required 
                            class="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" 
                        />
                    </div>
                    {/if}
                    
                    <!-- Codename -->
                    <div>
                        <label class="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            {m.codename()}
                        </label>
                        <input 
                            type="text"
                            bind:value={codename}
                            required 
                            class="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" 
                        />
                    </div>

                    <!-- PIN -->
                    <div>
                        <label class="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            {m.pin()}
                        </label>
                        <input 
                            type="password" 
                            bind:value={pin}
                            maxlength="6" 
                            required 
                            class="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" 
                        />
                    </div>

                    <!-- Gender Selection -->
                    <div>
                        <label class="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            {m.gender()}
                        </label>
                        <div class="grid grid-cols-3 gap-3">
                            <label class="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition
                                {gender === 'male' 
                                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30' 
                                    : 'border-gray-300 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500'}">
                                <input 
                                    type="radio" 
                                    name="gender_radio" 
                                    value="male" 
                                    bind:group={gender}
                                    class="w-4 h-4 text-teal-600" 
                                />
                                <span class="text-sm text-gray-700 dark:text-gray-300">{m.male()}</span>
                            </label>
                            <label class="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition
                                {gender === 'female' 
                                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30' 
                                    : 'border-gray-300 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500'}">
                                <input 
                                    type="radio" 
                                    name="gender_radio" 
                                    value="female" 
                                    bind:group={gender}
                                    class="w-4 h-4 text-teal-600" 
                                />
                                <span class="text-sm text-gray-700 dark:text-gray-300">{m.female()}</span>
                            </label>
                            <label class="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition
                                {gender === 'other' 
                                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30' 
                                    : 'border-gray-300 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500'}">
                                <input 
                                    type="radio" 
                                    name="gender_radio" 
                                    value="other" 
                                    bind:group={gender}
                                    class="w-4 h-4 text-teal-600" 
                                />
                                <span class="text-sm text-gray-700 dark:text-gray-300">{m.other()}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Error Message -->
                    {#if verificationError}
                        <div class="p-3 bg-red-100 dark:bg-red-950/30 rounded-lg border border-red-300 dark:border-red-800">
                            <p class="text-sm text-red-600 dark:text-red-400">{verificationError}</p>
                        </div>
                    {/if}

                    <!-- Verify Button -->
                    <button 
                        type="submit"
                        disabled={isVerifying}
                        class="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl transition duration-200 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isVerifying ? m.verifying() : m.verify_identity()}
                    </button>
                    
                    <button 
                        type="button" 
                        onclick={closeModal} 
                        class="w-full px-5 py-2.5 text-gray-600 dark:text-gray-400 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
                    >
                        {m.cancel()}
                    </button>
                </form>
            {:else}
                <!-- Password Reset Form -->
                <form onsubmit={handleReset} class="space-y-5">
                    <!-- New Password -->
                    <div>
                        <label class="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            {m.new_password()}
                        </label>
                        <input 
                            type="password" 
                            bind:value={newPassword}
                            required 
                            minlength="6"
                            class="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" 
                        />
                    </div>

                    <!-- Confirm Password -->
                    <div>
                        <label class="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            {m.confirm_password()}
                        </label>
                        <input 
                            type="password" 
                            bind:value={confirmPassword}
                            required 
                            minlength="6"
                            class="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" 
                        />
                        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{m.password_min_length()}</p>
                    </div>

                    <!-- Password Error Message -->
                    {#if passwordError}
                        <div class="p-3 bg-red-100 dark:bg-red-950/30 rounded-lg border border-red-300 dark:border-red-800">
                            <p class="text-sm text-red-600 dark:text-red-400">{passwordError}</p>
                        </div>
                    {/if}

                    <!-- Reset Button -->
                    <button 
                        type="submit"
                        class="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl transition duration-200 transform hover:scale-[1.02] active:scale-95"
                    >
                        {m.reset_password()}
                    </button>
                    
                    <button 
                        type="button" 
                        onclick={closeModal} 
                        class="w-full px-5 py-2.5 text-gray-600 dark:text-gray-400 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
                    >
                        {m.cancel()}
                    </button>
                </form>
            {/if}
        </div>
    </div>
</div>
{/if}



<!-- Main Login Card -->
<div class="min-h-screen bg-sky-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors">
    <div class="w-full max-w-md bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-600 transform transition duration-500 hover:shadow-3xl">

        <!-- Centered SVG Icon -->
        <div class="flex justify-center mb-6">
            <img src={favicon} alt="Menu" class="dark:brightness-110" />
        </div>

        <Lang />
    
        <h1 class="mt-8 text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-1">{m.welcome()}</h1>
        <p class="text-center text-gray-500 dark:text-slate-400 mb-8">{m.sign_in_to_account()}</p>

        <!-- Display Server Message/Error -->
        {#if form?.message}
            <p class="text-sm bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-300 dark:border-red-700 mb-4">
                {form.message}
            </p>
        {/if}

        <form method="post" action="?/login" use:enhance class="space-y-6">
            <!-- Username Field -->
            <label class="block">
                <span class="text-gray-700 dark:text-slate-300 font-medium">{m.username()}</span>
                <input 
                    name="username" 
                    placeholder={m.enter_username()}
                    class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 rounded-xl shadow-inner text-gray-800 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                />
            </label>

            <!-- Password Field with Visibility Toggle -->
            <label class="block">
                <span class="text-gray-700 dark:text-slate-300 font-medium">{m.password()}</span>
                <div class="relative mt-1">
                    <input 
                        type={passwordVisible ? 'text' : 'password'} 
                        name="password"
                        placeholder="••••••••"
                        class="block w-full pr-12 px-4 py-2 bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 rounded-xl shadow-inner text-gray-800 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                    />
                    <button 
                        type="button" 
                        class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 transition"
                        onclick={togglePasswordVisibility}
                        aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                    >
                        {#if passwordVisible}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.638 0-8.406-2.583-11.85-6.071m-.151-.013L2.43 11.2m.112-1.127l1.011-1.011m1.127-.112l1.011-1.011m1.127-.112l1.011-1.011m1.127-.112l1.011-1.011m1.127-.112l1.011-1.011m1.127-.112l1.011-1.011m1.127-.112l1.011-1.011m1.127-.112l1.011-1.011M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
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
                <button 
                    type="button"
                    onclick={openModal}
                    class="font-semibold text-sky-600 dark:text-sky-400 hover:text-teal-500 dark:hover:text-teal-400 transition duration-150"
                >
                    {m.forgot_password()}?
                </button>
            </div>

            <!-- Login Button -->
            <button 
                type="submit"
                class="w-full bg-teal-600 dark:bg-teal-500 text-white font-bold px-4 py-3 rounded-xl shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600 
                       focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 transition duration-150 transform hover:scale-[1.01]"
            >
                {m.sign_in()}
            </button>

            <!-- Register Link/Button -->
            <div class="text-center pt-2">
                <p class="text-sm text-gray-600 dark:text-slate-400">
                    {m.no_account()}
                    <a href="/register" class="font-semibold text-sky-600 dark:text-sky-400 hover:text-teal-500 dark:hover:text-teal-400 transition duration-150">
                        {m.register_here()}
                    </a>
                </p>
            </div>
        </form>
    </div>
</div>