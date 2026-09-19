<script lang="ts">
    import { prettyDateString } from "$lib/utils/date";
    import { MediaURL } from "$lib/config/strapi";
    import { ExternalLinkIcon } from "@lucide/svelte";

    let { data } = $props();

    let blogPost = $derived(data?.blogPost?.data[0] ?? undefined);
    let error = $derived(data.error);

    let title = $derived(blogPost?.title ?? "Unknown");
    let uploadDate = $derived(prettyDateString(blogPost.publishedAt));
    let keywords = $derived(() => {
        const tags = blogPost?.tags ?? [];
        if (tags.length > 0) {
            return tags.map(({ name }: { name: string }) => name).join(", ");
        }
        return "Blog post";
    });

</script>

{#if error || !blogPost}
    <p>Error: {error}</p>
{:else}

    <div class="hero">

        <img
            class="hero-image"
            src="{ MediaURL }{ blogPost.featured_image.url }"
            alt="{ blogPost.featured_image.alternativeText ?? blogPost.title ?? 'Unknown' }"
        />

        <section class="hero-section">
            <div class="blog-content-wrapper">
                <h1 class="hero-title">{ title }</h1>
                <p>{ uploadDate }</p>
            </div>
        </section>

    </div>

    <div class="blog-content">

        <section class="blog-content-wrapper">

            {#each blogPost.content as block}
                {#if block.type === "heading"}
                    {#each block.children as child}
                        {#if block.level === 1}
                            <h1>{ child.text }</h1>
                        {:else if block.level === 2}
                            <h2>{ child.text }</h2>
                        {:else if block.level === 3}
                            <h3>{ child.text }</h3>
                        {:else if block.level === 4}
                            <h4>{ child.text }</h4>
                        {:else if block.level === 5}
                            <h5>{ child.text }</h5>
                        {:else if block.level === 6}
                            <h6>{ child.text }</h6>
                        {/if}
                    {/each}
                {:else if block.type === "code"}
                    <div class="code-block">
                        <pre class="code-block--content" data-code-language="{ block.language ?? "unknown" }">{#each block.children as code }{#each code.text.split('\n') as line}<div class="code-block-line">{ line }</div>{/each}{/each}</pre>
                        {#if block.language}
                            <div class="code-block--footer">
                                { block.language }
                            </div>
                        {/if}
                    </div>
                {:else if block.type === "image"}
                    <figure class="figure">
                        <img class="image"
                             src="{ block.image.url }"
                             alt="{ block.alternativeText ?? "" }"
                        />
                        {#if block.image.caption }
                            <figcaption class="figcaption">
                                { block.image.caption }
                            </figcaption>
                        {/if}
                    </figure>
                {:else if block.type === "paragraph"}
                    <p>
                    {#each block.children as child}
                        {#if child.type === "link"}
                            <a href="{ child.url }">
                                {#each child.children as link}
                                    <span
                                        class="{link.bold ? "bold" : ""} {link.strikethrough ? "strikethrough" : ""} {link.underline ? "underline" : ""} {link.italic ? "italic" : ""}"
                                    >
                                        { link.text }
                                    </span>
                                {/each}
                                <ExternalLinkIcon size="16" />
                            </a>
                        {:else if child.code}
                            <code
                                class="code {child.bold ? "bold" : ""} {child.strikethrough ? "strikethrough" : ""} {child.underline ? "underline" : ""} {child.italic ? "italic" : ""}"
                            >
                                { child.text }
                            </code>
                        {:else}
                             <span
                                 class="{child.bold ? "bold" : ""} {child.strikethrough ? "strikethrough" : ""} {child.underline ? "underline" : ""} {child.italic ? "italic" : ""}"
                             >
                                { child.text }
                            </span>
                        {/if}
                    {/each}
                    </p>
                {:else if block.type === "list"}
                    {#if block.format === "unordered"}
                        <ul class="list">
                            {#each block.children as child}
                                {#if child.type === "list-item"}
                                    {#each child.children as item}
                                        <li class="list-item">{ item.text }</li>
                                    {/each}
                                {/if}
                            {/each}
                        </ul>
                    {:else if block.format === "ordered"}
                        <ol class="list">
                            {#each block.children as child}
                                {#if child.type === "list-item"}
                                    {#each child.children as item}
                                        <li class="list-item">{ item.text }</li>
                                    {/each}
                                {/if}
                            {/each}
                        </ol>
                    {/if}
                {/if}
            {/each}

        </section>

    </div>

{/if}

<svelte:head>
    <title>{ title } {uploadDate} - Philip Rosenqvist</title>
    <meta
        name="description"
        content="My name is Philip Rosenqvist and I'm a software developer. This is a blog post written {uploadDate} with the title: {title}."
    >
    <meta name="keywords" content={ keywords() }>
    <meta name="author" content="Philip Rosenqvist">
    <meta name="date" content={ uploadDate }>
</svelte:head>

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

    .blog-content .blog-content-wrapper > * {
        margin: 0;
    }

    .blog-content .blog-content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
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

    .bold {
        font-weight: 900;
    }

    .strikethrough {
        text-decoration: line-through !important;
    }

    .italic {
        font-style: italic;
    }

    .underline {
        text-decoration: underline;
    }

    .list-item {
        margin-block: .5rem;
    }

    .figure {
        margin: 0;
        width: 100%;
        background-color: #0d0d0d;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .image {
        display: block;
        max-width: 100%;
    }

    .code-block {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .code-block--content {
        background-color: #0d0d0d;
        padding: .5rem 1rem;
        border-radius: .0625rem;
        font-size: .875rem;
        color: #EAE0D9;
        margin: 0;
    }

    .code-block--footer {
        background-color: #151515;
        padding: .5rem;
        color: #bab6b5;
        font-size: 1rem;
        text-transform: capitalize;
    }

    .code-block-line {
        margin-block: .5rem;
    }

    .code {
        background-color: #151515;
        padding-inline: .5rem;
        font-family: "Consolas", monospace;
        border-radius: .0625rem;
        color: #bab6b5;
        font-size: .875rem;
    }

    .figcaption {
        display: block;
        background-color: #151515;
        padding: .5rem;
        font-size: .875rem;
        color: #bab6b5;
        line-height: 1.5;
        width: 100%;
    }

    @media only screen and (min-width: 768px) {
        .hero-title {
            font-size: 4rem;
        }
    }

</style>