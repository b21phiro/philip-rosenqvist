<script lang="ts">

    import { MailIcon, SmartphoneIcon, MapPinIcon, SendHorizontalIcon } from '@lucide/svelte';
    import { enhance } from "$app/forms";
    import type { PageProps } from './$types';
    import {onMount} from "svelte";

    let { form }: PageProps = $props();

    let contactEmailAddress = $state(import.meta.env.VITE_CONTACT_EMAIL);
    const contactPhoneNumber = `${import.meta.env.VITE_PHONE_COUNTRY_CODE} ${import.meta.env.VITE_PHONE_NUMBER}`;
    const address =`${ import.meta.env.VITE_CITY }, ${ import.meta.env.VITE_DISTRICT }`;

    let emailInputValue = $state("philip.rosenqvist@outlook.com");
    let firstnameInputValue = $state("Philip");
    let surnameInputValue = $state("Rosenqvist");

    let messageInput: HTMLTextAreaElement | undefined = $state();

    function resizeMessageInput() {
        if (!messageInput) return;
        messageInput.style.height = 'auto';
        messageInput.style.height = `${ messageInput.scrollHeight }px`;
    }

    onMount(() => {
        messageInput!.value = "Lorem Ipsum, detta blir ett fint testmeddelande att skicka till däg.\nMvh Mormor.";
    })

</script>

<div class="site">

    <div class="site-wrapper">

        <form
            class="form"
            action="?/sendEmail"
            use:enhance
            method="POST"
        >

            <div class="form-head">
                <figure class="figure">
                    <img class="image" src="/images/me.png" alt="Philip Rosenqvist" />
                </figure>
                <div class="form-head-content">
                    <h1 class="form-title">Get in touch</h1>

                    <address class="address">
                        <p class="address-link">
                            <MapPinIcon size={24} aria-hidden="true" />
                            { address }.
                        </p>
                        <a class="address-link" href="mailto:${ contactEmailAddress }">
                            <MailIcon size={24} aria-hidden="true" />
                            { contactEmailAddress }
                        </a>
                        <a class="address-link" href="tel:${ contactPhoneNumber }">
                            <SmartphoneIcon size={24} aria-hidden="true" />
                            { contactPhoneNumber }
                        </a>
                    </address>
                </div>
            </div>

            <fieldset class="fieldset">

                <div class="field">
                    <label class="label" for="firstname">Your firstname:</label>
                    <input class="input"
                           id="firstname"
                           type="text"
                           name="firstname"
                           bind:value={firstnameInputValue}
                    />
                </div>

                <div class="field">
                    <label class="label" for="surname">Your surname:</label>
                    <input class="input"
                           id="surname"
                           type="text"
                           name="surname"
                           bind:value={surnameInputValue}
                    />
                </div>

                <div class="field">
                    <label class="label" for="email">Your email:</label>
                    <input class="input"
                           id="email"
                           type="email"
                           name="email"
                           bind:value={emailInputValue}
                    />
                </div>

                <div class="field message-field">
                    <label class="label" for="message">Your message:</label>
                    <textarea
                            bind:this={messageInput}
                            oninput={resizeMessageInput}
                            id="message"
                            name="message"
                            class="input">
                    </textarea>
                </div>

            </fieldset>

            <div class="form-footer">

                <label for="send-message-button" class="button">
                    Send mail
                    <SendHorizontalIcon aria-hidden="true" size="18" />
                </label>
                <input id="send-message-button"
                       class="hidden"
                       type="submit"
                />

            </div>

        </form>

    </div>

</div>

<style>

    .figure {
        position: relative;
        aspect-ratio: 1;
        margin: 0;
    }

    .form-head-content {
        width: 100%;
        padding-block: 1rem;
    }

    .image {
        width: 100%;
        display: block;
    }

    .address {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .address-link {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
        font-size: 1rem;
        text-decoration: none;
        font-style: normal;
        margin: 0;
        line-height: 1.5;
    }

    .form {
        border: 0.125rem solid #151515;
        margin-top: 1rem;
        max-width: 80rem;
        margin-inline: auto;
    }

    .form-title {
        font-size: 2rem;
        margin-top: 0;
        margin-bottom: 2rem;
    }

    .form-head {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        gap: 1rem;
    }

    .form-footer {
        background-color: #151515;
        display: flex;
        align-items: center;
        justify-content: end;
        border-top: 0.125rem solid #151515;
    }

    .fieldset {
        border: 0;
        padding: 0;
        margin: 0;
    }

    .field {
        color: #EAE0D9;
        display: flex;
        gap: 1rem;
        align-items: center;
        padding-left: 1rem;
        border-top: 0.125rem solid #151515;
    }

    .field:focus-within {
        z-index: 1;
        outline-offset: .0625rem;
        outline: .125rem solid #EAE0D9;
    }

    .field:nth-child(2) {
        border-top: 0.125rem solid #151515;
    }

    .input {
        border: 0;
        background-color: transparent;
        font-size: 1rem;
        font-family: "Figtree", sans-serif;
        color: #EAE0D9;
        padding-block: 1rem;
        padding-right: 1rem;
        font-weight: 900;
        flex: 1;
    }

    .input:focus {
        outline: 0;
    }

    .message-field {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
        height: auto;
    }

    .message-field .label {
        padding-top: 1rem;
    }

    .message-field .input {
        box-sizing: border-box;
        flex: none;
        margin: 0;
        min-height: 8rem;
        overflow: hidden;
        padding: 0 0 1rem 0;
        line-height: 1.7;
        resize: vertical;
    }

    .message-field .label,
    .message-field .input {
        width: 100%;
    }

    .hidden {
        display: none !important;
    }

    .button {
        font-size: 1rem;
        color: #070000;
        background-color: #EAE0D9;
        font-family: "Figtree", sans-serif;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        padding: 0 1rem 0 1rem;
        min-height: 3rem;
        cursor: pointer;
    }

    .button:hover {
        background-color: #B7ACA5;
    }

    :global(.button svg),
    :global(.button svg path) {
        stroke: #070000 !important;
    }

    @media only screen and (min-width: 46rem) {

        .form {
            margin-top: 4rem;
        }

        .form-head {
            flex-direction: row;
            gap: 4rem;
        }

        .form-title {
            font-size: 4rem;
            margin-bottom: 2rem;
        }

        .field:first-child {
            grid-area: firstname;
        }

        .field:nth-child(2) {
            grid-area: surname;
            border-left: 0.125rem solid #151515;
        }

        .field:nth-child(3) {
            grid-area: email;
        }

        .field:nth-child(4) {
            grid-area: message;
        }

        .fieldset {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas:
                "firstname surname"
                "email email"
                "message message";
            border: 0;
            padding: 0;
        }

    }

</style>
