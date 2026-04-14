<script lang="ts">
    import { enhance } from '$app/forms';
    import { m } from '$lib/paraglide/messages';
    import { page } from '$app/stores';
    import { Eye, EyeOff, Key, Hash, Lock, Shield, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-svelte';
    
    // let form = $page.form;
    // let { data } = $props();

  let { data, form } = $props(); // Access form directly from props in Svelte 5


    // Tab state
    let activeTab = $state('password'); // 'password', 'pin', 'codename'
    
    // Password visibility states
    let currentPasswordVisible = $state(false);
    let newPasswordVisible = $state(false);
    let confirmPasswordVisible = $state(false);
    let currentPinVisible = $state(false);
    let newPinVisible = $state(false);
    let confirmPinVisible = $state(false);
    let currentCodenameVisible = $state(false);
    let newCodenameVisible = $state(false);
    let confirmCodenameVisible = $state(false);
    
    // Form fields
    let currentPassword = $state('');
    let newPassword = $state('');
    let confirmPassword = $state('');
    
    let currentPin = $state('');
    let newPin = $state('');
    let confirmPin = $state('');
    
    let currentCodename = $state('');
    let newCodename = $state('');
    let confirmCodename = $state('');
    
    // UI state
    let successMessage = $state('');
    let errorMessage = $state('');
    
    function toggleVisibility(field: string) {
        switch(field) {
            case 'currentPassword': currentPasswordVisible = !currentPasswordVisible; break;
            case 'newPassword': newPasswordVisible = !newPasswordVisible; break;
            case 'confirmPassword': confirmPasswordVisible = !confirmPasswordVisible; break;
            case 'currentPin': currentPinVisible = !currentPinVisible; break;
            case 'newPin': newPinVisible = !newPinVisible; break;
            case 'confirmPin': confirmPinVisible = !confirmPinVisible; break;
            case 'currentCodename': currentCodenameVisible = !currentCodenameVisible; break;
            case 'newCodename': newCodenameVisible = !newCodenameVisible; break;
            case 'confirmCodename': confirmCodenameVisible = !confirmCodenameVisible; break;
        }
    }
    
    function clearMessages() {
        successMessage = '';
        errorMessage = '';
    }



  // Enhanced form handler
  const handleResult = () => {
    return ({ result, update }) => {
      clearMessages();
      if (result.type === 'success') {
        successMessage = result.data.message;
        // Reset local state fields
        currentPassword = ''; newPassword = ''; confirmPassword = '';
        currentPin = ''; newPin = ''; confirmPin = '';
        currentCodename = ''; newCodename = ''; confirmCodename = '';
      } else if (result.type === 'failure') {
        errorMessage = result.data.message;
      }
      update(); // This keeps SvelteKit's default behavior working
    };
  };

</script>

<!-- <form method="POST" action="?/changePin" use:enhance={handleResult} class="space-y-6">
<form method="POST" action="?/changeCodename" use:enhance={handleResult} class="space-y-6"> -->


<svelte:head>
    <title>{m.change_credentials()} | Pantrypoints</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
    <div class="max-w-2xl mx-auto">
        
        <!-- Back Button -->
        <a href="/users/{data?.user?.slug}" class="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition mb-6 font-medium">
            <ArrowLeft class="w-4 h-4 mr-1" />
            {m.back_to_profile()}
        </a>

        <!-- Main Card -->
        <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-600 overflow-hidden">
            
            <!-- Tabs -->
            <div class="flex border-b border-gray-200 dark:border-gray-700">
                <button
                    onclick={() => { activeTab = 'password'; clearMessages(); }}
                    class="flex-1 px-6 py-4 text-center font-semibold transition-all duration-200
                        {activeTab === 'password' 
                            ? 'bg-white dark:bg-gray-800 text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                >
                    <Key class="w-4 h-4 inline mr-2" />
                    {m.change_password()}
                </button>
                <button
                    onclick={() => { activeTab = 'pin'; clearMessages(); }}
                    class="flex-1 px-6 py-4 text-center font-semibold transition-all duration-200
                        {activeTab === 'pin' 
                            ? 'bg-white dark:bg-gray-800 text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                >
                    <Lock class="w-4 h-4 inline mr-2" />
                    {m.change_pin()}
                </button>
                <button
                    onclick={() => { activeTab = 'codename'; clearMessages(); }}
                    class="flex-1 px-6 py-4 text-center font-semibold transition-all duration-200
                        {activeTab === 'codename' 
                            ? 'bg-white dark:bg-gray-800 text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}"
                >
                    <Hash class="w-4 h-4 inline mr-2" />
                    {m.change_codename()}
                </button>
            </div>

            <!-- Tab Content -->
            <div class="p-6 sm:p-8">
                
                <!-- Success/Error Messages -->
                {#if successMessage}
                    <div class="mb-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-xl border border-green-300 dark:border-green-700 flex items-center gap-3">
                        <CheckCircle class="w-5 h-5 text-green-600 dark:text-green-400" />
                        <p class="text-green-700 dark:text-green-300">{successMessage}</p>
                    </div>
                {/if}
                
                {#if errorMessage}
                    <div class="mb-6 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl border border-red-300 dark:border-red-700 flex items-center gap-3">
                        <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400" />
                        <p class="text-red-700 dark:text-red-300">{errorMessage}</p>
                    </div>
                {/if}

<!--                 {#if form?.message}
                    <div class="mb-6 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl border border-red-300 dark:border-red-700">
                        <p class="text-red-700 dark:text-red-300">{form.message}</p>
                    </div>
                {/if} -->

                <!-- CHANGE PASSWORD TAB -->
                {#if activeTab === 'password'}
                    <!-- <form method="POST" action="?/changePassword" use:enhance class="space-y-6"> -->
                    <form method="POST" action="?/changePassword" use:enhance={handleResult} class="space-y-6">
                        <div class="text-center mb-4">
                            <div class="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Shield class="w-8 h-8 text-sky-600 dark:text-sky-400" />
                            </div>
                            <h2 class="text-xl font-bold text-gray-800 dark:text-white">{m.change_password()}</h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{m.verify_codename_pin()}</p>
                        </div>

                        <!-- Verification: Codename -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.codename()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={currentCodenameVisible ? 'text' : 'password'}
                                    bind:value={currentCodename}
                                    name="codename"
                                    required
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('currentCodename')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if currentCodenameVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                        </div>

                        <!-- Verification: PIN -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.pin()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={currentPinVisible ? 'text' : 'password'}
                                    bind:value={currentPin}
                                    name="pin"
                                    maxlength="6"
                                    required
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('currentPin')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if currentPinVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                        </div>

                        <div class="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                        <!-- New Password -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.new_password()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={newPasswordVisible ? 'text' : 'password'}
                                    bind:value={newPassword}
                                    name="newPassword"
                                    required
                                    minlength="6"
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('newPassword')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if newPasswordVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.password_min_length()}</p>
                        </div>

                        <!-- Confirm New Password -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.confirm_new_password()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    bind:value={confirmPassword}
                                    name="confirmPassword"
                                    required
                                    minlength="6"
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('confirmPassword')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if confirmPasswordVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                        </div>

                        <button type="submit" class="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition duration-200 transform hover:scale-[1.01]">
                            {m.update_password()}
                        </button>
                    </form>

                <!-- CHANGE PIN TAB -->
                {:else if activeTab === 'pin'}
                    <form method="POST" action="?/changePin" use:enhance class="space-y-6">
                        <div class="text-center mb-4">
                            <div class="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Lock class="w-8 h-8 text-sky-600 dark:text-sky-400" />
                            </div>
                            <h2 class="text-xl font-bold text-gray-800 dark:text-white">{m.change_pin()}</h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{m.verify_codename_password()}</p>
                        </div>

                        <!-- Verification: Codename -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.codename()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={currentCodenameVisible ? 'text' : 'password'}
                                    bind:value={currentCodename}
                                    name="codename"
                                    required
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('currentCodename')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if currentCodenameVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                        </div>

                        <!-- Verification: Current Password -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.current_password()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={currentPasswordVisible ? 'text' : 'password'}
                                    bind:value={currentPassword}
                                    name="currentPassword"
                                    required
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('currentPassword')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if currentPasswordVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                        </div>

                        <div class="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                        <!-- New PIN -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.new_pin()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={newPinVisible ? 'text' : 'password'}
                                    bind:value={newPin}
                                    name="newPin"
                                    maxlength="6"
                                    required
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('newPin')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if newPinVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.pin_length()}</p>
                        </div>

                        <!-- Confirm New PIN -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.confirm_new_pin()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={confirmPinVisible ? 'text' : 'password'}
                                    bind:value={confirmPin}
                                    name="confirmPin"
                                    maxlength="6"
                                    required
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('confirmPin')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if confirmPinVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                        </div>

                        <button type="submit" class="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition duration-200 transform hover:scale-[1.01]">
                            {m.update_pin()}
                        </button>
                    </form>

                <!-- CHANGE CODENAME TAB -->
                {:else if activeTab === 'codename'}
                    <form method="POST" action="?/changeCodename" use:enhance class="space-y-6">
                        <div class="text-center mb-4">
                            <div class="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Hash class="w-8 h-8 text-sky-600 dark:text-sky-400" />
                            </div>
                            <h2 class="text-xl font-bold text-gray-800 dark:text-white">{m.change_codename()}</h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{m.verify_password_pin()}</p>
                        </div>

                        <!-- Verification: Current Password -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.current_password()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={currentPasswordVisible ? 'text' : 'password'}
                                    bind:value={currentPassword}
                                    name="currentPassword"
                                    required
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('currentPassword')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if currentPasswordVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                        </div>

                        <!-- Verification: Current PIN -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.pin()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={currentPinVisible ? 'text' : 'password'}
                                    bind:value={currentPin}
                                    name="pin"
                                    maxlength="6"
                                    required
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('currentPin')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if currentPinVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                        </div>

                        <div class="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                        <!-- New Codename -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.new_codename()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={newCodenameVisible ? 'text' : 'password'}
                                    bind:value={newCodename}
                                    name="newCodename"
                                    required
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('newCodename')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if newCodenameVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.codename_rules()}</p>
                        </div>

                        <!-- Confirm New Codename -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {m.confirm_new_codename()} <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <input 
                                    type={confirmCodenameVisible ? 'text' : 'password'}
                                    bind:value={confirmCodename}
                                    name="confirmCodename"
                                    required
                                    class="w-full px-4 py-3 pr-10 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                                <button type="button" onclick={() => toggleVisibility('confirmCodename')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    {#if confirmCodenameVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                                </button>
                            </div>
                        </div>

                        <button type="submit" class="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition duration-200 transform hover:scale-[1.01]">
                            {m.update_codename()}
                        </button>
                    </form>
                {/if}
            </div>
        </div>
    </div>
</div>