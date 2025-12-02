import { defineConfig } from 'vite';

export default defineConfig({
    base: '/public/',
    build: {
        outDir: '../backend/public',
        emptyOutDir: true,
    }
});