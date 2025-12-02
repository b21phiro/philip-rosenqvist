import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    build: {
        outDir: '../backend/public',
        emptyOutDir: true,
    }
});