<script lang="ts">
    import { enhance } from '$app/forms';
    import { m } from '$lib/paraglide/messages';
    import { page } from '$app/stores';
    import { Eye, EyeOff, Upload, User } from 'lucide-svelte';

    let form = $page.form;
    
    // Password visibility states
    let passwordVisible = $state(false);
    let confirmPasswordVisible = $state(false);
    let pinVisible = $state(false);
    let confirmPinVisible = $state(false);
    
    // Avatar upload states
    let avatarUrl = $state('');
    let uploading = $state(false);
    let uploadError = $state('');
    
    // Toggle visibility functions
    function toggleVisibility(field: string) {
        if (field === 'password') passwordVisible = !passwordVisible;
        if (field === 'confirmPassword') confirmPasswordVisible = !confirmPasswordVisible;
        if (field === 'pin') pinVisible = !pinVisible;
        if (field === 'confirmPin') confirmPinVisible = !confirmPinVisible;
    }
    
    // Image upload handler
    async function uploadImage(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        
        if (!file) return;
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            uploadError = 'Please upload an image file';
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            uploadError = 'Image must be less than 5MB';
            return;
        }
        
        uploading = true;
        uploadError = '';
        
        // Simulate upload - replace with your actual upload endpoint
        const formData = new FormData();
        formData.append('image', file);
        
        try {
            // Replace with your actual upload API
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) throw new Error('Upload failed');
            
            const data = await response.json();
            avatarUrl = data.url;
        } catch (err) {
            uploadError = 'Failed to upload image. Please try again.';
            console.error(err);
        } finally {
            uploading = false;
        }
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
    <div class="w-full max-w-xl bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-500 transform transition-all duration-500 hover:shadow-3xl">
        <h1 class="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-1">{m.create_account()}</h1>
        <p class="text-center text-gray-500 dark:text-gray-400 mb-8">{m.enter_details()}</p>

        <!-- Display Server Message/Error -->
        {#if form?.message}
            <p class="text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-300 dark:border-red-700 mb-4 animate-pulse">
                {form.message}
            </p>
        {/if}

        <form 
            method="post" 
            action="?/register" 
            use:enhance={({ formData }) => {
                if (avatarUrl) {
                    formData.set('avatar', avatarUrl);
                }
            }} 
            class="space-y-6">

            <div class="grid grid-cols-1 gap-4">
                <!-- Username -->
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.username()}</span>
                    <input 
                        name="username" 
                        placeholder="e.g. haruna"
                        required
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus"
                    />
                </label>

                <!-- Codename (Unique Required) -->
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">
                        {m.codename()} ({m.required()}, {m.unique()})
                    </span>
                    <input 
                        name="codename" 
                        placeholder="e.g. snakeeyes"
                        required
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus"
                    />
                </label>
            </div>

            <!-- Password and Confirmation -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Password Field -->
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.password()}</span>
                    <div class="relative mt-1">
                        <input 
                            type={passwordVisible ? 'text' : 'password'} 
                            name="password"
                            placeholder="••••••••"
                            required
                            class="block w-full pr-10 px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus"
                        />
                        <button
                            type="button"
                            onclick={() => toggleVisibility('password')}
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            {#if passwordVisible}
                                <EyeOff class="w-4 h-4" />
                            {:else}
                                <Eye class="w-4 h-4" />
                            {/if}
                        </button>
                    </div>
                </label>

                <!-- Confirm Password Field -->
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.password_confirm()}</span>
                    <div class="relative mt-1">
                        <input 
                            type={confirmPasswordVisible ? 'text' : 'password'} 
                            name="passwordConfirm"
                            placeholder="••••••••"
                            required
                            class="block w-full pr-10 px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus"
                        />
                        <button
                            type="button"
                            onclick={() => toggleVisibility('confirmPassword')}
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            {#if confirmPasswordVisible}
                                <EyeOff class="w-4 h-4" />
                            {:else}
                                <Eye class="w-4 h-4" />
                            {/if}
                        </button>
                    </div>
                </label>
            </div>

            <!-- PIN and Confirmation -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- PIN Field -->
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">6-Digit PIN ({m.required()})</span>
                    <div class="relative mt-1">
                        <input 
                            name="pin"
                            type={pinVisible ? 'text' : 'password'}
                            placeholder="••••••"
                            required
                            maxlength="6"
                            class="block w-full pr-10 px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus"
                        />
                        <button
                            type="button"
                            onclick={() => toggleVisibility('pin')}
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            {#if pinVisible}
                                <EyeOff class="w-4 h-4" />
                            {:else}
                                <Eye class="w-4 h-4" />
                            {/if}
                        </button>
                    </div>
                </label>

                <!-- Confirm PIN Field -->
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.pin_confirm()}</span>
                    <div class="relative mt-1">
                        <input 
                            name="pinConfirm"
                            type={confirmPinVisible ? 'text' : 'password'}
                            placeholder="••••••"
                            required
                            maxlength="6"
                            class="block w-full pr-10 px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus"
                        />
                        <button
                            type="button"
                            onclick={() => toggleVisibility('confirmPin')}
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            {#if confirmPinVisible}
                                <EyeOff class="w-4 h-4" />
                            {:else}
                                <Eye class="w-4 h-4" />
                            {/if}
                        </button>
                    </div>
                </label>
            </div>

            <!-- Gender -->
            <label class="block">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{m.gender()}</span>
                <select 
                    name="gender" 
                    class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus appearance-none"
                >
                    <option value="">{m.gender_select()}</option>
                    <option value="male">{m.male()}</option>
                    <option value="female">{m.female()}</option>
                    <option value="other">{m.other()}</option>
                </select>
            </label>

            <!-- Separator -->
            <div class="border-t border-sky-200 dark:border-gray-700 pt-6 mt-6"></div>

            <!-- OPTIONAL FIELDS SECTION -->
            <h2 class="text-xl font-bold text-gray-600 dark:text-gray-400 mb-4">{m.optional()}</h2>

            <div class="grid grid-cols-1 gap-4">
                <!-- Avatar Upload -->
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.avatar()}</span>
                    <div class="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div class="flex-shrink-0">
                            {#if avatarUrl}
                                <img src={avatarUrl} alt="Preview" class="w-16 h-16 rounded-full object-cover border-2 border-sky-500 dark:border-teal-500" />
                            {:else}
                                <div class="w-16 h-16 rounded-full bg-sky-100 dark:bg-gray-700 flex items-center justify-center text-sky-400 dark:text-gray-500">
                                    <User class="h-8 w-8" />
                                </div>
                            {/if}
                        </div>

                        <div class="flex-1">
                            <label class="inline-flex items-center px-4 py-2 bg-teal-600 dark:bg-teal-500 text-white rounded-xl cursor-pointer hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors">
                                <Upload class="w-4 h-4 mr-2" />
                                <span class="text-sm font-medium">{m.upload_image()}</span>
                                <input type="file" accept="image/*" onchange={uploadImage} class="hidden" />
                            </label>
                            
                            {#if uploadError}
                                <p class="text-xs text-red-500 dark:text-red-400 mt-2 font-medium">{uploadError}</p>
                            {/if}
                        </div>
                    </div>
                    
                    <input type="hidden" name="avatar" value={avatarUrl} />
                    
                    {#if uploading}
                        <p class="text-xs text-teal-600 dark:text-teal-400 mt-2 animate-pulse">{m.uploading_image()}...</p>
                    {/if}
                </label>

                <!-- Date of Birth -->
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.dob()}</span>
                    <input 
                        type="date"
                        name="dateOfBirth" 
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus"
                    />
                </label>

                <!-- Email -->
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.email()}</span>
                    <input 
                        type="email"
                        name="email" 
                        placeholder="you@example.com"
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus"
                    />
                </label>

                <!-- Location -->
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.location()}</span>
                    <input 
                        name="city" 
                        placeholder="{m.city()}"
                        class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus"
                    />
                </label>
            </div>
            
            <!-- Register Button -->
            <button 
                disabled={uploading}
                class="w-full bg-teal-600 dark:bg-teal-500 text-white font-bold px-4 py-3 rounded-xl shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-700 transition duration-150 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
                {#if uploading}
                    {m.processing_image()}...
                {:else}
                    {m.register_here()}
                {/if}
            </button>

            <!-- Back to Login Link -->
            <div class="text-center pt-2">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    {m.have_account()}
                    <a href="/login" class="font-semibold text-sky-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition duration-150">
                        {m.sign_in()}
                    </a>
                </p>
            </div>
        </form>
    </div>
</div>

<style>
    /* Custom style for input focus state */
    .input-focus {
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .input-focus:focus {
        border-color: #14b8a6;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.2);
        outline: none;
    }
    
    /* Dark mode focus styles */
    .dark .input-focus:focus {
        border-color: #14b8a6;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.3);
    }
</style>