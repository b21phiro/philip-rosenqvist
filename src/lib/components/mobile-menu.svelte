<script lang="js">
    import { page } from "$app/state";
    import { XIcon, MenuIcon, ArrowRightIcon } from '@lucide/svelte';

    let {
        isOpen = $bindable(false),
        routes = []
    } = $props();

    console.log("Routes: ", routes);
    console.log("Page URL pathname: ", page.url.pathname);

</script>

<button
    class="mobile-menu-button mobile-only"
    type="button"
    onclick={() => isOpen = !isOpen}
>
    Menu
    {#if isOpen}
        <XIcon aria-hidden="true" />
    {:else}
        <MenuIcon aria-hidden="true" />
    {/if}
</button>

{#if isOpen}
    <div class="mobile-menu">
        <div class="mobile-menu--content">
            <nav class="mobile-menu-nav">
                {#each routes as route (route.href)}
                    <a class="mobile-menu-nav--link"
                       href="{ route.href }"
                       aria-current="{ page.url.pathname === route.href }"
                       onclick={() => isOpen = false}
                    >
                        {route.text} <ArrowRightIcon aria-hidden="true" size="48" />
                    </a>
                {/each}
            </nav>
        </div>
    </div>
{/if}

<style>

    .mobile-menu {
        position: fixed;
        inset: 0;
        width: 100dvw;
        height: 100dvh;
        z-index: 3;
        background-color: #981213;
    }

    .mobile-menu--content {
        position: relative;
        padding: 4rem 1rem;
        z-index: 1;
    }

    .mobile-menu::before {
        position: absolute;
        content: "";
        background-size: cover;
        background: url("/images/smile-bitch.png") repeat;
        width: 100dvw;
        height: 100dvh;
        inset: 0;
    }

    .mobile-menu-button {
        border: 0;
        background: transparent;
        gap: .5rem;
        z-index: 4;
    }

    .mobile-menu-button {
        font-size: 1rem;
        display: inline-flex;
        min-height: 3rem;
        justify-content: center;
        align-items: center;
        font-weight: 900;
    }

    .mobile-menu-nav {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        border-radius: .0625rem;
        overflow: hidden;
    }

    .mobile-menu-nav--link {
        font-size: 3rem;
        text-decoration: none;
        font-weight: 900;
        border: .125rem solid #EAE0D9;
        padding: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
    }

    .mobile-menu-nav--link:not(:first-child) {
        margin-top: -.125rem;
    }

    .mobile-menu-nav--link[aria-current="true"] {
        background-color: #EAE0D9;
        color: #981213;
    }

</style>