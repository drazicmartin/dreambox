<script lang="ts">
    import { onMount } from 'svelte';

    export let data;

    $:text = data.attributes.text;
	$:image_url = data.attributes.image_url;

</script>

<div class="flex flex-col items-center">
	{#if image_url}
		<img class="h-auto w-auto rounded-lg shadow-xl dark:shadow-gray-800" src={image_url} alt="image representing to following story">
	{/if}
	<p class="text-lg m-10" align="justify">
			{@html text}
    </p>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

    p {
		font-size: 1.2rem;
		line-height: 150%;
		font-family: 'Special Elite', cursive;
	}
</style>