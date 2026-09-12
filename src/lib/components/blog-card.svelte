<script lang="ts">

    import {prettyDateString} from "$lib/utils/date";

    let { blogPost } = $props();



</script>

<article class="blog-card">
    <a class="blog-ard--anchor" href="/blog/{ blogPost.slug }" title="Read { blogPost.title }"></a>
    <img class="blog-card--image"
         src="http://192.168.50.161:1337{ blogPost.featured_image.url }"
         alt="{ blogPost.featured_image.alternativeText || blogPost.title }"
    />
    <div class="blog-card--content">
        <div class="blog-card--content--top">
            <ul class="blog-card--content--top--tags">
                {#if blogPost.tags.length > 0}
                    {#each blogPost.tags as tag}
                        <li class="blog-card--content--top--tags--tag">{ tag.name }</li>
                    {/each}
                {:else}
                    <li class="blog-card--content--top--tags--tag">Blog</li>
                {/if}

            </ul>
            <p class="blog-card--content--top--date">{ prettyDateString(blogPost.publishedAt) }</p>
        </div>
        <h3 class="blog-card--content--title">{ blogPost.title }</h3>
    </div>
</article>

<style>

    .blog-card {
        position: relative;
        flex: 1;
        border-radius: .0625rem;
        overflow: hidden;
        background-color: #151515;
        padding-bottom: 1rem;
        min-width: 16rem;
    }

    .blog-card:hover {
        outline-offset: 0.5rem;
        outline: #981213 solid 0.125rem;
    }

    .blog-ard--anchor {
        position: absolute;
        display: block;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .blog-card--image {
        max-width: 100%;
        width: 100%;
        aspect-ratio: 4 / 3;
        object-position: center center;
        object-fit: cover;
        display: block;
    }

    .blog-card--content {
        padding: 1rem;
    }

    .blog-card--content--title {
        font-size: 1.5rem;
        margin: 0;
    }

    .blog-card--content--top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .blog-card--content--top--date {
        font-size: 1rem;
        margin: 0;
    }

    .blog-card--content--top--tags {
        display: flex;
        gap: 0.5rem;
        list-style: none;
        padding: 0;
        min-width: 0;
        overflow-x: clip;
        margin-right: .5rem;
    }

    .blog-card--content--top--tags--tag {
        font-size: .875rem;
        font-weight: 900;
        border: .125rem solid #981213;
        padding: .25rem 1rem;
        color: #EA0708;
        text-transform: uppercase;
        border-radius: .0625rem;
        white-space: nowrap;
        flex-shrink: 0;
    }

</style>