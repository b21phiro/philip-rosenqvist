<script lang="ts">
    import { prettyDateString } from "$lib/utils/date";
    let { data } = $props();

    let blogPost = $derived(data?.blogPost?.data[0] ?? undefined);
    let error = $derived(data.error);

</script>

{#if error || !blogPost}
    <p>Error: {error}</p>
{:else}

    <div class="hero">

        <img
            class="hero-image"
            src="http://192.168.50.161:1337{blogPost.featured_image.url}"
            alt="{ blogPost.featured_image.alternativeText ?? blogPost.title ?? 'Unknown' }"
        />

        <section class="hero-section">
            <div class="blog-content-wrapper">
                <h1 class="hero-title">{ blogPost.title }</h1>
                <p>{ prettyDateString(blogPost.publishedAt) }</p>
            </div>
        </section>

    </div>

    <div class="blog-content">

        <section class="blog-content-wrapper">

            {#each blogPost.content as content}
                <div class="blog-content-block">
                    {#if content.type === "paragraph"}
                        {#each content.children as block}
                            <p>{ block.text }</p>
                        {/each}
                    {/if}
                </div>
            {/each}

        </section>

    </div>

{/if}

<style>

    .blog-content {
        background-color: #070000;
        padding-inline: 1rem;
    }

    .blog-content-wrapper {
        max-width: 48rem;
        margin-inline: auto;
        width: 100%;
    }

    .blog-content .blog-content-wrapper {
        display: flex;
        flex-direction: column;
    }

    .hero {
        position: relative;
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .hero-section::after {
        position: absolute;
        content: "";
        background: url("/images/splatter-2.png") repeat-x;
        background-size: contain;
        height: 18rem;
        left: 0;
        top: -18rem;
        z-index: 10;
        width: 100%;
    }

    .hero-image {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-position: center center;
        object-fit: cover;
    }

    .hero-section {
        z-index: 1;
        position: absolute;
        bottom: 0;
        padding: 2rem 1rem;
        width: 100vw;
        background-size: contain;
        background-color: #070000;
    }

    .hero-title {
        font-size: 2rem;
        font-weight: 900;
        margin: 0;
    }

    @media only screen and (min-width: 768px) {
        .hero-title {
            font-size: 4rem;
        }
    }

</style>