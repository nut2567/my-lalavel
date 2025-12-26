import React from "react";
import { renderToString } from "react-dom/server";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "../css/app.css";

export default function render(page: any) {
    const appName = process.env.VITE_APP_NAME || "Laravel";

    return createInertiaApp({
        page,
        title: (title) => `${title ? `${title} - ` : ""}${appName}`,
        render: renderToString,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob("./Pages/**/*.tsx"),
            ),
        setup({ App, props }) {
            return (
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#1677ff",
                            borderRadius: 10,
                        },
                    }}
                >
                    <App {...props} />
                </ConfigProvider>
            );
        },
    });
}
