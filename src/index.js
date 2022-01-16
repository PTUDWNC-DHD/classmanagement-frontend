import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthProvider } from "./contexts/authContext";
import { DisplayProvider } from "./contexts/displayContext";


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DisplayProvider>
        <App/>
      </DisplayProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
