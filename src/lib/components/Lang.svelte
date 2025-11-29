<script lang="ts">
    import { setLocale } from '$lib/paraglide/runtime';
	import { goto } from '$app/navigation';

	function changeLang(lang: string) {
		document.cookie = `lang=${lang}; path=/; max-age=31536000`; // persist 1 year
		setLocale(lang);
		goto(window.location.pathname, { replaceState: true });
	}
</script>


<div class="flex flex-wrap justify-center gap-2 mb-8">
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
</div>
