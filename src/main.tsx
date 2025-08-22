import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// Entry point of the application
// Creates the root React element and renders the App component
// StrictMode is enabled for better development experience and error detection
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
