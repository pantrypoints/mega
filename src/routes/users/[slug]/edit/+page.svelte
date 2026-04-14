<script lang="ts">
    import type { PageData } from './$types';
    import { 
        ArrowLeft, User, Mail, Phone, MapPin, 
        Calendar, VenusAndMars, Save, Info, Upload, 
        Heart, Sparkles, Users, ChevronDown
    } from 'lucide-svelte';
    import { enhance } from '$app/forms';
    import { m } from '$lib/paraglide/messages.js';

    let { data } = $props();
    const { profile } = data;

    // Avatar upload states
    let avatarUrl = $state(profile.avatar || '');
    let uploading = $state(false);
    let uploadError = $state('');

    // Form states
    let gender = $state(profile.gender || '');
    let dateOfBirth = $state(profile.dateOfBirth || '');
    let status = $state(profile.status || '');
    let seekingArray = $state(profile.seeking ? profile.seeking.split(',') : []);
    let rel = $state(profile.rel || 'off');
    let ethnicity = $state(profile.ethnicity || '');
    let nationality = $state(profile.nationality || '');
    let email = $state(profile.email || '');
    let phone = $state(profile.phone || '');
    let city = $state(profile.city || '');

    // Status options
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

    // Seeking options
    const seekingOptions = [
        { code: 'pc', label: m.seeking_professional_connections() },
        { code: 'bc', label: m.seeking_business_connections() },
        { code: 'ap', label: m.seeking_activity_partner() },
        { code: 'f', label: m.seeking_friendship() },
        { code: 'cf', label: m.seeking_close_friendship() },
        { code: 'rr', label: m.seeking_romantic_relationship() },
        { code: 'm', label: m.seeking_marriage() }
    ];

    // Relationship options
    const relOptions = [
        { code: 'on', label: m.on() },
        { code: 'off', label: m.off() }
    ];

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

    // Nationality options
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

    // Image upload handler
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

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/upload', { method: 'POST', body: formData });
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

<div class="min-h-screen bg-sky-50 dark:bg-black flex items-center justify-center p-4">
    <div class="w-full max-w-2xl bg-white dark:bg-gray-900 p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 dark:border-sky-600">
        
        <a href="/users/{profile.slug}" class="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition mb-6 font-medium">
            <ArrowLeft class="w-4 h-4 mr-1" /> 
            {m.back_to_profile()}
        </a>

        <h1 class="text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-1">
            {m.edit()} {profile.username}
        </h1>
        <p class="text-center text-gray-500 dark:text-gray-400 mb-8">{m.update_personal_info()}</p>

        <form method="POST" use:enhance={({ formData }) => {
            if (avatarUrl) formData.set('avatar', avatarUrl);
            if (status) formData.set('status', status);
            if (seekingArray.length > 0) formData.set('seeking', seekingArray.join(','));
            if (rel) formData.set('rel', rel);
            if (ethnicity) formData.set('ethnicity', ethnicity);
            if (nationality) formData.set('nationality', nationality);
        }} class="space-y-6">

            <!-- Username (Read-only) -->
<!--             <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {m.username()}
                </label>
                <input 
                    type="text" 
                    value={profile.username} 
                    disabled 
                    class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 rounded-xl bg-gray-100 dark:bg-gray-800 cursor-not-allowed" 
                />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.username_cannot_change()}</p>
            </div> -->

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
                        {#if uploadError}<p class="text-xs text-red-500 dark:text-red-400 mt-2 font-medium">{uploadError}</p>{/if}
                    </div>
                </div>
                <input type="hidden" name="avatar" value={avatarUrl} />
                {#if uploading}<p class="text-xs text-teal-600 dark:text-teal-400 mt-2 animate-pulse">{m.uploading_image()}...</p>{/if}
            </label>

            <!-- Gender -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {m.gender()} <span class="text-red-500">*</span>
                </label>
                <select bind:value={gender} name="gender" required class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition appearance-none">
                    <option value="">{m.gender_select()}</option>
                    <option value="male">{m.male()}</option>
                    <option value="female">{m.female()}</option>
                    <option value="other">{m.other()}</option>
                </select>
            </div>

            <!-- Date of Birth -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {m.date_of_birth()}
                </label>
                <input type="date" bind:value={dateOfBirth} name="dateOfBirth" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
            </div>

            <!-- Status -->
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.status()}</span>
                    <div class="relative group">
                        <Info class="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-help hover:text-teal-500 dark:hover:text-teal-400 transition-colors" />
                        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                            <div class="font-medium mb-1 text-teal-400">{m.status_info()}</div>
                            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                        </div>
                    </div>
                </div>
                <select bind:value={status} name="status" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition appearance-none">
                    <option value="">{m.status_select()}</option>
                    {#each statusOptions as option}
                        <option value={option.code}>{option.label}</option>
                    {/each}
                </select>
            </div>

            <!-- Seeking (Multiple Checkboxes) -->
            <div>
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
                            <input type="checkbox" value={option.code} bind:group={seekingArray} class="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" />
                            <span class="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                        </label>
                    {/each}
                </div>
                <input type="hidden" name="seeking" value={seekingArray.join(',')} />
            </div>

            <!-- Relationship Mode -->
            <div>
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
                <select bind:value={rel} name="rel" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition appearance-none">
                    {#each relOptions as option}
                        <option value={option.code}>{option.label}</option>
                    {/each}
                </select>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.rel_info()}</p>
            </div>

            <!-- Ethnicity -->
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.ethnicity()}</span>
                    <div class="relative group">
                        <Info class="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-help hover:text-teal-500 dark:hover:text-teal-400 transition-colors" />
                        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                            <div class="font-medium mb-1 text-teal-400">{m.ethnicity_info()}</div>
                            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                        </div>
                    </div>
                </div>
                <select bind:value={ethnicity} name="ethnicity" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition appearance-none">
                    <option value="">{m.ethnicity_select()}</option>
                    {#each ethnicityOptions as option}
                        <option value={option.code}>{option.label}</option>
                    {/each}
                </select>
            </div>

            <!-- Nationality -->
            <div>
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-gray-700 dark:text-gray-300 font-medium">{m.nationality()}</span>
                    <div class="relative group">
                        <Info class="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-help hover:text-teal-500 dark:hover:text-teal-400 transition-colors" />
                        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                            <div class="font-medium mb-1 text-teal-400">{m.nationality_info()}</div>
                            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45"></div>
                        </div>
                    </div>
                </div>
                <select bind:value={nationality} name="nationality" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition appearance-none">
                    <option value="">{m.nationality_select()}</option>
                    {#each nationalityOptions as option}
                        <option value={option.code}>{option.label}</option>
                    {/each}
                </select>
            </div>

            <!-- Email -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {m.email_address()}
                </label>
                <input type="email" bind:value={email} name="email" placeholder="you@example.com" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
            </div>

            <!-- Phone -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {m.phone_number()}
                </label>
                <input type="tel" bind:value={phone} name="phone" placeholder="+1 234 567 8900" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
            </div>

            <!-- City -->
            <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {m.city()}
                </label>
                <input type="text" bind:value={city} name="city" placeholder="Your city" class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
            </div>

            <!-- Submit Button -->
            <button type="submit" disabled={uploading} class="w-full bg-teal-600 dark:bg-teal-500 text-white font-bold px-4 py-3 rounded-xl shadow-lg hover:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-700 transition duration-150 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed">
                {#if uploading}{m.processing_image()}...{:else}{m.save_changes()}{/if}
            </button>
        </form>
    </div>
</div>
