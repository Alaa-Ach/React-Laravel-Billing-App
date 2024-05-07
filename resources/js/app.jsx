import "./bootstrap";
import "../css/app.css";
import "noty/src/themes/mint.scss";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout";
const appName = import.meta.env.VITE_APP_NAME || "Laravel";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        window.alertify = alertify;
        const root = createRoot(el);

        console.log("test val", props.initialPage.props.auth);
        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
