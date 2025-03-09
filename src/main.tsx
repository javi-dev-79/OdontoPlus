import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "./Provider";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
