<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { Users, Package, Briefcase, Heart, MessageSquare, Download, LogOut } from 'lucide-svelte';
  
  let { data, form } = $props();
  
  let activeTab = $state(data.currentTab || 'users');
  let password = $state('');
  let exportingType = $state<string | null>(null);
  
  function changeTab(tab: string) {
    activeTab = tab;
    goto(`/admin?tab=${tab}&page=1`);
  }
  
  function downloadCSV(csvContent: string, filename: string) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
</script>


{#if !data.authenticated}
  <!-- Login Screen -->
  <div class="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 dark:from-black dark:to-teal-950 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 w-full max-w-md border-t-4 border-sky-500">
      <h1 class="text-3xl font-black text-gray-900 dark:text-white mb-2">Admin Access</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Enter password to continue</p>
      
      <form method="POST" action="?/login" use:enhance>
        <div class="mb-4">
          <input
            type="password"
            name="password"
            bind:value={password}
            placeholder="Password"
            class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sky-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
        </div>
        
        {#if form?.message}
          <div class="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {form.message}
          </div>
        {/if}
        
        <button
          type="submit"
          class="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
{:else}
  <!-- Admin Dashboard -->
  <div class="min-h-screen bg-gradient-to-br from-sky-50 to-teal-50 dark:from-black dark:to-teal-950 p-4 sm:p-8">
    <div class="mx-auto max-w-7xl">
      
      <div class="mb-10 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
            Admin Dashboard
          </h1>
          <p class="text-sm font-bold text-gray-500 dark:text-gray-400 opacity-70">
            Manage all platform data
          </p>
        </div>
        
        <form method="POST" action="?/logout" use:enhance>
          <button
            type="submit"
            class="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition font-semibold"
          >
            <LogOut class="w-4 h-4" />
            Logout
          </button>
        </form>
      </div>

      <div class="overflow-hidden rounded-3xl border-t-4 border-sky-500 dark:border-sky-600 bg-white dark:bg-gray-900 shadow-2xl">
        <!-- Tabs -->
        <div class="flex border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 overflow-x-auto">
          {#each [
            { id: 'users', label: 'Users', icon: Users },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'services', label: 'Services', icon: Briefcase },
            { id: 'wishes', label: 'Wishes', icon: Heart },
            { id: 'requests', label: 'Requests', icon: MessageSquare }
          ] as tab}
            <button 
              onclick={() => changeTab(tab.id)}
              class="flex-1 px-6 py-5 text-center font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs whitespace-nowrap
              {activeTab === tab.id 
                ? 'bg-white dark:bg-gray-900 text-sky-600 dark:text-sky-400 border-b-4 border-sky-600 dark:border-sky-400' 
                : 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}"
            >
              <tab.icon class="w-4 h-4" />
              {tab.label}
            </button>
          {/each}
        </div>

        <div class="p-6 lg:p-10">
          <!-- Export Button -->
          <div class="mb-6 flex justify-end">
            <form 
              method="POST" 
              action="?/exportCSV"
              use:enhance={() => {
                exportingType = activeTab;
                return async ({ result, update }) => {
                  if (result.type === 'success' && result.data?.csv) {
                    downloadCSV(result.data.csv, result.data.filename);
                  }
                  exportingType = null;
                  await update();
                };
              }}
            >
              <input type="hidden" name="type" value={activeTab} />
              <button
                type="submit"
                disabled={exportingType === activeTab}
                class="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 transition font-semibold disabled:opacity-50"
              >
                <Download class="w-4 h-4" />
                {exportingType === activeTab ? 'Exporting...' : 'Export CSV'}
              </button>
            </form>
          </div>

          <!-- Users Tab -->
          {#if activeTab === 'users' && data.data?.users}
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">ID</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Username</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Codename</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Email</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">City</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                  {#each data.data.users as user}
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono">{user.id.substring(0, 8)}...</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{user.username}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.codename}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.email || '-'}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.city || '-'}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{new Date(user.dateCreated).toLocaleDateString()}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>

          <!-- Products Tab -->
          {:else if activeTab === 'products' && data.data?.products}
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">ID</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Name</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Points</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Category</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                  {#each data.data.products as product}
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono">{product.id}</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{product.name}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{product.points}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">{product.category}</td>
                      <td class="px-4 py-3 text-sm">
                        <span class="px-2 py-1 rounded-full text-xs font-semibold {product.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}">
                          {product.status}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{new Date(product.dateCreated).toLocaleDateString()}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>

          <!-- Services Tab -->
          {:else if activeTab === 'services' && data.data?.services}
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">ID</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Name</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Points</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Category</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                  {#each data.data.services as service}
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono">{service.id}</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{service.name}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{service.points}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">{service.category}</td>
                      <td class="px-4 py-3 text-sm">
                        <span class="px-2 py-1 rounded-full text-xs font-semibold {service.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}">
                          {service.status}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{new Date(service.dateCreated).toLocaleDateString()}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>

          <!-- Wishes Tab -->
          {:else if activeTab === 'wishes' && data.data?.wishes}
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">ID</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Name</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Points</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Category</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                  {#each data.data.wishes as wish}
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono">{wish.id}</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{wish.name}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{wish.points}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">{wish.category}</td>
                      <td class="px-4 py-3 text-sm">
                        <span class="px-2 py-1 rounded-full text-xs font-semibold {wish.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}">
                          {wish.status}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{new Date(wish.dateCreated).toLocaleDateString()}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>

          <!-- Requests Tab -->
          {:else if activeTab === 'requests' && data.data?.requests}
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">ID</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Name</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Points</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Category</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                  {#each data.data.requests as request}
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono">{request.id}</td>
                      <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{request.name}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{request.points}</td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">{request.category}</td>
                      <td class="px-4 py-3 text-sm">
                        <span class="px-2 py-1 rounded-full text-xs font-semibold {request.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}">
                          {request.status}
                        </span>
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{new Date(request.dateCreated).toLocaleDateString()}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}

          <!-- Pagination -->
          <div class="mt-6 flex justify-between items-center">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Page {data.currentPage}
            </div>
            <div class="flex gap-2">
              {#if data.currentPage > 1}
                <a 
                  href="/admin?tab={activeTab}&page={data.currentPage - 1}"
                  class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold"
                >
                  Previous
                </a>
              {/if}
              <a 
                href="/admin?tab={activeTab}&page={data.currentPage + 1}"
                class="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-semibold"
              >
                Next
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

