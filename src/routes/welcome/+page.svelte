<script lang="ts">
    import { m } from '$lib/paraglide/messages';
    import { Package, ShoppingBag, Megaphone, Sparkles, ArrowRight } from 'lucide-svelte';
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    const cards = [
        {
            id: 1,
            icon: Package,
            title: m.welcome_card1_title(),
            description: m.welcome_card1_desc(),
            link: '/products',
            color: 'from-teal-500 to-emerald-500',
            bgGradient: 'from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30',
            borderColor: 'border-teal-200 dark:border-teal-800',
            iconBg: 'bg-teal-100 dark:bg-teal-900/50',
            iconColor: 'text-teal-600 dark:text-teal-400'
        },
        {
            id: 2,
            icon: ShoppingBag,
            title: m.welcome_card2_title(),
            description: m.welcome_card2_desc(),
            link: '/requests',
            color: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
            borderColor: 'border-purple-200 dark:border-purple-800',
            iconBg: 'bg-purple-100 dark:bg-purple-900/50',
            iconColor: 'text-purple-600 dark:text-purple-400'
        },
        {
            id: 3,
            icon: Megaphone,
            title: m.welcome_card3_title(),
            description: m.welcome_card3_desc(),
            link: '/',
            color: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30',
            borderColor: 'border-blue-200 dark:border-blue-800',
            iconBg: 'bg-blue-100 dark:bg-blue-900/50',
            iconColor: 'text-blue-600 dark:text-blue-400'
        },
        {
            id: 4,
            icon: Sparkles,
            title: m.welcome_card4_title(),
            description: m.welcome_card4_desc(),
            link: '/quiz',
            color: 'from-amber-500 to-orange-500',
            bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30',
            borderColor: 'border-amber-200 dark:border-amber-800',
            iconBg: 'bg-amber-100 dark:bg-amber-900/50',
            iconColor: 'text-amber-600 dark:text-amber-400'
        }
    ];
</script>

<svelte:head>
    <title>{m.welcome_title()} | Pantrypoints</title>
    <meta name="description" content={m.welcome_meta_desc()} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    
    <!-- Hero Section -->
    <div class="text-center py-16 px-4">
        <div class="max-w-3xl mx-auto">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 text-sm font-medium mb-4">
                <Sparkles class="w-4 h-4" />
                {m.welcome_badge()}
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
                {m.welcome_title()}
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {m.welcome_subtitle()}
            </p>
        </div>
    </div>

    <!-- Cards Grid -->
    <div class="max-w-6xl mx-auto px-4 py-8 pb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {#each cards as card, i (card.id)}
                <a
                    href={card.link}
                    in:fly={{ y: 30, duration: 500, delay: i * 100, easing: quintOut }}
                    class="group relative block overflow-hidden rounded-3xl border-2 {card.borderColor} bg-gradient-to-br {card.bgGradient} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-700"
                >
                    <!-- Card Content -->
                    <div class="p-6 sm:p-8">
                        <!-- Icon -->
                        <div class="mb-6">
                            <div class="w-20 h-20 rounded-2xl {card.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <card.icon class="w-10 h-10 {card.iconColor}" />
                            </div>
                        </div>
                        
                        <!-- Title -->
                        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {card.title}
                        </h2>
                        
                        <!-- Description -->
                        <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            {card.description}
                        </p>
                        
                        <!-- Arrow Indicator -->
                        <div class="flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 group-hover:gap-3 transition-all">
                            <span>{m.learn_more()}</span>
                            <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                    
                    <!-- Decorative Gradient Overlay on Hover -->
                    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div class="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br {card.color} opacity-10 blur-3xl"></div>
                    </div>
                </a>
            {/each}
        </div>
        
        <!-- Optional: Get Started Button -->
        <div class="text-center mt-12">
            <!-- <a href="https://pantrypoints.com/docs/circle" 
                class="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105">
                {m.go_to_docs()}
                <ArrowRight class="w-4 h-4" />
            </a> -->
            <p class="text-gray-500 text-xl dark:text-gray-400 my-6">{m.welcome_footer_text()} ➔ </p>  
        </div>
    </div>
</div>


<!-- <style>
    /* Smooth page transition */
    :global(body) {
        @apply bg-gradient-to-br from-sky-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900;
    }
</style> -->