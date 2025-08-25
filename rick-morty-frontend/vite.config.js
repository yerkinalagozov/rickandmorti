import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        define: {
            'process.env': env,
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            port: 7878,
            host: true,
            open: false,
        },
        preview: {
            port: 7878,
            host: true,
            strictPort: true,
        },
        build: {
            sourcemap: true,
        },
    };
});
