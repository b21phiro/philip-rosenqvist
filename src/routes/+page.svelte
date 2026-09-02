<script lang="js">
    import * as THREE from 'three';
    import { onMount } from "svelte";

    /** @type {HTMLCanvasElement | undefined} */
    let canvas = $state();
    let hero = $derived(canvas?.parentElement);

    /** @type {THREE.WebGLRenderer} */
    let renderer;

    /** @type {THREE.Scene} */
    let scene;

    /** @type {THREE.PerspectiveCamera} */
    let camera;

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
        camera.updateProjectionMatrix();
    }

    onMount(() => {

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );

        scene = new THREE.Scene();
        scene.add(cube);

        renderer = new THREE.WebGLRenderer({ canvas });

        camera = new THREE.PerspectiveCamera(75, renderer.domElement.width / renderer.domElement.height, 0.1, 1000);
        camera.position.z = 5;
        resizeCanvas();

        renderer.setAnimationLoop(() => {

            // Update
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            // Draw
            renderer.render(scene, camera);
        });

    });

</script>

<!-- Hero -->
<div class="hero">

    <canvas bind:this={canvas}></canvas>
    
</div>

<svelte:window on:resize={() => resizeCanvas()} />

<style>

    .hero {
        position: relative;
        width: 100vw;
        height: 99vh;
        background-color: #000;
    }

    .hero canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

</style>