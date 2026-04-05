<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { invalidateAll, invalidate } from '$app/navigation';
	import { Send, Trash2, User, MessageSquare } from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';

	let { data } = $props();
	
	// Defensive check for user ID (as requested)
	const userId = data?.user?.id || 'me';
	
	// Auto-scroll to bottom of chat
	let chatContainer;
	$effect(() => {
		if (data.conversation && chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	});

	// Simple Polling Mechanism (Refresh every 3 seconds)
	let interval;
	onMount(() => {
		interval = setInterval(() => {
			invalidate('layout'); //	
			// invalidateAll();
		}, 3000);
	});

    onDestroy(() => {
        clearInterval(interval);
    });

	// onDestroy(() => {
	// 	if (interval) clearInterval(interval);
	// });

</script>




<div class="min-h-screen bg-sky-50 dark:bg-sky-950 flex flex-col md:flex-row h-screen pt-4 pb-4 px-2 md:px-8 gap-4">
	
	<!-- LEFT COLUMN: Contacts / History -->
	<div class="w-full md:w-1/3 bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden flex flex-col border-t-4 border-sky-500 dark:border-sky-600">
		<div class="p-4 bg-sky-50 dark:bg-sky-950/50 border-b border-sky-100 dark:border-sky-900">
			<h2 class="text-xl font-bold text-sky-800 dark:text-sky-400 flex items-center gap-2">
				<MessageSquare class="w-5 h-5" /> {m.chats()}
			</h2>
		</div>
	
		<div class="overflow-y-auto flex-1 p-2">
			{#if data.contacts.length === 0}
				<div class="text-center text-gray-400 dark:text-gray-500 mt-10 p-4">
					{m.no_conversation_history()}
				</div>
			{/if}

			<div class="flex flex-wrap gap-3">
				{#each data.contacts as contact}
					<a
						href="/chat?with={contact.id}"
						class="w-[48%] sm:w-[31%] md:w-[48%] lg:w-[31%] 
							   p-4 rounded-2xl flex flex-col items-center text-center
							   transition-all border bg-white dark:bg-gray-800 shadow-sm
							   hover:shadow-md hover:bg-sky-50 dark:hover:bg-sky-950/50
							   border-transparent hover:border-sky-100 dark:hover:border-sky-800
							   {data.activeReceiver?.id === contact.id 
							     ? 'bg-sky-100 dark:bg-sky-950/70 border-sky-200 dark:border-sky-700' 
							     : ''}"
					>
						<!-- Avatar -->
						{#if contact.avatar}
							<img
								src={contact.avatar}
								alt={contact.username}
								class="w-14 h-14 rounded-full object-cover border border-gray-200 dark:border-gray-700 mb-3"
							/>
						{:else}
							<div class="w-14 h-14 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-3">
								<User class="w-7 h-7" />
							</div>
						{/if}

						<!-- Labels -->
						<div class="w-full overflow-hidden">
							<p class="font-bold text-gray-800 dark:text-white truncate">{contact.username}</p>
							<p class="text-xs text-gray-500 dark:text-gray-400 truncate">@{contact.codename}</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>

	<!-- RIGHT COLUMN: Chat Area -->
	<div class="w-full md:w-2/3 bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden flex flex-col border-t-4 border-sky-500 dark:border-sky-600 relative">
		
		{#if data.activeReceiver}
			<!-- Chat Header -->
			<div class="p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 shadow-sm z-10">
				<a href={'/users/' + data.activeReceiver.id} class="rounded-full hover:opacity-85 transition-opacity">
					{#if data.activeReceiver.avatar}
						<img src={data.activeReceiver.avatar} alt="avatar" class="w-10 h-10 rounded-full object-cover" />
					{:else}
						<div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
							<User class="w-5 h-5 text-gray-500 dark:text-gray-400" />
						</div>
					{/if}
				</a>

				<div>
					<h3 class="font-bold text-gray-800 dark:text-white">{data.activeReceiver.username}</h3>
					<p class="text-xs text-sky-600 dark:text-sky-400">{m.max_messages_stored()}</p>
				</div>
			</div>

			<!-- Messages List -->
			<div 
				bind:this={chatContainer}
				class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-gray-950"
			>
				{#each data.conversation as msg (msg.id)}
					{@const isMe = msg.sender === userId}
					
					<div class="flex w-full {isMe ? 'justify-end' : 'justify-start'}">
						<div class="max-w-[75%] group relative">
							<!-- Message Bubble -->
							<div 
								class="p-3 rounded-2xl shadow-sm text-sm break-words
								{isMe 
									? 'bg-sky-500 dark:bg-sky-600 text-white rounded-tr-none' 
									: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-tl-none'}"
							>
								{msg.content}
							</div>
							
							<!-- Meta / Delete -->
							<div class="flex items-center gap-2 mt-1 px-1 {isMe ? 'justify-end' : 'justify-start'}">
								<span class="text-[10px] text-gray-400 dark:text-gray-500">
									{new Date(msg.dateCreated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
								</span>
								
								<!-- Only show delete if it is my message -->
								{#if isMe}
									<form method="POST" action="?/deleteMessage" use:enhance>
										<input type="hidden" name="messageId" value={msg.id} />
										<button class="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400" title="Delete">
											<Trash2 class="w-3 h-3" />
										</button>
									</form>
								{/if}
							</div>
						</div>
					</div>
				{:else}
					<div class="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 space-y-2">
						<MessageSquare class="w-12 h-12 opacity-20" />
						<p>{m.no_messages_yet()}</p>
						<p class="text-xs">{m.say_hello()}</p>
					</div>
				{/each}
			</div>

			<!-- Input Area -->
			<div class="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
				<form 
					method="POST" 
					action="?/sendMessage&with={data.activeReceiver.id}" 
					use:enhance={() => {
						return async ({ update }) => {
							await update({ reset: true });
						};
					}}
					class="flex gap-2"
				>
					<button 
						type="submit" 
						class="bg-sky-600 dark:bg-sky-700 text-white p-3 rounded-xl hover:bg-sky-700 dark:hover:bg-sky-600 transition-colors shadow-lg active:scale-95"
					>
						<Send class="w-5 h-5" />
					</button>
					<input 
						type="text" 
						name="content" 
						placeholder={m.type_message()} 
						required
						class="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
					/>
				</form>
			</div>

		{:else}
			<!-- Empty State (No Receiver Selected) -->
			<div class="flex-1 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-8">
				<div class="w-20 h-20 bg-sky-50 dark:bg-sky-950/50 rounded-full flex items-center justify-center mb-4">
					<MessageSquare class="w-10 h-10 text-sky-400 dark:text-sky-500" />
				</div>
				<h3 class="text-xl font-bold text-gray-700 dark:text-gray-300">{m.select_chat()}</h3>
				<p class="text-gray-400 dark:text-gray-500 mt-2 text-center max-w-xs">
					{m.choose_contact()}
				</p>
			</div>
		{/if}
	</div>
</div>
