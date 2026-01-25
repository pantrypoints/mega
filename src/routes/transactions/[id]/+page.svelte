<script lang="ts">
  import type { PageData } from './$types';
  import { ArrowLeft, Calendar, DollarSign, Tag, FileText, CheckCircle, XCircle, Clock, Users, Package, ArrowUpRight, ArrowDownRight } from 'lucide-svelte';
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



<div class="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 p-4 sm:p-6">
  <div class="max-w-4xl mx-auto">
    <!-- Back Button -->
    <a
      href="/transactions"
      class="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium mb-6"
    >
      <ArrowLeft class="w-5 h-5 mr-2" />
      Back to Transactions
    </a>
    
    <!-- Main Card -->
    <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-teal-500 to-sky-500 p-8 text-white">
        <div class="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">{data.transaction.name}</h1>
            <div class="flex items-center space-x-4">
              <span class="bg-white/20 px-3 py-1 rounded-full text-sm">
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
          <div class="mt-4 md:mt-0 text-right">
            <div class="text-4xl font-bold">{data.transaction.points.toFixed(2)}</div>
            <div class="text-teal-100">Points</div>
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="p-8">
        <!-- Participants -->
        <div class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Users class="w-5 h-5 mr-2 text-teal-600" />
            Participants
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Giver -->
            <div class="bg-gray-50 rounded-2xl p-6">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <span class="text-white text-xl font-bold">
                    {data.transaction.giver?.codename?.charAt(0).toUpperCase() || 'G'}
                  </span>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Giver</div>
                  <div class="text-lg font-bold text-gray-900">
                    {data.transaction.giver?.codename || data.transaction.giver?.username || 'Unknown'}
                  </div>
                  <div class="text-sm text-gray-600">
                    {getUserRole() === 'giver' ? 'You' : 'Provided goods/services'}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Getter -->
            <div class="bg-gray-50 rounded-2xl p-6">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <span class="text-white text-xl font-bold">
                    {data.transaction.getter?.codename?.charAt(0).toUpperCase() || 'R'}
                  </span>
                </div>
                <div>
                  <div class="text-sm text-gray-500">Getter</div>
                  <div class="text-lg font-bold text-gray-900">
                    {data.transaction.getter?.codename || data.transaction.getter?.username || 'Unknown'}
                  </div>
                  <div class="text-sm text-gray-600">
                    {getUserRole() === 'getter' ? 'You' : 'Received goods/services'}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        <!-- Transaction Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Details Card -->
          <div class="bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText class="w-5 h-5 mr-2 text-teal-600" />
              Transaction Details
            </h2>
            <div class="space-y-4">
              <div>
                <div class="text-sm text-gray-500">Category</div>
                <div class="font-bold text-gray-900">{data.transaction.category}</div>
              </div>
              <div>
                <div class="text-sm text-gray-500">Type</div>
                <div class="font-bold text-gray-900 capitalize">{data.transaction.kind}</div>
              </div>
            </div>
          </div>
          

          <div class="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock class="w-5 h-5 mr-2 text-gray-600" />
              Timeline
            </h2>
            <div class="space-y-4">
              <div>
                <div class="text-sm text-gray-500">Created</div>
                <div class="font-bold text-gray-900">{formatDate(data.transaction.dateCreated)}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Photo and Notes -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Photo -->
          {#if data.transaction.photo}
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-3">Photo</h3>
              <img
                src={data.transaction.photo}
                alt={data.transaction.name}
                class="w-full h-64 object-cover rounded-2xl shadow"
              />
            </div>
          {/if}
          
          <!-- Notes -->
          {#if data.transaction.notes}
            <div class={data.transaction.photo ? '' : 'md:col-span-2'}>
              <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <FileText class="w-5 h-5 mr-2 text-gray-600" />
                Notes
              </h3>
              <div class="bg-gray-50 p-6 rounded-2xl">
                <p class="text-gray-700 whitespace-pre-wrap">{data.transaction.notes}</p>
              </div>
            </div>
          {/if}
        </div>
        

        {#if data.transaction.status === 'pending'}
          <div class="mt-8 pt-8 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition">
                <XCircle class="w-5 h-5 inline mr-2" />
                Cancel Transaction
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

