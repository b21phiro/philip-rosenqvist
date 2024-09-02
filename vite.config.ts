import {defineConfig} from 'vite'

export default defineConfig(({ mode }): any => {
    if (mode === 'build') {
        return {
            base: "/philip-rosenqvist/"
        }
    } else {
        return {
            base: "/"
        }
    }
});