<script>
	export let error;
	export let status;
</script>

<style>
	/* Simple floating animation */
	@keyframes float {
		0% { transform: translateY(0px); }
		50% { transform: translateY(-12px); }
		100% { transform: translateY(0px); }
	}

	.float {
		animation: float 3s ease-in-out infinite;
	}
</style>

<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
	<div class="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-orange-500 transform transition duration-500 hover:shadow-3xl flex flex-col items-center text-center">

		<!-- Animated 404 -->
		<div class="float select-none">
			<span class="text-red-600 text-3xl sm:text-4xl font-black drop-shadow-lg">404</span>
		</div>

		<h1 class="text-3xl sm:text-4xl font-extrabold text-red-700 mt-6 mb-3">
			Page Not Found
		</h1>

		<p class="text-gray-600 mb-6 text-sm leading-relaxed">
			Sorry, the page you were looking for couldn’t be found.
		</p>

		<a href="/" 
			class="mt-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition active:scale-95">
			Go Back Home
		</a>
	</div>
</div>
