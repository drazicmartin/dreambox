<script lang="ts">
	import Card from '$lib/Card.svelte';

    export let data;

    import IoMdBook from 'svelte-icons/io/IoMdBook.svelte'
	import { each } from 'svelte/internal';

    const typeOrder = [
        "Universe",
        "Spot",
        "Quest",
        "Character"
    ]

    $: stories = data.stories;
</script>
 
<div class="flex justify-center">
    <nav class="grow list-nav max-w-2xl">
        <ol class="flex flex-col-reverse">
            {#each stories as story (story.id)}
                <li>
                    <a href="/story/{story.id}">
                        <div class="w-10"><IoMdBook /></div>
                        <div>Story {story.id}</div>
                        <div class="grow">
                            {#if story.attributes.info}
                                {#each Object.keys(story.attributes.info) as type, index }
                                    <div class="flex flex-col justify-between items-center card card-hover" >
                                        <header class="text-xs text-amber-900">
                                            {story.attributes.info[type].title}
                                        </header>
                                        <footer class="text-xs text-slate-600 place-items-end">{typeOrder[index]}</footer>
                                    </div>
                                {/each}
                            {/if}
                        </div>
                    </a>
                </li>
            {/each}
        </ol>
    </nav>
</div>

<style>
    .truncate {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>