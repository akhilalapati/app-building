import React from "react";
import ReactDOM from "react-dom";

import HomePage from "./HomePage/HomePage";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
  rootElement
);
