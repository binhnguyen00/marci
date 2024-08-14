import React from "react";
import ReactDOM from "react-dom/client";
import { UIHome } from "home/UIHome";

function ensureRoot(): HTMLElement {
  let root = document.getElementById("root") as any;
  if (!root) {
    root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
  }
  return root;
}

function renderRoot() {
  const root = ensureRoot();
  const reactDOMRoot = ReactDOM.createRoot(root);
  reactDOMRoot.render(
    <React.StrictMode>
      <UIHome />
    </React.StrictMode>
  )
  return reactDOMRoot;
}

const reactDOMRoot = renderRoot();