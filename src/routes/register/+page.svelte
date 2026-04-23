<script lang="ts">
    import { enhance } from '$app/forms';
    import { m } from '$lib/paraglide/messages';
    import { page } from '$app/stores';
    import { Info, Eye, EyeOff, Upload, User } from 'lucide-svelte';

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

    // Status and Seeking states
    let selectedStatus = $state('');
    let selectedSeekingArray = $state<string[]>([]);
    let selectedRel = $state('');

    // Status options with unique letter codes
    const statusOptions = [
        { code: 's', label: m.status_single() },
        { code: 'sp', label: m.status_single_parent() },
        { code: 'rnc', label: m.status_relationship_no_children() },
        { code: 'rwc', label: m.status_relationship_with_children() },
        { code: 'enc', label: m.status_engaged_no_children() },
        { code: 'ewc', label: m.status_engaged_with_children() },
        { code: 'mnc', label: m.status_married_no_children() },
        { code: 'mwc', label: m.status_married_with_children() },
        { code: 'dnc', label: m.status_divorced_no_children() },
        { code: 'dwc', label: m.status_divorced_with_children() },
        { code: 'wnc', label: m.status_widowed_no_children() },
        { code: 'wwc', label: m.status_widowed_with_children() },
        { code: 'sepnc', label: m.status_separated_no_children() },
        { code: 'sepwc', label: m.status_separated_with_children() }
    ];

    // Seeking options with unique letter codes
    const seekingOptions = [
        { code: 'pc', label: m.seeking_professional_connections() },
        { code: 'bc', label: m.seeking_business_connections() },
        { code: 'ap', label: m.seeking_activity_partner() },
        { code: 'f', label: m.seeking_friendship() },
        { code: 'cf', label: m.seeking_close_friendship() },
        { code: 'rr', label: m.seeking_romantic_relationship() },
        { code: 'm', label: m.seeking_marriage() }
    ];

    const relOptions = [
        { code: 'on', label: m.on() },
        { code: 'off', label: m.off() }
    ];

    // New state variables
    let selectedEthnicity = $state('');
    let selectedNationality = $state('');

    // Ethnicity options
    const ethnicityOptions = [
        { code: 'east_asian', label: m.ethnicity_east_asian() },
        { code: 'south_asian', label: m.ethnicity_south_asian() },
        { code: 'southeast_asian', label: m.ethnicity_southeast_asian() },
        { code: 'middle_eastern', label: m.ethnicity_middle_eastern() },
        { code: 'white', label: m.ethnicity_white() },
        { code: 'latino', label: m.ethnicity_latino() },
        { code: 'native_american', label: m.ethnicity_native_american() },
        { code: 'african', label: m.ethnicity_african() },
        { code: 'pacific_islander', label: m.ethnicity_pacific_islander() },
        { code: 'arctic', label: m.ethnicity_arctic() },
        { code: 'other', label: m.ethnicity_other() }
    ];

    // Nationality options (common countries)
    const nationalityOptions = [
        { code: 'us', label: 'United States' },
        { code: 'uk', label: 'United Kingdom' },
        { code: 'ca', label: 'Canada' },
        { code: 'au', label: 'Australia' },
        { code: 'de', label: 'Germany' },
        { code: 'fr', label: 'France' },
        { code: 'jp', label: 'Japan' },
        { code: 'cn', label: 'China' },
        { code: 'in', label: 'India' },
        { code: 'ph', label: 'Philippines' },
        { code: 'vn', label: 'Vietnam' },
        { code: 'th', label: 'Thailand' },
        { code: 'id', label: 'Indonesia' },
        { code: 'my', label: 'Malaysia' },
        { code: 'sg', label: 'Singapore' },
        { code: 'other', label: m.other() }
    ];

    // Toggle visibility functions
    function toggleVisibility(field: string) {
        if (field === 'password') passwordVisible = !passwordVisible;
        if (field === 'confirmPassword') confirmPasswordVisible = !confirmPasswordVisible;
        if (field === 'pin') pinVisible = !pinVisible;
        if (field === 'confirmPin') confirmPinVisible = !confirmPinVisible;
    }





    import ImageKit from 'imagekit';

    let imagekit: ImageKit;

    // Initialize ImageKit on mount
    // import { onMount } from 'svelte';
    import { PUBLIC_IMAGEKIT_URL_ENDPOINT, PUBLIC_IMAGEKIT_PUBLIC_KEY } from '$env/static/public';
 


    // Updated upload function - no ImageKit SDK needed on client
    async function uploadImage(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            uploadError = 'Please upload an image file';
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            uploadError = 'Image must be less than 5MB';
            return;
        }

        uploading = true;
        uploadError = '';

        try {
            // Step 1: Get authentication parameters from your server
            const authResponse = await fetch('/api/imagekit-auth');
            const authParams = await authResponse.json();

            // Step 2: Create form data for direct ImageKit upload
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', file.name);
            formData.append('publicKey', PUBLIC_IMAGEKIT_PUBLIC_KEY);
            formData.append('signature', authParams.signature);
            formData.append('expire', authParams.expire);
            formData.append('token', authParams.token);
            formData.append('useUniqueFileName', 'true');
            formData.append('folder', '/avatars');

            // Step 3: Upload directly to ImageKit's API
            const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
                method: 'POST',
                body: formData
            });

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.message || 'Upload failed');
            }
            
            const data = await uploadResponse.json();
            avatarUrl = data.url;
        } catch (err) {
            uploadError = err instanceof Error ? err.message : 'Failed to upload image. Please try again.';
            console.error('Upload error:', err);
        } finally {
            uploading = false;
        }
    }



