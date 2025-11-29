<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
    
    import { setLocale } from '$lib/paraglide/runtime';
    import { m } from '$lib/paraglide/messages.js';

	let { form }: { form: ActionData } = $props();

	let showPassword = false;
	let showPin = false;

    let passwordVisible = $state(false);

    function togglePasswordVisibility() {
        passwordVisible = !passwordVisible;
    }

    let confirmPasswordVisible = $state(false);

    // State for PIN visibility toggles
    let pinVisible = $state(false);
    let confirmPinVisible = $state(false);

    function toggleVisibility(fieldState: string) {
        if (fieldState === 'password') passwordVisible = !passwordVisible;
        if (fieldState === 'confirmPassword') confirmPasswordVisible = !confirmPasswordVisible;
        if (fieldState === 'pin') pinVisible = !pinVisible;
        if (fieldState === 'confirmPin') confirmPinVisible = !confirmPinVisible;
    }
</script>


<!-- Main Registration Card -->
<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
    <div class="w-full max-w-xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 transform transition duration-500 hover:shadow-3xl">
        <h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1">{m.create_account()}</h1>
        <p class="text-center text-gray-500 mb-8">{m.enter_details()}</p>

        <!-- Display Server Message/Error -->
        {#if form?.message}
            <p class="text-sm bg-red-100 text-red-600 p-3 rounded-lg border border-red-300 mb-4 animate-pulse">
                {form.message}
            </p>
        {/if}

        <form method="post" action="?/register" use:enhance class="space-y-6">           
            <div class="grid grid-cols-1 gap-4">
                <!-- Username (Standard) -->
                <label class="block">
                    <span class="text-gray-700 font-medium">Username (Login ID)</span>
                    <input 
                        name="username" 
                        placeholder="e.g., jane_doe_99"
                        required
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus"
                    />
                </label>

                <!-- Codename (Unique Required) -->
                <label class="block">
                    <span class="text-gray-700 font-medium">Codename (Required, Unique)</span>
                    <input 
                        name="codename" 
                        placeholder="e.g., Phoenix_Agent"
                        required
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus"
                    />
                </label>
            </div>


            <!-- Password and Confirmation -->
            <div class="grid grid-cols-2 gap-4">
                <!-- Password Field -->
                <label class="block">
                    <span class="text-gray-700 font-medium">Password</span>
                    <div class="relative mt-1">
                        <input 
                            type={passwordVisible ? 'text' : 'password'} 
                            name="password"
                            placeholder="••••••••"
                            required
                            class="block w-full pr-12 px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus"
                        />
                        <!-- <ToggleButton fieldType="password" visible={passwordVisible} toggleFn={toggleVisibility} /> -->
                    </div>
                </label>

                <!-- Confirm Password Field -->
                <label class="block">
                    <span class="text-gray-700 font-medium">Confirm Password</span>
                    <div class="relative mt-1">
                        <input 
                            type={confirmPasswordVisible ? 'text' : 'password'} 
                            name="passwordConfirm"
                            placeholder="••••••••"
                            required
                            class="block w-full pr-12 px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus"
                        />
                        <!-- <ToggleButton fieldType="confirmPassword" visible={confirmPasswordVisible} toggleFn={toggleVisibility} /> -->
                    </div>
                </label>
            </div>

            <!-- PIN and Confirmation -->
            <div class="grid grid-cols-2 gap-4">
                <!-- PIN Field -->
                <label class="block">
                    <span class="text-gray-700 font-medium">6-Digit PIN (Required)</span>
                    <div class="relative mt-1">
                        <input 
                            name="pin"
                            placeholder="123456"
                            required
                            maxlength="6"
                            class="block w-full pr-12 px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus"
                        />
                        <!-- <ToggleButton fieldType="pin" visible={pinVisible} toggleFn={toggleVisibility} /> -->
                    </div>
                </label>

                <!-- Confirm PIN Field -->
                <label class="block">
                    <span class="text-gray-700 font-medium">Confirm PIN</span>
                    <div class="relative mt-1">
                        <input 
                            name="pinConfirm"
                            placeholder="123456"
                            required
                            maxlength="6"
                            class="block w-full pr-12 px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus"
                        />
                        <!-- <ToggleButton fieldType="confirmPin" visible={confirmPinVisible} toggleFn={toggleVisibility} /> -->
                    </div>
                </label>
            </div>

            <!-- Gender -->
            <label class="block">
                <span class="text-gray-700 font-medium">Gender</span>
                <select 
                    name="gender" 
                    class="mt-1 block w-full px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus appearance-none"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </label>


            <!-- Separator -->
            <div class="border-t border-sky-200 pt-6 mt-6"></div>

            <!-- OPTIONAL FIELDS SECTION -->
            <h2 class="text-xl font-bold text-gray-600 mb-4">{m.optional()}</h2>

            <div class="grid grid-cols-1 gap-4">
                <!-- Avatar -->
                <label class="block">
                    <span class="text-gray-700 font-medium">Avatar URL</span>
                    <input 
                        name="avatar" 
                        placeholder="https://example.com/avatar.png"
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus"
                    />
                </label>

                <!-- Date of Birth -->
                <label class="block">
                    <span class="text-gray-700 font-medium">{m.dob()}</span>
                    <input 
                        type="date"
                        name="dateOfBirth" 
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus"
                    />
                </label>

                <!-- Email -->
                <label class="block">
                    <span class="text-gray-700 font-medium">Email</span>
                    <input 
                        type="email"
                        name="email" 
                        placeholder="you@example.com"
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus"
                    />
                </label>

                <!-- Phone -->
                <label class="block">
                    <span class="text-gray-700 font-medium">{m.mobile()}</span>
                    <input 
                        type="tel"
                        name="phone" 
                        placeholder="(555) 555-5555"
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus"
                    />
                </label>

                <!-- Location -->
                <label class="block">
                    <span class="text-gray-700 font-medium">{m.location()}</span>
                    <input 
                        name="location" 
                        placeholder="City, Country"
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 border border-sky-200 rounded-xl shadow-inner text-gray-800 input-focus"
                    />
                </label>
            </div>
            
            <!-- Register Button -->
            <button 
                class="w-full bg-teal-600 text-white font-bold px-4 py-3 rounded-xl shadow-lg hover:bg-teal-700 
                       focus:outline-none focus:ring-4 focus:ring-teal-300 transition duration-150 transform hover:scale-[1.01] mt-8"
                >
                {m.register_here()}
            </button>

            <!-- Back to Login Link -->
            <div class="text-center pt-2">
                <p class="text-sm text-gray-600">
                    {m.have_account()}
                    <a href="/login" class="font-semibold text-sky-600 hover:text-teal-500 transition duration-150">
                        {m.sign_in()}
                    </a>
                </p>
            </div>
        </form>
    </div>
</div>

<style>
    /* Custom style for input focus state to reuse teal color */
    .input-focus {
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .input-focus:focus {
        border-color: var(--color-teal-500); /* Teal color in focus */
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.2); /* Teal ring */
    }
    :root {
        --color-teal-500: #14b8a6;
    }
</style>