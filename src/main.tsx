import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/globals.css";
import AppRouter from "@/route";
import "@/styles/preflight.css";
import "@/fonts/index.css";
import {ThemeProvider} from "./contexts/themeContext";
import {Toaster} from "@/components/ui/toaster"
import {Provider} from "react-redux";
import store, {persistor} from "@/store";
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AppRouter/>
                </PersistGate>
            </Provider>
            <Toaster/>
        </ThemeProvider>
    </React.StrictMode>
);
