<script lang="ts">

    import { page } from "$app/state";
    import ExternalInlineLink from "$lib/components/external-inline-link.svelte";

    let {
        routes
    }: {
        routes: { href: string, text: string }[],
    } = $props();

    const socials = [
        { text: "Instagram", href: import.meta.env.VITE_INSTAGRAM },
        { text: "LinkedIn", href: import.meta.env.VITE_LINKEDIN },
        { text: "GitHub", href: import.meta.env.VITE_GITHUB }
    ];

    const email = import.meta.env.VITE_CONTACT_EMAIL;
    const phone = `${import.meta.env.VITE_PHONE_COUNTRY_CODE} ${import.meta.env.VITE_PHONE_NUMBER}`;
    const address = `${import.meta.env.VITE_CITY}, ${import.meta.env.VITE_DISTRICT}`;

</script>

<footer class="footer">

    <div class="site-wrapper footer-wrapper">

        <div class="section-column">
            <h4 class="footer-section-title">Navigation</h4>
            <nav class="footer-nav">
                {#each routes as route (route.href)}
                    <a
                            href="{ route.href }"
                            aria-current={ page.url.pathname === route.href }
                    >
                        { route.text }
                    </a>
                {/each}
            </nav>
        </div>

        <div class="section-column">
            <h4 class="footer-section-title">Social</h4>
            <nav class="footer-nav">
                {#each socials as social (social.href)}
                    <ExternalInlineLink href={ social.href } text={ social.text } />
                {/each}
            </nav>
        </div>

        <div class="empty-column"></div>

        <div class="section-column">
            <h4 class="footer-section-title">Contact</h4>
            <address class="footer-contact">
                <p>{ address }</p>
                <a href="mailto:{ email }">{ email }</a>
                <a href="tel:{ phone }">{ phone }</a>
            </address>
        </div>

        <div class="section-column">
            <h4 class="footer-section-title">Acknowledgements</h4>
            <ul class="list-no-details">
                <li class="list-item">
                    Thanks <ExternalInlineLink href="https://angiefgray.com/" text="Angie Gray" />
                    for taking the photographs of me.
                </li>
                <li class="list-item">
                    Thanks the <ExternalInlineLink href="https://lucide.dev/" text="Lucide" />
                    team for creating amazing free SVG icons.
                </li>
            </ul>
        </div>

    </div>

</footer>

<style>

    .section-column {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .list-no-details {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .list-item:not(:first-child) {
        margin-block: .5rem;
    }

    .footer-section-title {
        font-size: 1.25rem;
        font-weight: 900;
        margin: 0;
    }

    .footer-contact p {
        margin: 0;
    }

    .footer {
        padding: 2rem 1rem;
    }

    .footer-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .footer-nav {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .footer-contact {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .footer-contact p,
    .footer-contact a {
        margin: 0;
        line-height: 1.5;
        font-size: 1rem;
        font-style: normal;
    }

    .empty-column {
        display: none;
    }

    @media only screen and (min-width: 40rem) {

        .footer {
            padding-bottom: 4rem;
        }

        .footer-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: 1fr 1fr;
        }

    }

    @media only screen and (min-width: 80rem) {

        .footer-wrapper {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-auto-rows: 1fr;
        }

        .empty-column {
            display: block;
        }

    }

</style>