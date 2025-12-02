<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import { Send, Trash2, User, MessageSquare } from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';

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
	// This avoids websockets but keeps the chat somewhat live
	let interval;
	onMount(() => {
		interval = setInterval(() => {
			invalidateAll();
		}, 3000);
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>


<div class="min-h-screen bg-sky-50 flex flex-col md:flex-row h-screen pt-4 pb-4 px-2 md:px-8 gap-4">
	
	<!-- LEFT COLUMN: Contacts / History -->
	<div class="w-full md:w-1/3 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border-t-4 border-teal-500">
		<div class="p-4 bg-teal-50 border-b border-teal-100">
			<h2 class="text-xl font-bold text-teal-800 flex items-center gap-2">
				<MessageSquare class="w-5 h-5" /> Chats
			</h2>
		</div>
	
<div class="overflow-y-auto flex-1 p-2">
	{#if data.contacts.length === 0}
		<div class="text-center text-gray-400 mt-10 p-4">
			No conversation history yet. Visit a user profile to start chatting.
		</div>
	{/if}

	<div class="flex flex-wrap gap-3">
		{#each data.contacts as contact}
			<a
				href="/chat?with={contact.id}"
				class="w-[48%] sm:w-[31%] md:w-[48%] lg:w-[31%] 
                       p-4 rounded-2xl flex flex-col items-center text-center
                       transition-all border bg-white shadow-sm
                       hover:shadow-md hover:bg-sky-50 
                       border-transparent hover:border-sky-100"
				
				class:bg-sky-100={data.activeReceiver?.id === contact.id}
				class:border-teal-200={data.activeReceiver?.id === contact.id}
			>
				<!-- Avatar -->
				{#if contact.avatar}
					<img
						src={contact.avatar}
						alt={contact.username}
						class="w-14 h-14 rounded-full object-cover border border-gray-200 mb-3"
					/>
				{:else}
					<div class="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mb-3">
						<User class="w-7 h-7" />
					</div>
				{/if}

				<!-- Labels -->
				<div class="w-full overflow-hidden">
					<p class="font-bold text-gray-800 truncate">{contact.username}</p>
					<p class="text-xs text-gray-500 truncate">@{contact.codename}</p>
				</div>
			</a>
		{/each}
	</div>
</div>

	</div>

	<!-- RIGHT COLUMN: Chat Area -->
	<div class="w-full md:w-2/3 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border-t-4 border-teal-500 relative">
		
		{#if data.activeReceiver}
			<!-- Chat Header -->
			<div class="p-4 bg-white border-b border-gray-100 flex items-center gap-3 shadow-sm z-10">
				{#if data.activeReceiver.avatar}
					<img src={data.activeReceiver.avatar} alt="avatar" class="w-10 h-10 rounded-full object-cover" />
				{:else}
					<div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
						<User class="w-5 h-5 text-gray-500" />
					</div>
				{/if}
				<div>
					<h3 class="font-bold text-gray-800">{data.activeReceiver.username}</h3>
					<p class="text-xs text-teal-600">Max 10 messages stored</p>
				</div>
			</div>

			<!-- Messages List -->
			<div 
				bind:this={chatContainer}
				class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
			>
				{#each data.conversation as msg (msg.id)}
					{@const isMe = msg.sender === userId}
					
					<div class="flex w-full {isMe ? 'justify-end' : 'justify-start'}">
						<div class="max-w-[75%] group relative">
							<!-- Message Bubble -->
							<div 
								class="p-3 rounded-2xl shadow-sm text-sm break-words
								{isMe ? 'bg-teal-500 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}"
							>
								{msg.content}
							</div>
							
							<!-- Meta / Delete -->
							<div class="flex items-center gap-2 mt-1 px-1 {isMe ? 'justify-end' : 'justify-start'}">
								<span class="text-[10px] text-gray-400">
									{new Date(msg.dateCreated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
								</span>
								
								<!-- Only show delete if it is my message -->
								{#if isMe}
									<form method="POST" action="?/deleteMessage" use:enhance>
										<input type="hidden" name="messageId" value={msg.id} />
										<button class="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500" title="Delete">
											<Trash2 class="w-3 h-3" />
										</button>
									</form>
								{/if}
							</div>
						</div>
					</div>
				{:else}
					<div class="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
						<MessageSquare class="w-12 h-12 opacity-20" />
						<p>No messages yet.</p>
						<p class="text-xs">Say hello!</p>
					</div>
				{/each}
			</div>

			<!-- Input Area -->
			<div class="p-4 bg-white border-t border-gray-100">
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
						class="bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-700 transition-colors shadow-lg active:scale-95"
					>
						<Send class="w-5 h-5" />
					</button>
					<input 
						type="text" 
						name="content" 
						placeholder="Type a message..." 
						required
						class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
					/>

				</form>
			</div>

		{:else}
			<!-- Empty State (No Receiver Selected) -->
			<div class="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
				<div class="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-4">
					<MessageSquare class="w-10 h-10 text-teal-400" />
				</div>
				<h3 class="text-xl font-bold text-gray-700">Select a chat</h3>
				<p class="text-gray-400 mt-2 text-center max-w-xs">
					Choose a contact from the left or visit a user's profile to start a new conversation.
				</p>
			</div>
		{/if}
	</div>
</div>