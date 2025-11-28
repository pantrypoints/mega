<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Chart, registerables, type Chart as ChartJsInstance } from 'chart.js'; // Import Chart.js directly
    import type { PageData } from './$types';

    // Register Chart.js components
    Chart.register(...registerables);

    export let data: PageData;

    let canvasRef: HTMLCanvasElement;
    let chartInstance: ChartJsInstance | null = null; // Store the Chart instance

    // --- Prepare Chart Data ---
    const regLabels = data.userRegistrations.map(r => r.monthYear);
    const regCounts = data.userRegistrations.map(r => r.count);

    const lineChartData = {
        labels: regLabels,
        datasets: [
            {
                label: 'New User Registrations',
                data: regCounts,
                borderColor: 'rgb(20, 184, 166)', // Teal-500 equivalent
                backgroundColor: 'rgba(20, 184, 166, 0.2)',
                tension: 0.4, // Smoother line
                fill: true,
                pointBackgroundColor: 'rgb(20, 184, 166)',
            },
        ],
    };

    // --- Chart Options ---
    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'User Registrations Per Month',
                font: {
                    size: 16
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Users'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month/Year'
                }
            }
        }
    };

    // Initialize the chart once the component is mounted to the DOM
    onMount(() => {
        if (canvasRef) {
            chartInstance = new Chart(canvasRef, {
                type: 'line', // Specify the chart type
                data: lineChartData,
                options: lineChartOptions,
            });
        }
    });

    // Clean up the chart instance when the component is destroyed (good practice)
    onDestroy(() => {
        chartInstance?.destroy();
    });
</script>

<!-- The main container uses the style you provided, adapted for a stats page -->
<div class="min-h-screen bg-sky-50 flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 transform transition duration-500 hover:shadow-xl">
        <h1 class="text-3xl font-extrabold text-gray-800 text-center mb-1">
            📊 Public Platform Statistics
        </h1>
        <p class="text-center text-gray-500 mb-8">
            Access to this page is public. Data is updated in real-time.
        </p>

        {#if data.error}
            <p class="text-sm bg-red-100 text-red-600 p-4 rounded-lg border border-red-300 mb-6 font-medium">
                {data.error}
            </p>
        {:else if data.userRegistrations.length === 0}
            <p class="text-lg text-gray-600 p-8 rounded-xl border border-gray-200 text-center">
                No user registration data available to display yet.
            </p>
        {:else}
            <!-- Registration Trend Chart -->
            <div class="space-y-6 mt-8">
                <h2 class="text-2xl font-bold text-teal-700">Monthly User Registrations</h2>
                <div class="h-80 w-full">
                    <!-- Replaced the incompatible <Line /> component with a native <canvas> -->
                    <canvas bind:this={canvasRef}></canvas>
                </div>
            </div>
            
        {/if}
        
        <div class="mt-8 pt-4 border-t border-gray-100 text-sm text-gray-500 text-center">
            Data sourced from the platform's user records.
        </div>
    </div>
</div>