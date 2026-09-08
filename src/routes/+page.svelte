<script lang="ts">
    import * as THREE from 'three';
    import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
    import { onMount } from "svelte";
    import { MoveRightIcon } from '@lucide/svelte';

    let { data } = $props();
    let blogPosts = $derived(data.recentBlogPosts ?? []);

    let canvas = $state<HTMLElement>();
    let hero = $derived(canvas?.parentElement);

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    let canvasAspectRatio = $derived(() => {
       return renderer.domElement.width / renderer.domElement.height;
    });

    function resizeCanvas() {
        if (!hero) return;
        const css = getComputedStyle(hero);
        const width = parseInt(css.width);
        const height = parseInt(css.height);
        renderer.setSize(width, height);
        camera.aspect = canvasAspectRatio();
        camera.fov = 45;
        camera.updateProjectionMatrix();
    }

    function loadGltfModel(path: string): Promise<GLTF> {
        const loader = new GLTFLoader();
        return new Promise((res, rej) => {
            loader.loadAsync(path)
                .then((gltf) => {
                    res(gltf);
                })
                .catch((err) => {
                    console.error("Error: failed to load GLTF\nPath:", path, "\nReason", err);
                    rej(err);
                })
        });
    }

    onMount(() => {

        let sceneLoadedComplete = false;

        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });

        scene = new THREE.Scene();
        loadGltfModel("/glb/house.glb")
            .then((model) => {
                model.scene.rotateX(.1);
                scene.add(model.scene);

                for (const child of model.scene.children) {
                    if (child.name === 'Light' && child instanceof THREE.Light) {
                       child.intensity = 5.0;
                    }
                }

                sceneLoadedComplete = true;
            });

        const cameraTargetZ = 5.0;
        camera = new THREE.PerspectiveCamera(45, renderer.domElement.width / renderer.domElement.height, 0.1, 1000);
        camera.rotateX(0.1);
        camera.position.x = 3.2;
        camera.position.y = 0.6;
        camera.position.z = 6.0;

        const light = new THREE.AmbientLight(0xffffff, 0.001);
        scene.add(light);

        resizeCanvas();

        renderer.setAnimationLoop(() => {

            if (!sceneLoadedComplete) return;

            if (camera.position.z > cameraTargetZ) {
                camera.position.z -= 0.0002;
                camera.fov += 0.1;
            }

            // Draw
            renderer.render(scene, camera);
        });

    });

</script>

<!-- Hero -->
<div class="hero">

    <h1 class="is-hidden">Hello, you.</h1>

    <canvas bind:this={canvas}></canvas>

</div>

<!-- Little about me -->

<section class="about-me site-wrapper">

    <div class="col">

        <h2 class="large-title text-neon">I'm Philip</h2>

        <h3>I’m a software developer based in Stockholm, Sweden.</h3>

        <p class="text">I like creating things that are either usefull, fun or make people feel *something*</p>

        <p class="text">
            Right now I’m developing my own game in C++ on the free-time. Don’t worry, it’s about running a café.
            Yes, a normal café. If you’re interested in following the process from the beginning til the inevitable end,
            check out my blog.
        </p>

    </div>

    <div class="col">
        <figure class="figure">
            <img src="/images/me.png" alt="I like to wear black clothing, sometimes a black cap." />
        </figure>
    </div>

</section>

<!-- Latest from blog -->

<section class="recently-from-blog">

    <div class="section site-wrapper">

        <h2 class="section-title">Latest from my blog</h2>

        <div class="blog-post-grid">
            {#if blogPosts.length > 0 }
                {#each blogPosts as blogPost}
                    <article class="blog-post-card">
                        <a class="blog-post-card--link" href="/blog/{blogPost.slug}" title="Read {blogPost.title}"></a>
                        <h3 class="blog-post-card--title">{blogPost.title}</h3>
                        <figure class="blog-post-card--figure">
                            <img class="blog-post-card--figure--img"
                                 src="http://localhost:1337{blogPost.featured_image.url}"
                                 alt="{blogPost.featured_image.alternativeText || blogPost.title}" />
                        </figure>
                        <span class="blog-post-card--controller">Read <MoveRightIcon aria-hidden="true" /></span>
                    </article>
                {/each}
            {:else}
                <p>No blog posts</p>
            {/if}

        </div>

    </div>

</section>

<svelte:window on:resize={() => resizeCanvas()} />

<style>

    .hero {
        width: 100vw;
        height: 100vh;
    }

    .recently-from-blog {
        background-color: #070000;
    }

    .section {
        padding: 2rem 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .section h2 {
        margin: 0;
    }

    .hero,
    .recently-from-blog {
        position: relative;
    }

    .hero::after {
        background: url("/images/splatter.png");
        bottom: 0;
    }

    .recently-from-blog::after {
        background: url("/images/splatter-2.png");
        bottom: 100%;
        z-index: -1;
    }

    .hero::after,
    .recently-from-blog::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 16rem;
        background-repeat: repeat-x;
        background-size: contain;
    }

    .hero canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    .large-title {
        text-transform: uppercase;
        font-size: 4rem;
        margin: 0;
    }

    .text-neon {
        color: #981213;
        text-shadow: 0 0 8px #981213, 0 0 16px #500506;
    }

    .about-me {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem 1rem;
        max-width: 1280px;
    }

    .col {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;
    }

    .col p,
    .col h2,
    .col h3 {
        margin: 0;
    }

    .figure {
        display: flex;
        width: 100%;
        max-height: 38rem;
        aspect-ratio: 1;
        margin: 0;
        padding: 0;
        align-items: center;
        justify-content: center;
    }

    .figure img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .blog-post-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

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

    @media only screen and (min-width: 700px) {

        .about-me {
            flex-direction: row-reverse;
            align-items: center;
            gap: 4rem;
        }

        .large-title {
            font-size: 6rem;
        }

        .section-title {
            font-size: 3rem;
        }

        .section {
            padding-block: 4rem;
        }

        .section,
        .blog-post-grid {
            gap: 4rem;
        }

    }

</style>