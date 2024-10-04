import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./App";
import { BenchMark } from "./components/Benchmark";
import { FiberDemo } from "./components/Fiber/FiberDemo";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "benchmark",
        element: <BenchMark />,
      },
      {
        path: "fiber",
        element: <FiberDemo />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
