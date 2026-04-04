<script lang="ts">
  import type { PageData } from './$types';
  import { HandCoins, HandHelping, ArrowLeft, Calendar, DollarSign, Tag, FileText, CheckCircle, XCircle, Clock, Users, Package, ArrowUpRight, ArrowDownRight } from 'lucide-svelte';
  import { page } from '$app/state';
  
  export let data: PageData;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'transferred': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getKindColor = (kind: string) => {
    switch (kind) {
      case 'debt': return 'bg-red-100 text-red-800';
      case 'credit': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getUserRole = () => {
    if (data.transaction.giverId === data.currentUserId) {
      return 'giver';
    } else if (data.transaction.getterId === data.currentUserId) {
      return 'getter';
    }
    return 'unknown';
  };
</script>



<svelte:head>
  <title>Transaction #{data.transaction.id} - {data.transaction.name}</title>
</svelte:head>




<div class="min-h-screen bg-sky-50 dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 flex flex-col items-center p-4 sm:p-8 transition-colors duration-300">
    
    <div class="w-full max-w-4xl bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 transform transition duration-500 hover:shadow-3xl dark:shadow-2xl/50 dark:border-t-sky-600">
        
        <a href="/transactions" class="inline-flex items-center text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition mb-6 font-medium">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Back to Transactions
        </a>
        
        <div class="flex justify-between items-start mb-2">
            <div>
                <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                    {data.transaction.name}
                </h1>
                <div class="flex flex-wrap items-center gap-2 mb-8">
                    <span class="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
                        ID: #{data.transaction.id}
                    </span>
                    <span class={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(data.transaction.status)}`}>
                        {data.transaction.status.toUpperCase()}
                    </span>
                    <span class={`px-3 py-1 rounded-full text-sm font-medium ${getKindColor(data.transaction.kind)}`}>
                        {data.transaction.kind.toUpperCase()}
                    </span>
                </div>
            </div>
            
            <div class="text-center">
                <div class="text-4xl font-bold text-sky-700 dark:text-sky-400">
                    {data.transaction.points.toFixed(2)}
                </div>
                <div class="text-lg text-gray-500 dark:text-slate-400 font-medium">Points</div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

            <div class="space-y-3 p-5 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border-l-4 border-sky-400 dark:border-sky-600 transition-colors">
                <div class="flex items-center text-gray-600 dark:text-slate-300">
                    <HandHelping class="w-5 h-5 mr-2 text-sky-600 dark:text-sky-400" />
                    <span class="font-semibold">Giver</span>
                </div>
                <div class="flex items-center">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center mr-3">
                        <span class="text-white font-bold">
                            {data.transaction.giver?.codename?.charAt(0).toUpperCase() || 'G'}
                        </span>
                    </div>
                    <div>
                        <div class="font-bold text-gray-900 dark:text-white">
                            {data.transaction.giver?.codename || data.transaction.giver?.username || 'Unknown'}
                        </div>
                        <div class="text-sm text-gray-600 dark:text-slate-400">
                            {getUserRole() === 'giver' ? 'You' : 'Provided goods/services'}
                        </div>
                    </div>
                </div>
            </div>

            <div class="space-y-3 p-5 bg-teal-50 dark:bg-teal-900/20 rounded-2xl border-l-4 border-teal-400 dark:border-teal-600 transition-colors">
                <div class="flex items-center text-gray-600 dark:text-slate-300">
                    <HandCoins class="w-5 h-5 mr-2 text-teal-600 dark:text-teal-400" />
                    <span class="font-semibold">Getter</span>
                </div>
                <div class="flex items-center">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center mr-3">
                        <span class="text-white font-bold">
                            {data.transaction.getter?.codename?.charAt(0).toUpperCase() || 'R'}
                        </span>
                    </div>
                    <div>
                        <div class="font-bold text-gray-900 dark:text-white">
                            {data.transaction.getter?.codename || data.transaction.getter?.username || 'Unknown'}
                        </div>
                        <div class="text-sm text-gray-600 dark:text-slate-400">
                            {getUserRole() === 'getter' ? 'You' : 'Received goods/services'}
                        </div>
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                {#if data.transaction.photo}
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">Photo</h3>
                        <div class="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3] bg-gray-100 dark:bg-slate-800 border dark:border-slate-700">
                            <img 
                                src={data.transaction.photo} 
                                alt={data.transaction.name} 
                                class="w-full h-full object-cover transition-opacity duration-300"
                            />
                        </div>
                    </div>
                {/if}
            </div>
            
            <div class="space-y-6">
                <div class="space-y-3 p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border-l-4 border-gray-400 dark:border-slate-600 transition-colors">
                    <div class="flex items-center text-gray-600 dark:text-slate-300">
                        <FileText class="w-5 h-5 mr-2 text-sky-600 dark:text-sky-400" />
                        <span class="font-semibold">Transaction Details</span>
                    </div>
                    <div class="grid grid-cols-1 gap-3">
                        <div>
                            <div class="text-sm text-gray-500 dark:text-slate-400">Category</div>
                            <div class="font-bold text-gray-900 dark:text-white">{data.transaction.category}</div>
                        </div>
                        <div>
                            <div class="text-sm text-gray-500 dark:text-slate-400">Type</div>
                            <div class="font-bold text-gray-900 dark:text-white capitalize">{data.transaction.kind}</div>
                        </div>
                        <div>
                            <div class="text-sm text-gray-500 dark:text-slate-400">Status</div>
                            <div class="font-bold text-gray-900 dark:text-white capitalize">{data.transaction.status}</div>
                        </div>
                        <div>
                            <div class="text-sm text-gray-500 dark:text-slate-400">Created</div>
                            <div class="font-bold text-gray-900 dark:text-white">{formatDate(data.transaction.dateCreated)}</div>
                        </div>
                    </div>
                </div>
                
                {#if data.transaction.notes}
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                            <FileText class="w-5 h-5 mr-2 text-gray-600 dark:text-slate-400" />
                            Notes
                        </h3>
                        <div class="p-5 bg-gray-50 dark:bg-slate-800 rounded-2xl border-t border-gray-100 dark:border-slate-700 transition-colors">
                            <p class="text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                                {data.transaction.notes}
                            </p>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        
        {#if data.transaction.status === 'pending'}
            <div class="mt-10 pt-6 border-t border-gray-200 dark:border-slate-800">
                <div class="flex gap-4">
                    <button class="flex-1 bg-red-600 dark:bg-red-700 text-white py-3 rounded-2xl font-bold hover:bg-red-700 dark:hover:bg-red-600 transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2">
                        <XCircle class="w-5 h-5" />
                        Cancel Transaction
                    </button>
                </div>
            </div>
        {/if}
        
    </div>
</div>