<script lang="ts">
    import { onMount } from 'svelte';

    export let data;

    $:text = data.attributes.text;
	$:image_url = data.attributes.image_url;

    function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}

    let display = false;
    onMount(() => {
        display = true;
    })
</script>

<div class="flex flex-col items-center">
	{#if image_url}
		<img class="max-w-5xl" src={image_url} alt="image representing to following story" />
	{/if}
	{#if display}
		<p in:typewriter|local={{speed:50}} class="text-lg m-10" align="justify">
			{@html text}
    </p>
	{/if}
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

    p {
		font-size: 1.2rem;
		line-height: 150%;
		font-family: 'Special Elite', cursive;
	}
</style>