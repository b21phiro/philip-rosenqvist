<script lang="ts">

    import { MoveRightIcon } from "@lucide/svelte";

    let { blogPost } = $props();

</script>

<article class="blog-post-card">
    <a class="blog-post-card--link" href="/blog/{blogPost.slug}" title="Read {blogPost.title}"></a>
    <h3 class="blog-post-card--title">{blogPost.title}</h3>
    <figure class="blog-post-card--figure">
        <img class="blog-post-card--figure--img"
             src="http://192.168.50.161:1337{blogPost.featured_image.url}"
             alt="{blogPost.featured_image.alternativeText || blogPost.title}" />
    </figure>
    <span class="blog-post-card--controller">Read <MoveRightIcon aria-hidden="true" /></span>
</article>

<style>

    .blog-post-card {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 18rem;
        flex: 1;
        max-width: 38rem;
    }

    .blog-post-card--title {
        font-size: 1.5rem;
        font-weight: normal;
        margin: 0;
    }

    .blog-post-card--link {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    .blog-post-card--link:hover ~ .blog-post-card--controller {
        text-decoration: underline;
    }

    .blog-post-card--figure {
        position: relative;
        aspect-ratio: 1;
        margin: 0;
        padding: 0;
    }

    .blog-post-card--figure--img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        display: block;
    }

    .blog-post-card--controller {
        font-size: 1rem;
        color: #D8CDCA;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-left: auto;
    }

</style>