import React from "react";
import ReactDOM from "react-dom/client";
import { UIHome } from "home/UIHome";

let root = document.getElementById("root");

function ensureRoot(root: HTMLElement | null): HTMLElement {
  if (!root) {
    root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
  }
  return root;
}

function renderRoot() {
  root = ensureRoot(root);
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <UIHome />
    </React.StrictMode>
  )
}

renderRoot();