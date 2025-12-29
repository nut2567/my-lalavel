import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/reset.css";
import "../css/app.css";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const queryClient = new QueryClient();

createInertiaApp({
    title: (title) => `${title ? `${title} - ` : ""}${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx"),
        ),
    setup({ el, App, props }) {
        const root: Root = createRoot(el);

        root.render(
            <React.StrictMode>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#1677ff",
                            borderRadius: 10,
                        },
                    }}
                >
                    <QueryClientProvider client={queryClient}>
                        <App {...props} />
                    </QueryClientProvider>
                </ConfigProvider>
            </React.StrictMode>,
        );
    },
    progress: {
        color: "#1677ff",
    },
});
