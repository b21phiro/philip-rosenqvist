<script lang="ts">
    import * as THREE from 'three';
    import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
    import { onMount } from "svelte";

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

    function playNoiseAnimation() {
        const turbulence = document.getElementById('noise-turbulence');
        function animateNoise() {
            if (!turbulence) return;
            turbulence.setAttribute('seed', String(Math.random() * 10000));
            requestAnimationFrame(animateNoise);
        }
        animateNoise();
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

        const cameraTargetZ = 5;
        camera = new THREE.PerspectiveCamera(45, renderer.domElement.width / renderer.domElement.height, 0.1, 1000);
        camera.rotateX(0.1);
        camera.position.x = 3.2;
        camera.position.y = .6;
        camera.position.z = 6;

        const light = new THREE.AmbientLight(0xffffff, 0.01);
        scene.add(light);

        resizeCanvas();

        renderer.setAnimationLoop(() => {

            if (!sceneLoadedComplete) return;

            if (camera.position.z > cameraTargetZ) {
                camera.position.z -= 0.0002;
                camera.fov += 0.1
            }

            // Draw
            renderer.render(scene, camera);
        });

        playNoiseAnimation();

    });

</script>

<!-- Hero -->
<div class="hero">

    <canvas bind:this={canvas}></canvas>

    <div class="noise">
        <svg width="0" height="0">
            <filter id="noise">
                <feTurbulence
                        id="noise-turbulence"
                        type="fractalNoise"
                        baseFrequency=".8"
                        numOctaves="3"
                        seed="1"
                />
            </filter>
        </svg>
    </div>

</div>

<svelte:window on:resize={() => resizeCanvas()} />

<style>

    .hero {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #0D0101;
    }

    .noise {
        position: absolute;
        width: 100%;
        height: 100%;
        inset: 0;
        filter: url(#noise);
        opacity: .15;
    }

    .hero::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 16rem;
        background: url("/images/splatter.png") repeat-x;
        background-size: contain;

    }

    .hero canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

</style>