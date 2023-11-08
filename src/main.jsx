import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { QueryProvider } from "./lib/Rquery/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
