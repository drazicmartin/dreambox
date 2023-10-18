<script lang="ts">
    import Card from "../lib/Card.svelte";
    import quest_img from "$lib/assets/quest.png"
    import spot_img from "$lib/assets/spot.png"
    import universe_img from "$lib/assets/universe.png"
    import character_img from "$lib/assets/character.png"

    import { slide, fly } from "svelte/transition";
	import type { SetOfCards } from "$lib/types";
	import { onMount } from "svelte";

    let showCards = false;
    let loading = false;
    let drawing = false;

    export let form;

    let cards: SetOfCards;
    $: cards = form?.cards!;

    const delay = 35;

    async function handleOnClick(){
        drawing = true;
    }

    function handleSubmit(){
        loading = true;
        showCards = false;
    }

    onMount(() => {
        showCards = form ? true : false ;
    })
</script>

<div class="flex flex-col items-center">
    {#if loading}
        <button transition:slide disabled type="button" class="py-2.5 px-5 mr-2 text-2xl m-4 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
            </svg>
            Writing...
        </button>
    {/if}
    {#if drawing}
        <button transition:slide disabled type="button" class="py-2.5 px-5 mr-2 text-2xl m-4 font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
            </svg>
            Draw Cards...
        </button>
    {/if}
    {#if !showCards && !loading && !drawing}
    <form action="?/draw_cards" method="POST" >
        <button on:click={handleOnClick} transition:slide type="submit" class="btn bg-gradient-to-br variant-gradient-tertiary-primary my-3">
            Draw Cards
        </button>
    </form>
    {/if}
    {#if showCards || loading}
        <div class="grid grid-flow-col grid-rows-2 lg:grid-rows-1 max-w-2xl gap-5 mt-3">
            <Card delay={delay*0} title={cards.character.title} description={cards.character.description} type={cards.character.type} image_url={`${form?.backend_url}${cards.character.image?.url ?? cards.character.image?.data.attributes.url}`} is_new={cards.character.is_new}/>
            <Card delay={delay*2} title={cards.spot.title} description={cards.spot.description} type={cards.spot.type} image_url={`${form?.backend_url}${cards.spot.image?.url ?? cards.spot.image?.data.attributes.url}`} is_new={cards.spot.is_new}/>
            <Card delay={delay*4} title={cards.universe.title} description={cards.universe.description} type={cards.universe.type} image_url={`${form?.backend_url}${cards.universe.image?.url ?? cards.universe.image?.data.attributes.url}`} is_new={cards.universe.is_new}/>
            <Card delay={delay*6} title={cards.quest.title} description={cards.quest.description} type={cards.quest.type} image_url={`${form?.backend_url}${cards.quest.image?.url ?? cards.quest.image?.data.attributes.url}`} is_new={cards.quest.is_new}/>
        </div>
    {/if}
    {#if showCards}
        <div class="flex flex-row gap-4">
            <button in:slide={{delay:delay*16}} out:fly on:click={() => showCards=false} type="button" class="btn my-5 grow">
                Back
            </button>
            <form action="?/generate_story" method="POST">
                <input type="hidden" name="character_title" value={cards.character.title}>
                <input type="hidden" name="character_description" value={cards.character.description}>
                <input type="hidden" name="character_id" value={cards.character.id}>
                
                <input type="hidden" name="spot_title" value={cards.spot.title}>
                <input type="hidden" name="spot_description" value={cards.spot.description}>
                <input type="hidden" name="spot_id" value={cards.spot.id}>
                
                <input type="hidden" name="universe_title" value={cards.universe.title}>
                <input type="hidden" name="universe_description" value={cards.universe.description}>
                <input type="hidden" name="universe_id" value={cards.universe.id}>

                <input type="hidden" name="quest_title" value={cards.quest.title}>
                <input type="hidden" name="quest_description" value={cards.quest.description}>
                <input type="hidden" name="quest_id" value={cards.quest.id}>

                <button out:fly in:slide={{delay:delay*16}} on:click={handleSubmit} type="submit" class="btn bg-gradient-to-br variant-gradient-tertiary-primary my-5 grow">
                    Tell me the story !
                </button>
            </form>
        </div>
    {/if}
</div>