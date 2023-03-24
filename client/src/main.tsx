import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./context";
import "./index.css";

export const Context = createContext<any>(null)


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ContextProvider>
);
