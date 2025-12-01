<script lang="ts">
    import { Circle, TrendingUp } from 'lucide-svelte';
    import { onMount } from 'svelte';

    // Mock data for 10 spokes (Performance Metrics, max value 100)
    const mockData = [
        { label: 'Focus', value: 85 },
        { label: 'Speed', value: 70 },
        { label: 'Quality', value: 95 },
        { label: 'Collaboration', value: 60 },
        { label: 'Adaptability', value: 80 },
        { label: 'Innovation', value: 75 },
        { label: 'Resourcefulness', value: 90 },
        { label: 'Communication', value: 65 },
        { label: 'Strategic Thinking', value: 50 },
        { label: 'Experience', value: 92 }
    ];

    // Chart dimensions and constants
    const spokes = mockData.length;
    const radius = 150; // Max radius for the chart
    const center = radius + 30; // Center position (used for SVG coordinates)
    const rings = 4; // Number of concentric rings
    const angleStep = (2 * Math.PI) / spokes;
    
    // Function to calculate Cartesian coordinates from a value and index
    function getCoordinate(index: number, value: number, max: number = 100) {
        const angle = angleStep * index - (Math.PI / 2); // Start at 12 o'clock (-90 degrees)
        const currentRadius = (value / max) * radius;
        const x = center + currentRadius * Math.cos(angle);
        const y = center + currentRadius * Math.sin(angle);
        return { x, y };
    }

    // Generate the path string for the main data polygon
    $: dataPolygonPath = mockData
        .map((d, i) => {
            const { x, y } = getCoordinate(i, d.value);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        })
        .join(' ');
        
    // Generate the path string for the grid rings
    let ringPaths: string[] = [];
    for (let r = 1; r <= rings; r++) {
        const ringRadius = (r / rings) * radius;
        const ringPath = mockData
            .map((_, i) => {
                const angle = angleStep * i - (Math.PI / 2);
                const x = center + ringRadius * Math.cos(angle);
                const y = center + ringRadius * Math.sin(angle);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');
        ringPaths = [...ringPaths, ringPath];
    }
    
    // Trigger CSS animation class on mount for visual effect
    let animated = false;
    onMount(() => {
        animated = true;
    });

</script>

<svelte:head>
    <title>Performance Stats - Radar</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-4 sm:p-8 flex flex-col items-center">
    <div class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border-t-4 border-teal-500 my-8">
        <header class="text-center mb-10">
            <h1 class="text-4xl font-extrabold text-teal-600 flex items-center justify-center gap-3">
                <TrendingUp class="w-8 h-8"/> Team Performance Radar
            </h1>
            <p class="text-lg text-gray-500 mt-2">Visualization across 10 core metrics (Max score: 100)</p>
        </header>

        <div class="flex justify-center">
            
            <!-- Chart Container -->
            <div class="flex-shrink-0">
                <svg width={center * 2} height={center * 2} viewBox={`0 0 ${center * 2} ${center * 2}`}>
                    
                    <!-- 1. Grid Rings (The "Web") -->
                    {#each ringPaths as path, i (i)}
                        <path 
                            d={path} 
                            fill="none" 
                            stroke={i === rings - 1 ? '#cbd5e1' : '#e2e8f0'} 
                            stroke-width="1"
                            class="transition-all duration-1000"
                        />
                    {/each}

                    <!-- 2. Spokes (Axis lines) -->
                    {#each Array(spokes) as _, i (i)}
                        {@const { x, y } = getCoordinate(i, 100)}
                        <line 
                            x1={center} 
                            y1={center} 
                            x2={x} 
                            y2={y} 
                            stroke="#e2e8f0" 
                            stroke-width="1"
                            class="transition-all duration-1000"
                        />
                    {/each}
                    
                    <!-- 3. Data Polygon (The filled area) -->
                    <path 
                        d={dataPolygonPath}
                        fill="#0d9488" 
                        fill-opacity="0.6"
                        stroke="#0f766e"
                        stroke-width="2"
                        class:animate-radar={animated}
                    />

                    <!-- 4. Data Points -->
                    {#each mockData as d, i (i)}
                        {@const { x, y } = getCoordinate(i, d.value)}
                        <circle 
                            cx={x} 
                            cy={y} 
                            r="4" 
                            fill="#f97316"
                            stroke="#fff"
                            stroke-width="1.5"
                            title="{d.label}: {d.value}"
                            class:animate-point={animated}
                        />
                    {/each}
                    
                    <!-- NEW: Data Point Labels (Scores) -->
                    {#each mockData as d, i (i)}
                        {@const { x, y } = getCoordinate(i, d.value)}
                        <text
                            x={x}
                            y={y}
                            text-anchor="middle"
                            dominant-baseline="middle"
                            fill="#111827"
                            font-size="14"
                            font-weight="bold"
                            style="text-shadow: 0 0 3px #fff, 0 0 3px #fff;"
                            class:animate-point={animated}
                            dy={y < center ? -10 : 15}
                        >
                            {d.value}
                        </text>
                    {/each}

                    <!-- 5. Labels -->
                    {#each mockData as d, i (i)}
                        {@const { x, y } = getCoordinate(i, 100)}
                        <text
                            x={x}
                            y={y}
                            text-anchor={x > center + 5 ? 'start' : (x < center - 5 ? 'end' : 'middle')}
                            dominant-baseline={y > center + 5 ? 'hanging' : (y < center - 5 ? 'auto' : 'central')}
                            fill="#374151"
                            font-size="12"
                            font-weight="600"
                            dx={x > center ? 5 : (x < center ? -5 : 0)}
                            dy={y > center ? 15 : (y < center ? -5 : 0)}
                        >
                            {d.label}
                        </text>
                    {/each}
                    
                </svg>
            </div>
            
            <!-- The Legend and Details section has been removed -->
            
        </div>
        
        <p class="text-sm text-gray-500 pt-8 border-t mt-8 text-center">
            The chart represents the current standing relative to the maximum possible score (100) for each metric. Hover over the orange data points to see the metric name.
        </p>


    </div>
</div>

<style>
    /* Keyframe for a simple animation to reveal the chart on load */
    @keyframes drawRadar {
        from {
            stroke-dasharray: 0 1000;
            fill-opacity: 0.1;
        }
        to {
            stroke-dasharray: 1000 0;
            fill-opacity: 0.6;
        }
    }

    /* Keyframe for points to fade in */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* Apply the animation to the data polygon path */
    .animate-radar {
        /* Set a large dash array value initially */
        stroke-dasharray: 1000; 
        stroke-dashoffset: 1000;
        animation: drawRadar 1.5s ease-out forwards;
        animation-delay: 0.5s;
    }
    
    /* Apply animation to the data points and scores */
    .animate-point {
        opacity: 0;
        animation: fadeIn 0.5s ease-in forwards;
        animation-delay: 2s; /* Start after the radar draw finishes */
    }

</style>