<script lang="ts">
    import BlogCard from '$lib/components/blog-card.svelte';
    import Pagination from '$lib/components/pagination.svelte';


    let { data } = $props();
    let blogPosts = $derived(data.blogPosts ?? []);
    let pagination = $derived(data.blogMeta.pagination ?? {});

</script>

<div class="site">

    <div class="site-wrapper">
        <h1 class="site-title">Blog</h1>
        <p>
            This is the place in which I post anything that is on my mind!
        </p>
    </div>

    <div class="site-wrapper">
        <div class="grid">
            {#each blogPosts as blogPost (blogPost.id)}
                <BlogCard blogPost={blogPost} />
            {/each}
        </div>
    </div>

    <div class="site-wrapper">
        <Pagination bind:pagination={pagination} />
    </div>

</div>

<style>

    .site {
        padding: 4rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .site-title {
        font-size: 3rem;
        margin-bottom: 0.5rem;
    }

    .grid {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
    }

    @media only screen and (min-width: 48rem) {

        .site {
            padding-top: 6rem;
            gap: 4rem;
        }

        .grid {
            gap: 4rem;
        }

    }

</style>