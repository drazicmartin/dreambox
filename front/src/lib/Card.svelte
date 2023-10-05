<script lang="ts">
    import { blur, fly } from 'svelte/transition';

    export let title = "TITLE";
    export let image_url = "";
    export let description = "DESCRIPTION";
    export let type = "TYPE";
    export let delay = 0;
</script>

<a href="/" class="flex flex-col justify-between items-center card card-hover" in:blur={{
        delay: delay,
    }}
    out:fly
    >
    <img src={image_url} width="10" class="w-40 justify-center" alt="Post">
    <header class="card-header text-2xl text-amber-900">
        {title}
    </header>
    <section class="px-4 text-sm mt-2">{description}</section>
    <footer class="card-footer text-xs text-slate-600 place-items-end">{type}</footer>
</a>