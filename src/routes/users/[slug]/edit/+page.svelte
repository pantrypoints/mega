<!-- gemini -->

<script lang="ts">
  import type { PageData } from './$types';
  import { 
    ArrowLeft, Pencil, User, Mail, Phone, MapPin, 
    Globe, Calendar, Hash, Lock, VenusAndMars, Save, ChevronDown 
  } from 'lucide-svelte';
  import { enhance } from '$app/forms';
  import { m } from '$lib/paraglide/messages.js';

  export let data: PageData;
  const { profile } = data;

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Australia", "Austria", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "India", "Indonesia", "Ireland", "Italy", "Japan", "Mexico", "Netherlands", "New Zealand", "Norway", "Philippines", "Portugal", "Singapore", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "United Kingdom", "United States", "Vietnam"
  ];
</script>



<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
  <div class="w-full max-w-3xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-sky-500">
    
    <a href="/users/{profile.slug}" class="inline-flex items-center text-sky-600 hover:text-sky-800 transition mb-6 font-medium">
      <ArrowLeft class="w-4 h-4 mr-1" /> 
      {m.back_to_profile?.() || 'Back to Profile'}
    </a>

    <h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1">
      {m.edit()} {profile.username}
    </h1>
    <p class="text-center text-gray-500 mb-8">Update your personal identification and contact info</p>

    <form method="POST" use:enhance class="space-y-8">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="codename">
            <Hash class="w-4 h-4" /> Codename <span class="text-red-500">*</span>
          </label>
          <input type="text" id="codename" name="codename" value={profile.codename} required 
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="pin">
            <Lock class="w-4 h-4" /> Security PIN <span class="text-red-500">*</span>
          </label>
          <input type="password" id="pin" name="pin" value={profile.pin} required 
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="avatar">
          <User class="w-4 h-4" /> Avatar URL
        </label>
        <input type="text" id="avatar" name="avatar" value={profile.avatar} 
          placeholder="https://example.com/photo.jpg"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="gender">
            <VenusAndMars class="w-4 h-4" /> Gender <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select id="gender" name="gender" required 
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition appearance-none bg-white">
              <option value="male" selected={profile.gender === 'male'}>Male</option>
              <option value="female" selected={profile.gender === 'female'}>Female</option>
              <option value="other" selected={profile.gender === 'other'}>Other</option>
            </select>
            <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="dob">
            <Calendar class="w-4 h-4" /> Date of Birth
          </label>
          <input type="date" id="dob" name="dateOfBirth" value={profile.dateOfBirth} 
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="email">
            <Mail class="w-4 h-4" /> Email Address
          </label>
          <input type="email" id="email" name="email" value={profile.email} 
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1" for="phone">
            <Phone class="w-4 h-4" /> Phone Number
          </label>
          <input type="tel" id="phone" name="phone" value={profile.phone} 
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>
      </div>

<div class="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <!-- Section Label spanning both columns -->
    <div class="sm:col-span-2 mb-2">
      <label class="block text-sm font-bold text-gray-700 flex items-center gap-1">
        <MapPin class="w-4 h-4" /> Location Details
      </label>
    </div>
    
    <!-- City Input -->
    <div>
      <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">City</label>
      <input 
        type="text" 
        name="city" 
        value={profile.city} 
        class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-white" 
      />
    </div>

    <!-- Country Input -->
    <div>
      <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Country</label>
      <div class="relative">
        <select 
          name="country" 
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition appearance-none bg-white"
        >
          <option value="">-- Select Country --</option>
          {#each countries as country}
            <option value={country} selected={profile.country === country}>
              {country}
            </option>
          {/each}
        </select>
        <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  </div>
</div>

      <button type="submit" 
        class="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-4 rounded-2xl shadow-lg hover:shadow-sky-200 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
        <Save class="w-5 h-5" />
        Update Profile
      </button>

    </form>
  </div>
</div>

