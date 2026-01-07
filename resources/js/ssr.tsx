import { renderToString } from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import "antd/dist/reset.css";
import "../css/app.css";
import AppLayout from "./Layouts/AppLayout";

export default function render(page: any) {
    const appName = process.env.VITE_APP_NAME || "Laravel";

    return createInertiaApp({
        page,
        title: (title) => `${title ? `${title} - ` : ""}${appName}`,
        render: renderToString,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob("./Pages/**/*.tsx")
            ).then((module: any) => {
                module.default.layout =
                    module.default.layout ||
                    ((page: ReactNode) => (
                        <AppLayout>{page}</AppLayout>
                    ));
                return module;
            }),
        setup({ App, props }) {
            const queryClient = new QueryClient();
            return (
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
            );
        },
    });
}