</script>

<div class="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
    <div class="w-full max-w-xl bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-500 transform transition-all duration-500 hover:shadow-3xl">
        <h1 class="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-1">{m.create_account()}</h1>
        <p class="text-center text-gray-500 dark:text-gray-400 mb-8">{m.enter_details()}</p>

        {#if form?.message}
            <p class="text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg border border-red-300 dark:border-red-700 mb-4 animate-pulse">
                {form.message}
            </p>
        {/if}

        <form
            method="post"
            action="?/register"
            use:enhance={({ formData }) => {
                if (avatarUrl) formData.set('avatar', avatarUrl);
                if (selectedStatus) formData.set('status', selectedStatus);
                if (selectedSeekingArray.length > 0) formData.set('seeking', selectedSeekingArray.join(','));
                if (selectedRel) formData.set('relationshipMode', selectedRel);
                if (selectedEthnicity) formData.set('ethnicity', selectedEthnicity);
                if (selectedNationality) formData.set('nationality', selectedNationality);
            }}
            class="space-y-6"
        >
            <div class="grid grid-cols-1 gap-4">
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.username()}</span>
                    <input name="username" placeholder="e.g. haruna" required class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus" />
                </label>

                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.codename()} ({m.required()}, {m.unique()})</span>
                    <input name="codename" placeholder="e.g. snakeeyes" required class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus" />
                </label>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.password()}</span>
                    <div class="relative mt-1">
                        <input type={passwordVisible ? 'text' : 'password'} name="password" placeholder="••••••••" required class="block w-full pr-10 px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus" />
                        <button type="button" onclick={() => toggleVisibility('password')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                            {#if passwordVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                        </button>
                    </div>
                </label>

                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.password_confirm()}</span>
                    <div class="relative mt-1">
                        <input type={confirmPasswordVisible ? 'text' : 'password'} name="passwordConfirm" placeholder="••••••••" required class="block w-full pr-10 px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus" />
                        <button type="button" onclick={() => toggleVisibility('confirmPassword')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                            {#if confirmPasswordVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                        </button>
                    </div>
                </label>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">6-Digit PIN ({m.required()})</span>
                    <div class="relative mt-1">
                        <input name="pin" type={pinVisible ? 'text' : 'password'} placeholder="••••••" required maxlength="6" class="block w-full pr-10 px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus" />
                        <button type="button" onclick={() => toggleVisibility('pin')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                            {#if pinVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                        </button>
                    </div>
                </label>

                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.pin_confirm()}</span>
                    <div class="relative mt-1">
                        <input name="pinConfirm" type={confirmPinVisible ? 'text' : 'password'} placeholder="••••••" required maxlength="6" class="block w-full pr-10 px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus" />
                        <button type="button" onclick={() => toggleVisibility('confirmPin')} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                            {#if confirmPinVisible}<EyeOff class="w-4 h-4" />{:else}<Eye class="w-4 h-4" />{/if}
                        </button>
                    </div>
                </label>
            </div>

            <label class="block">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{m.gender()}</span>
                <select name="gender" class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus appearance-none">
                    <option value="">{m.gender_select()}</option>
                    <option value="male">{m.male()}</option>
                    <option value="female">{m.female()}</option>
                    <option value="other">{m.other()}</option>
                </select>
            </label>

            <div class="border-t border-sky-200 dark:border-gray-700 pt-6 mt-6"></div>

            <h2 class="text-xl font-bold text-gray-600 dark:text-gray-400 mb-4">{m.optional()}</h2>

            <div class="grid grid-cols-1 gap-4">
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
                        <div class="flex-1 w-full space-y-3">
                            <input
                                type="url"
                                bind:value={avatarUrl}
                                placeholder="e.g. https://www.superphysics.org/icons/Juan.jpg"
                                class="block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus text-sm"
                            />
                            <div class="flex items-center gap-3">
                                <span class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">OR</span>
                                <label class="inline-flex items-center px-4 py-2 bg-teal-600 dark:bg-teal-500 text-white rounded-xl cursor-pointer hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors">
                                    <Upload class="w-4 h-4 mr-2" />
                                    <span class="text-sm font-medium">{m.upload_image()}</span>
                                    <input type="file" accept="image/*" onchange={uploadImage} class="hidden" />
                                </label>
                            </div>
                            {#if uploadError}<p class="text-xs text-red-500 dark:text-red-400 mt-2 font-medium">{uploadError}</p>{/if}
                        </div>
                    </div>
                    <input type="hidden" name="avatar" value={avatarUrl} />
                    {#if uploading}<p class="text-xs text-teal-600 dark:text-teal-400 mt-2 animate-pulse">Uploading Image..</p>{/if}

                    <!-- {m.uploading_image()}... -->
                </label>

                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.dob()}</span>
                    <input type="date" name="dateOfBirth" class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus" />
                </label>

                <label class="block">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-gray-700 dark:text-gray-300 font-medium">{m.status()}</span>
                        <div class="relative group">
                            <Info class="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-help hover:text-teal-500 dark:hover:text-teal-400 transition-colors" />
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                                <div class="font-medium mb-1 text-teal-400">{m.visible_()}</div>
                                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                            </div>
                        </div>
                    </div>
                    <select bind:value={selectedStatus} class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus appearance-none">
                        <option value="">{m.status_select()}</option>
                        {#each statusOptions as option}
                            <option value={option.code}>{option.label}</option>
                        {/each}
                    </select>
                </label>

                <label class="block">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-gray-700 dark:text-gray-300 font-medium">{m.seeking()}</span>
                        <div class="relative group">
                            <Info class="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-help hover:text-teal-500 dark:hover:text-teal-400 transition-colors" />
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                                <div class="font-medium mb-1 text-teal-400">{m.seeking_info()}</div>
                                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2 grid grid-cols-2 gap-2 p-3 bg-sky-50 dark:bg-gray-700 rounded-xl">
                        {#each seekingOptions as option}
                            <label class="flex items-center gap-2 cursor-pointer hover:bg-sky-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors">
                                <input type="checkbox" value={option.code} bind:group={selectedSeekingArray} class="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" />
                                <span class="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                            </label>
                        {/each}
                    </div>
                    <input type="hidden" name="seeking" value={selectedSeekingArray.join(',')} />
                </label>

                <label class="block">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-gray-700 dark:text-gray-300 font-medium">{m.ethnicity()}</span>
                        <div class="relative group">
                            <Info class="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-help hover:text-teal-500 dark:hover:text-teal-400 transition-colors" />
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                                <div class="font-medium mb-1 text-teal-400">{m.visible_()}</div>
                                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                            </div>
                        </div>
                    </div>
                    <select bind:value={selectedEthnicity} class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus appearance-none">
                        <option value="">{m.ethnicity_select()}</option>
                        <option value="east_asian">{m.ethnicity_east_asian()}</option>
                        <option value="south_asian">{m.ethnicity_south_asian()}</option>
                        <option value="southeast_asian">{m.ethnicity_southeast_asian()}</option>
                        <option value="middle_eastern">{m.ethnicity_middle_eastern()}</option>
                        <option value="white">{m.ethnicity_white()}</option>
                        <option value="latino">{m.ethnicity_latino()}</option>
                        <option value="native_american">{m.ethnicity_native_american()}</option>
                        <option value="african">{m.ethnicity_african()}</option>
                        <option value="pacific_islander">{m.ethnicity_pacific_islander()}</option>
                        <option value="arctic">{m.ethnicity_arctic()}</option>
                        <option value="other">{m.ethnicity_other()}</option>
                    </select>
                </label>

                <label class="block">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-gray-700 dark:text-gray-300 font-medium">{m.nationality()}</span>
                        <div class="relative group">
                            <Info class="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-help hover:text-teal-500 dark:hover:text-teal-400 transition-colors" />
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                                <div class="font-medium mb-1 text-teal-400">{m.visible_()}</div>
                                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                            </div>
                        </div>
                    </div>
                    <select bind:value={selectedNationality} class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus appearance-none">
                        <option value="">{m.nationality_select()}</option>
                        {#each nationalityOptions as option}
                            <option value={option.code}>{option.label}</option>
                        {/each}
                    </select>
                </label>

                <label class="block">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-gray-700 dark:text-gray-300 font-medium">{m.relationship_mode()}</span>
                        <div class="relative group">
                            <Info class="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-help hover:text-teal-500 dark:hover:text-teal-400 transition-colors" />
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                                <div class="font-medium mb-1 text-teal-400">{m.relationship_()}</div>
                                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                            </div>
                        </div>
                    </div>
                    <select bind:value={selectedRel} class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus appearance-none">
                        <option value="">{m.choose_rel()}</option>
                        {#each relOptions as option}
                            <option value={option.code}>{option.label}</option>
                        {/each}
                    </select>
                </label>

                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.email()}</span>
                    <input type="email" name="email" placeholder="you@example.com" class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus" />
                </label>

                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.phone()}</span>
                    <input name="phone" placeholder="+1 234 567 8900" class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus" />
                </label>

                <label class="block">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.location()}</span>
                    <input name="city" placeholder="{m.city()}" class="mt-1 block w-full px-4 py-2 bg-sky-50 dark:bg-gray-700 border border-sky-200 dark:border-gray-600 rounded-xl shadow-inner text-gray-800 dark:text-gray-100 input-focus" />
                </label>
            </div>

            <button disabled={uploading} class="w-full bg-teal-600 dark:bg-teal-500 text-white font-bold px-4 py-3 rounded-xl shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-700 transition duration-150 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed mt-8">
                {#if uploading}{m.processing_image()}...{:else}{m.submit()}{/if}
            </button>

            <div class="text-center pt-2">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    {m.have_account()} <a href="/login" class="font-semibold text-sky-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition duration-150">{m.sign_in()}</a>
                </p>
            </div>
        </form>
    </div>
</div>

<style>
    .input-focus {
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    .input-focus:focus {
        border-color: #14b8a6;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.2);
        outline: none;
    }
    .dark .input-focus:focus {
        border-color: #14b8a6;
        box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.3);
    }
</style>

