import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/Store.js";
import { Provider } from "react-redux";
import { SearchProvider  } from "./Context/SearchContext"; 
import { AuthProvider} from "./Context/AuthContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
      <BrowserRouter>
        <SearchProvider>        {/* ✅ YOUR NAVBAR MUST BE INSIDE THIS */}
          <App />
        </SearchProvider>
      </BrowserRouter></AuthProvider>
    </Provider>
  </StrictMode>
);
