<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { Handshake, User, Lock, Ruler, Star, CheckCircle, XCircle } from 'lucide-svelte';
    import { enhance } from '$app/forms';
    import { scale } from 'svelte/transition';

	export let data: PageData;
	export let form: ActionData;

    $: ({
        productId, name, points, measure, category, photo, giverId, 
        giverAvatar, giverCodename, buyerAvatar, buyerId
    } = data);
    
    // State for the form
    let amount = 1;
    $: totalPoints = points * amount;
    
    // State for the form flow
    let step: 'form' | 'confirmation' = 'form';
    let isSubmitting = false;

    // Buyer's authentication details
    let codename = '';
    let pin = '';
    
    // Handle form transition to confirmation step
    function proceedToConfirmation() {
        if (!codename || !pin || amount <= 0 || isNaN(amount)) {
            // Simple front-end validation
            alert('Please enter a valid Codename, PIN, and Amount greater than 0.');
            return;
        }
        step = 'confirmation';
    }

    // Handle form enhancement for loading state
    const transactionEnhance = () => {
        return async ({ update }) => {
            isSubmitting = true;
            await update();
            isSubmitting = false;
        };
    };
    
</script>

<svelte:head>
	<title>New Barter Transaction - {name}</title>
</svelte:head>


<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
	<div class="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 transform transition duration-500 hover:shadow-3xl">
		<h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1 flex items-center justify-center gap-3">
            <Handshake class="w-7 h-7 text-teal-600"/>
            New Barter Transaction
        </h1>
		<p class="text-center text-gray-500 mb-8">Confirm purchase details for {name}</p>

		<!-- Display Server Message/Error -->
		{#if form?.message}
			<p class="text-sm bg-red-100 text-red-600 p-3 rounded-lg border border-red-300 mb-4 animate-pulse">
				{form.message}
			</p>
		{/if}

        <!-- Product Summary Card (Always Visible) -->
        <div class="flex items-center space-x-4 p-4 bg-teal-50 rounded-xl mb-6 shadow-inner">
            <img src={photo} alt={name} class="w-16 h-16 object-cover rounded-lg border border-teal-200"
                 onerror="this.onerror=null;this.src='https://placehold.co/100x100/e5e7eb/6b7280?text=P'"
            >
            <div class="flex-grow">
                <p class="font-bold text-lg text-teal-800 truncate">{name}</p>
                <div class="flex items-center text-sm text-gray-600 gap-3">
                    <span class="flex items-center"><Star class="w-3 h-3 mr-1 text-orange-500 fill-orange-500" /> {points.toFixed(0)} Points/{measure}</span>
                    <span class="flex items-center"><Tag class="w-3 h-3 mr-1" /> {category}</span>
                </div>
            </div>
        </div>

        <!-- STEP 1: Form Input -->
        {#if step === 'form'}
            <form on:submit|preventDefault={proceedToConfirmation} class="space-y-6">
                <h2 class="text-xl font-semibold text-gray-700 border-b pb-2">Your Details (Buyer)</h2>
                
                <!-- Codename Input -->
                <div class="relative">
                    <label for="codename" class="block text-sm font-medium text-gray-700 mb-1">Your Codename</label>
                    <input
                        id="codename"
                        type="text"
                        bind:value={codename}
                        required
                        class="w-full p-3 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 pl-10 transition"
                        placeholder="e.g., alpha-wolf"
                    />
                    <User class="absolute left-3 top-1/2 transform translate-y-2 w-5 h-5 text-gray-400" />
                </div>
                
                <!-- PIN Input -->
                <div class="relative">
                    <label for="pin" class="block text-sm font-medium text-gray-700 mb-1">Your PIN</label>
                    <input
                        id="pin"
                        type="password"
                        bind:value={pin}
                        required
                        class="w-full p-3 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 pl-10 transition"
                        placeholder="4-digit PIN"
                    />
                    <Lock class="absolute left-3 top-1/2 transform translate-y-2 w-5 h-5 text-gray-400" />
                </div>

                <h2 class="text-xl font-semibold text-gray-700 border-b pb-2 pt-4">Order Details</h2>
                
                <!-- Amount Input -->
                <div class="relative">
                    <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">Amount ({measure})</label>
                    <input
                        id="amount"
                        type="number"
                        min="1"
                        step="0.01"
                        bind:value={amount}
                        required
                        class="w-full p-3 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 pr-20 transition"
                        placeholder="Quantity"
                    />
                    <span class="absolute right-0 top-1/2 transform translate-y-1/4 mr-4 text-gray-500 uppercase font-medium">{measure}</span>
                </div>

                <!-- Total Points Display -->
                <div class="p-4 bg-orange-50 rounded-xl flex justify-between items-center border border-orange-200">
                    <span class="text-lg font-semibold text-gray-800">Total Points Cost:</span>
                    <span class="text-3xl font-extrabold text-orange-600 flex items-center" transition:scale>
                        <Star class="w-6 h-6 mr-2 fill-orange-500 text-orange-500"/>
                        {totalPoints.toFixed(2)}
                    </span>
                </div>

                <button
                    type="submit"
                    class="w-full bg-teal-600 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-teal-700 transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2"
                >
                    <CheckCircle class="w-5 h-5" />
                    Review & Confirm Transaction
                </button>
            </form>
        {/if}

        <!-- STEP 2: Confirmation -->
        {#if step === 'confirmation'}
            <form method="POST" action="?/confirmTransaction" use:enhance={transactionEnhance} class="space-y-6">
                <h2 class="text-2xl font-bold text-teal-600 mb-4">Final Confirmation</h2>
                <p class="text-gray-600">Please review the transaction details before submitting.</p>

                <!-- Summary Details -->
                <div class="space-y-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <!-- Buyer/Seller Avatars -->
                    <div class="flex justify-around text-center border-b pb-3 mb-3">
                        <div>
                            <img src={buyerAvatar || 'https://i.pravatar.cc/150?img=6'} alt="Buyer" class="w-16 h-16 rounded-full mx-auto mb-2 object-cover" />
                            <p class="font-bold text-gray-800">Buyer (You)</p>
                            <p class="text-sm text-gray-500">{codename}</p>
                        </div>
                        <div class="self-center text-teal-600 text-3xl font-extrabold">🤝</div>
                        <div>
                            <img src={giverAvatar || 'https://i.pravatar.cc/150?img=6'} alt="Seller" class="w-16 h-16 rounded-full mx-auto mb-2 object-cover" />
                            <p class="font-bold text-gray-800">Seller</p>
                            <p class="text-sm text-gray-500">{giverCodename}</p>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-y-2 text-gray-700">
                        <span class="font-semibold">Product:</span>
                        <span class="truncate">{name}</span>
                        
                        <span class="font-semibold">Amount:</span>
                        <span>{amount.toFixed(2)} {measure}</span>

                        <span class="font-semibold">Unit Price:</span>
                        <span>{points.toFixed(2)} Points</span>
                        
                        <span class="font-bold text-xl text-orange-600 mt-2">TOTAL COST:</span>
                        <span class="font-bold text-xl text-orange-600 mt-2 flex items-center">
                            <Star class="w-5 h-5 mr-1 fill-orange-500 text-orange-500"/>
                            {totalPoints.toFixed(2)} Points
                        </span>
                    </div>
                </div>

                <!-- Hidden inputs for server verification -->
                <input type="hidden" name="codename" value={codename} />
                <input type="hidden" name="pin" value={pin} />
                <input type="hidden" name="amount" value={String(amount)} />
                <input type="hidden" name="totalPoints" value={String(totalPoints)} />
                <input type="hidden" name="giverId" value={giverId} />
                <input type="hidden" name="name" value={name} />
                <input type="hidden" name="pointsPrice" value={String(points)} />
                <input type="hidden" name="measure" value={measure} />
                <input type="hidden" name="photo" value={photo} />
                <input type="hidden" name="category" value={category} />

                <!-- Action Buttons -->
                <div class="flex gap-4 pt-4">
                    <button
                        type="button"
                        on:click={() => step = 'form'}
                        class="w-1/3 py-3 rounded-xl font-bold text-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200 flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                    >
                        <XCircle class="w-5 h-5" />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        name="action"
                        value="confirmTransaction"
                        class="w-2/3 py-3 rounded-xl font-bold text-lg shadow-md transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2"
                        class:bg-teal-600={!isSubmitting}
                        class:hover:bg-teal-700={!isSubmitting}
                        class:bg-teal-400={isSubmitting}
                        disabled={isSubmitting}
                    >
                        {#if isSubmitting}
                            <span class="animate-spin inline-block mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                            Processing...
                        {:else}
                            <CheckCircle class="w-5 h-5" />
                            Confirm Transaction
                        {/if}
                    </button>
                </div>
            </form>
        {/if}
	</div>
</div>
