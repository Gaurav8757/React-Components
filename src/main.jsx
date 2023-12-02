import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}></Route>)
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
