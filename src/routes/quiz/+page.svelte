<script lang="ts">
  import { QUESTIONS, OPTIONS } from '$lib/data/quiz';
  import { enhance } from '$app/forms';
  import { House, User, ArrowLeft, Loader2 } from 'lucide-svelte';
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { setLocale } from '$lib/paraglide/runtime';
  // import { m } from '$lib/paraglide/messages.js';
  import * as m from '$lib/paraglide/messages.js';
  
  let { data, form } = $props();


  const t = (key: string | undefined): string => {
      if (!key) return '';
      
      // Paraglide messages are exports on the 'm' module
      const messageFunction = (m as any)[key];
      
      if (typeof messageFunction === 'function') {
          return messageFunction();
      }
      
      // Debugging hint: if it returns the key, the compiler hasn't seen it yet
      return key; 
  };


  // State
  let currentIndex = $state(0);
  let answers = $state<number[]>(new Array(QUESTIONS.length).fill(2)); // Default to 'Neutral'
  let isSubmitting = $state(false);
  let formElement: HTMLFormElement;
  
  const currentQuestion = $derived(QUESTIONS[currentIndex]);
  const progress = $derived(((currentIndex + 1) / QUESTIONS.length) * 100);
  const userId = data?.user?.id || 'me';
  const slug = data?.user?.slug;


  // ... rest of your functions remain the same
  function autoSubmitAction(node: HTMLButtonElement) {
    node.click();
    return {
      destroy() {
        // Any cleanup if needed
      }
    };
  }
  
  function handleAnswer(value: number) {
    answers[currentIndex] = value;
    if (currentIndex < QUESTIONS.length - 1) {
      currentIndex++;
    } else {
      isSubmitting = true;
      setTimeout(() => {
        if (formElement) {
          formElement.requestSubmit();
        }
      }, 500);
    }
  }
  
  function goBack() {
    if (currentIndex > 0) currentIndex--;
  }
  
  function handleFormEnhance() {
    return async ({ update }: any) => {
      isSubmitting = true;
      try {
        await update();
      } finally {
        isSubmitting = false;
      }
    };
  }
</script>

<div class="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4">
  <!-- Header -->
  <div class="w-full max-w-4xl mb-8 text-center">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
      {m.personality_quiz()}
    </h1>
  </div>
  
  <form method="POST" use:enhance={handleFormEnhance} bind:this={formElement} id="quiz-form" class="hidden">
    {#each QUESTIONS as q, i}
      <input type="hidden" name="q-{q.id}" value={answers[i]} />
    {/each}
  </form>
  
  <div class="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col relative">
    {#if isSubmitting && !form?.success}
      <div class="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-8 text-center" in:fade>
        <Loader2 class="w-12 h-12 text-teal-500 animate-spin mb-4" />
        <h2 class="text-2xl font-bold text-gray-800">{m.finalizing()}...</h2>
        <p class="text-gray-500 text-sm">{m.averaging()}</p>
      </div>
    {/if}
    
    {#if !form?.success}
      <!-- Progress bar -->
      <div class="w-full h-2 bg-gray-100">
        <div class="h-full bg-teal-500 transition-all duration-500" style="width: {progress}%"></div>
      </div>
      
      <!-- Quiz content -->
      <div class="p-8 flex-grow flex flex-col justify-center">
        <!-- Navigation -->
        <div class="flex justify-between items-center mb-8">
          <button onclick={goBack} disabled={currentIndex === 0} 
            class="text-gray-400 hover:text-teal-600 disabled:opacity-0 transition-all p-2 rounded-lg hover:bg-gray-50" type="button">
            <ArrowLeft class="w-5 h-5" />
          </button>
          <span class="text-sm font-black text-teal-600 tracking-widest uppercase">
            {m.question()} {currentIndex + 1} / {QUESTIONS.length}
          </span>
          <div class="w-6"></div>
        </div>
        

        <!-- Question with transition -->
        {#key currentIndex}
          <div in:fly={{ x: 20, duration: 300 }} class="text-center">

            <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight mb-10">
              {t(currentQuestion.textKey)}
            </h2>

            <!-- Answer options -->
            <div class="space-y-3">
              {#each OPTIONS as opt}
                <button type="button" onclick={() => handleAnswer(opt.value)}
                  class="w-full py-4 px-6 rounded-2xl border-2 border-gray-100 text-lg font-semibold text-gray-700 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700 transition-all active:scale-[0.98]">
                  {t(opt.labelKey)}
                </button>
              {/each}
            </div>
          </div>
        {/key}
      </div>
      
      <button form="quiz-form" type="submit" id="auto-submit" class="hidden">
        {m.submit()}
      </button>
      
    {:else}
      <!-- Success screen -->
      <div class="p-10 text-center flex flex-col items-center" in:fade>
        <div class="bg-teal-100 text-teal-700 p-3 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 class="text-3xl font-black text-gray-900 mb-2">
          {m.completed()}
        </h2>
        <p class="text-gray-500 mb-6">
          {m.merged()}
        </p>
        <div class="p-10 text-center" in:fade>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onclick={() => goto(`/users/${slug}`)}
              class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center w-full sm:w-auto sm:min-w-[180px]">
              <div class="p-2 mb-1">
                <User class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
              </div>
              <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                {m.view_updated_profile()}
              </div>
            </button>
            <button onclick={() => goto(`/`)}
              class="bg-sky-50 border border-sky-200 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 text-center min-h-24 flex flex-col justify-center items-center w-full sm:w-auto sm:min-w-[180px]">
              <div class="p-2 mb-1">
                <House class="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
              </div>
              <div class="text-gray-800 font-semibold text-xs sm:text-sm whitespace-nowrap">
                {m.back_to_home()}
              </div>
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>