import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Route path="/" exact>
        <App />
      </Route>

      <Route path="/edit/:id">Edit</Route>
    </Router>
  </React.StrictMode>
);
