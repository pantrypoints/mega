<script lang="ts">
    import { setLocale } from '$lib/paraglide/runtime'; 
    import { goto } from '$app/navigation'; 
    
    const languageNames: Record<string, string> = {
        // 'bn': 'বাংলা (Bangla)',      // Bengali
        // 'cb': 'Cebuano',             // Cebuano (Assuming CB refers to Cebuano)
        'en': 'English',
        'es': 'Español',             // Spanish
        //'fr': 'Français',            // French
        'ps': 'پښتو (Pashto)',       // Pashto
        // 'ru': 'Русский (Russkiy)',   // Russian
        'tl': 'Tagalog',             // Tagalog/Filipino
        'vi': 'Tiếng Việt',          // Vietnamese
        'zh': '中文 (Zhōngwén)',      // Chinese (Mandarin)
        'jp': '日本語 (Nihongo)',    // Japanese
        //'ar': 'العربية (Arabic)',     // Arabic
        // 'hi': 'हिन्दी (Hindi)'       // Hindi
    };


    function changeLang(langCode: string) {
        document.cookie = `lang=${langCode}; path=/; max-age=31536000`; // persist 1 year
        setLocale(langCode);
        goto(window.location.pathname, { replaceState: true });
        console.log(`Language changed to: ${langCode}`);
    }
</script>


<!-- Language Selector Buttons -->
<div class="flex flex-wrap justify-center gap-3 p-4">
    {#each Object.entries(languageNames) as [code, name]}
        <button 
            class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium transition duration-150" 
            on:click={() => changeLang(code)}
        >
            {name}
        </button>
    {/each}
</div>





<!-- <script lang="ts">
    import { setLocale } from '$lib/paraglide/runtime';
	import { goto } from '$app/navigation';

    const languageNames: Record<string, string> = {
        'bn': 'বাংলা (Bangla)',      // Bengali
        'cb': 'Cebuano',             // Cebuano (Assuming CB refers to Cebuano)
        'en': 'English',
        'es': 'Español',             // Spanish
        'fr': 'Français',            // French
        'ps': 'پښتو (Pashto)',       // Pashto
        'ru': 'Русский (Russkiy)',   // Russian
        'tl': 'Tagalog',             // Tagalog/Filipino
        'vi': 'Tiếng Việt',          // Vietnamese
        'zh': '中文 (Zhōngwén)',      // Chinese (Mandarin)
        'jp': '日本語 (Nihongo)',    // Japanese
        'ar': 'العربية (Arabic)',     // Arabic
        'hi': 'हिन्दी (Hindi)'       // Hindi
    };

    /**
     * Emits the language code when a button is clicked.
     * @param langCode The ISO language code.
     */
    function changeLang(langCode: string) {
		document.cookie = `lang=${lang}; path=/; max-age=31536000`; // persist 1 year
		setLocale(lang);
		goto(window.location.pathname, { replaceState: true });
        console.log(`Language changed to: ${langCode}`);
    }
</script>



<div class="flex flex-wrap justify-center gap-3 p-4">
    {#each Object.entries(languageNames) as [code, name]}
        <button 
            class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium transition duration-150" 
            on:click={() => changeLang(code)}>
            {name}
        </button>
    {/each}
</div>
 -->


<!-- <div class="flex flex-wrap justify-center gap-2 mb-8">
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('bn')}>BN</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('cb')}>CB</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('en')}>EN</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('es')}>ES</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('fr')}>FR</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('ps')}>PS</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('ru')}>RU</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('tl')}>TL</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('vi')}>VI</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('zh')}>中文</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('jp')}>JP</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('ar')}>AR</button>
	<button class="px-3 py-1 bg-sky-100 rounded-lg hover:bg-sky-200 text-sm font-medium" on:click={() => changeLang('hi')}>HI</button>
</div>  -->
