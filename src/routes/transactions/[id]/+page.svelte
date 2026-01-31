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




<div class="min-h-screen bg-sky-50 flex flex-col items-center p-4 sm:p-8">
    <div class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500 transform transition duration-500 hover:shadow-3xl">
        
        <!-- Back Button -->
        <a href="/transactions" class="inline-flex items-center text-sky-600 hover:text-sky-800 transition mb-6 font-medium">
            <ArrowLeft class="w-4 h-4 mr-1" />
            Back to Transactions
        </a>
        
        <!-- Header -->
        <div class="flex justify-between items-start mb-2">
            <div>
                <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
                    {data.transaction.name}
                </h1>
                <div class="flex flex-wrap items-center gap-2 mb-8">
                    <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
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
            
            <!-- Points Display -->
            <div class="text-center">
                <div class="text-4xl font-bold text-sky-700">
                    {data.transaction.points.toFixed(2)}
                </div>
                <div class="text-lg text-gray-500 font-medium">Points</div>
            </div>
        </div>
        
        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <!-- Giver Card -->
          <div class="space-y-3 p-5 bg-sky-50 rounded-2xl border-l-4 border-sky-400">
              <div class="flex items-center text-gray-600">
                  <HandHelping class="w-5 h-5 mr-2 text-sky-600" />
                  <span class="font-semibold">Giver</span>
              </div>
              <div class="flex items-center">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center mr-3">
                      <span class="text-white font-bold">
                          {data.transaction.giver?.codename?.charAt(0).toUpperCase() || 'G'}
                      </span>
                  </div>
                  <div>
                      <div class="font-bold text-gray-900">
                          {data.transaction.giver?.codename || data.transaction.giver?.username || 'Unknown'}
                      </div>
                      <div class="text-sm text-gray-600">
                          {getUserRole() === 'giver' ? 'You' : 'Provided goods/services'}
                      </div>
                  </div>
              </div>
          </div>

          <!-- Getter Card -->
          <div class="space-y-3 p-5 bg-teal-50 rounded-2xl border-l-4 border-teal-400">
              <div class="flex items-center text-gray-600">
                  <HandCoins class="w-5 h-5 mr-2 text-teal-600" />
                  <span class="font-semibold">Getter</span>
              </div>
              <div class="flex items-center">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center mr-3">
                      <span class="text-white font-bold">
                          {data.transaction.getter?.codename?.charAt(0).toUpperCase() || 'R'}
                      </span>
                  </div>
                  <div>
                      <div class="font-bold text-gray-900">
                          {data.transaction.getter?.codename || data.transaction.getter?.username || 'Unknown'}
                      </div>
                      <div class="text-sm text-gray-600">
                          {getUserRole() === 'getter' ? 'You' : 'Received goods/services'}
                      </div>
                  </div>
              </div>
          </div>

            
            <!-- Left Column: Participants -->
            <div class="space-y-6">
              
                <!-- Photo Section -->
                {#if data.transaction.photo}
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-3">Photo</h3>
                        <div class="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3] bg-gray-100">
                            <img 
                                src={data.transaction.photo} 
                                alt={data.transaction.name} 
                                class="w-full h-full object-cover transition-opacity duration-300"
                            />
                        </div>
                    </div>
                {/if}
            </div>
            
            <!-- Right Column: Details & Notes -->
            <div class="space-y-6">
                <!-- Transaction Details Card -->
                <div class="space-y-3 p-5 bg-gray-50 rounded-2xl border-l-4 border-gray-400">
                  <div class="flex items-center text-gray-600">
                      <FileText class="w-5 h-5 mr-2 text-sky-600" />
                      <span class="font-semibold">Transaction Details</span>
                  </div>
                  <div class="grid grid-cols-1 gap-3">
                      <div>
                          <div class="text-sm text-gray-500">Category</div>
                          <div class="font-bold text-gray-900">{data.transaction.category}</div>
                      </div>
                      <div>
                          <div class="text-sm text-gray-500">Type</div>
                          <div class="font-bold text-gray-900 capitalize">{data.transaction.kind}</div>
                      </div>
                      <div>
                          <div class="text-sm text-gray-500">Status</div>
                          <div class="font-bold text-gray-900 capitalize">{data.transaction.status}</div>
                      </div>
                    <div>
                        <div class="text-sm text-gray-500">Created</div>
                        <div class="font-bold text-gray-900">{formatDate(data.transaction.dateCreated)}</div>
                    </div>
                  </div>
                </div>
                
                <!-- Notes Section -->
                {#if data.transaction.notes}
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                            <FileText class="w-5 h-5 mr-2 text-gray-600" />
                            Notes
                        </h3>
                        <div class="p-5 bg-gray-50 rounded-2xl border-t border-gray-100">
                            <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {data.transaction.notes}
                            </p>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        
        <!-- Action Buttons -->
        {#if data.transaction.status === 'pending'}
            <div class="mt-10 pt-6 border-t border-gray-200">
                <div class="flex gap-4">
                    <button class="flex-1 bg-red-600 text-white py-3 rounded-2xl font-bold hover:bg-red-700 transition duration-200 active:scale-[.99] transform flex items-center justify-center gap-2">
                        <XCircle class="w-5 h-5" />
                        Cancel Transaction
                    </button>
                </div>
            </div>
        {/if}
        
    </div>
</div>


