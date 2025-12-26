import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
    ],
    ssr: {
        noExternal: ["@inertiajs/react", "@inertiajs/server", "antd", "@visactor/react-vchart"],
    },
    server: {
        watch: {
            ignored: ["**/storage/framework/views/**"],
        },
    },
});
