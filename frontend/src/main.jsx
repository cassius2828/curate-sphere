/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
// Third-party library imports
import { BrowserRouter } from "react-router-dom";
// Custom component imports
import App from "./App.jsx";
import GeneralErrorBoundary from "./components/CommonComponents/Errors/GeneralErrorBoundary.jsx";
// Context provider imports
import { GlobalProvider } from "./context/global/GlobalContext.jsx";
import { ExbProvider } from "./context/exb/ExbContext.jsx";
import { ArtworkProvider } from "./context/artwork/ArtworkContext.jsx";

// Stylesheet imports
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* error boundary */}
    <GeneralErrorBoundary>
      {/* global provider */}
      <GlobalProvider>
        {/* artwork provider */}
        <ArtworkProvider>
          {/* exhibition provider */}
          <ExbProvider>
            {/* browser router */}
            <BrowserRouter>
              {/*  */}
              <App />
              {/*  */}
            </BrowserRouter>
            {/*  */}
          </ExbProvider>
          {/*  */}
        </ArtworkProvider>
        {/*  */}
      </GlobalProvider>
      {/*  */}
    </GeneralErrorBoundary>
    {/*  */}
  </React.StrictMode>
);
