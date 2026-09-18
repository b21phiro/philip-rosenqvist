<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/assets/css/base.css';
	import '$lib/assets/css/layout/site.css';
	import '$lib/assets/css/states.css';
	import MobileMenu from '$lib/components/mobile-menu.svelte';
	import { page } from "$app/state";
	import { onMount } from "svelte";
    import ExternalInlineLink from '$lib/components/external-inline-link.svelte';

	let { children } = $props();
	let hasScrolledALittle = $state(false);

	const routes = $state([
		{ href: "/", text: "Home" },
		{ href: "/about", text: "About" },
		{ href: "/blog", text: "Blog" },
		{ href: "/contact", text: "Contact" }
	]);

	const socials = [
		{ text: "Instagram", href: import.meta.env.VITE_INSTAGRAM },
		{ text: "LinkedIn", href: import.meta.env.VITE_LINKEDIN },
		{ text: "GitHub", href: import.meta.env.VITE_GITHUB }
	];

	const email = import.meta.env.VITE_CONTACT_EMAIL;
	const phone = `${import.meta.env.VITE_PHONE_COUNTRY_CODE} ${import.meta.env.VITE_PHONE_NUMBER}`;
	const address = `${import.meta.env.VITE_CITY}, ${import.meta.env.VITE_DISTRICT}`;

	onMount(() => {
		hasScrolledALittle = window.scrollY > 50;
	});

</script>

<svelte:head>

	<title>Philip Rosenqvist</title>

	<link rel="icon" href={favicon} />

	<!-- Figtree font -->
	<link rel="preload"
		  href="/fonts/Figtree/Figtree-VariableFont_wght.ttf"
		  as="font"
		  type="font/ttf" />

</svelte:head>

<header class="header { hasScrolledALittle ? 'has-scrolled' : '' }">

	<div class="site-wrapper header-wrapper">

		<!-- Logo -->
		<a class="logo" title="Philip Rosenqvist" href="/">
			<svg aria-hidden="true" width="64" height="51" viewBox="0 0 64 51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.5338 9.82372C21.6388 11.2751 22.1248 18.0155 23.7848 27.8788C24.6362 32.9355 24.955 44.6409 26.0358 45.7105M1.50049 4.02846C11.1271 0.851071 29.7084 0.548219 49.4449 3.80581C56.5698 4.98193 56.6767 5.94182 56.1979 6.25751C50.1395 10.2568 24.528 16.8355 22.496 18.8477M40.4417 26.7642C40.0808 28.5505 40.8518 28.5807 39.0913 49.5M35.9397 23.4207C37.4196 23.1544 38.2857 22.9986 54.3972 26.9869C63.602 29.266 50.7817 28.7841 41.792 37.6862C36.9602 42.4709 60.8126 44.039 62.5005 45.7105" stroke="#0D0D0D" stroke-width="3" stroke-miterlimit="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
		</a>

		<MobileMenu routes={routes} />

		<!-- Desktop nav menu -->
		<nav class="header-nav desktop-only">
			{#each routes as route (route.href)}
				<a class="header-nav-link"
				   href="{ route.href }"
				   aria-current={ page.url.pathname === route.href }
				>
					{ route.text }
				</a>
			{/each}
		</nav>

	</div>

</header>

<main>
	{@render children()}
</main>

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

<svelte:window on:scroll={() => { hasScrolledALittle = window.scrollY > 50 }} />

<style>

	.header {
		position: fixed;
		inset: 0;
		z-index: 3;
		padding: 1rem;
		height: fit-content;
		transition: background-color .5s ease-in, padding .5s ease-in;
	}

	.header::before {
		position: absolute;
		content: '';
		background: url("/images/splatter.png");
		background-repeat: repeat-x;
		background-size: contain;
		width: 100%;
		z-index: 10;
	}

	.has-scrolled.header {
		background-color: #070000;
		padding-block: .5rem;
	}

	.header-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		display: inline-block;
		height: 2rem;
		width: 2rem;
		z-index: 4;
	}

	.logo svg {
		display: block;
		height: 100%;
		width: 100%;
	}

	.has-scrolled .logo {
		height: 2rem;
	}

	.header-nav {
		display: inline-flex;
		align-items: center;
		gap: 2rem;
	}

	.header-nav-link {
		text-decoration: none;
		min-width: 5.125rem;
	}

	.header-nav-link {
		position: relative;
		font-size: 1rem;
		display: inline-flex;
		min-height: 3rem;
		justify-content: center;
		align-items: center;
		font-weight: 900;
	}

	.header-nav-link::before {
		content: '';
		display: block;
		width: 100%;
		height: 2rem;
		border: 0.125rem solid transparent;
		border-radius: 0.0625rem;
		position: absolute;
		left: 0;
		z-index: 10;
	}

	.header-nav-link[aria-current="true"] {
		color: #EA0708;
	}

	.header-nav-link[aria-current="true"]::before {
		border-color: #981213;
	}

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
