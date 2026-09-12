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
        {#if pagination.pageCount > 1}
            <Pagination bind:pagination={pagination} />
        {/if}
    </div>

</div>

<style>

    .grid {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    @media only screen and (min-width: 48rem) {

        .site {
            padding-top: 6rem;
            gap: 4rem;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

    }

    @media only screen and (min-width: 64rem) {

        .grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 4rem;
        }

    }


</style>