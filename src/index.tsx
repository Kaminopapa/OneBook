import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BookProvider from "./store/BookProvider";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BookProvider>
      <App />
    </BookProvider>
  </React.StrictMode>
);
