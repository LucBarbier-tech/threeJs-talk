import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./App";
import "./index.css";
import { BenchMark } from "./pages/Benchmark";
import { FiberDemo } from "./pages/Fiber/FiberDemo";
import { SimpleScene } from "./pages/SimpleScene/SimpleScene";
import { Thanks } from "./pages/Thanks/Thanks";

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
        path: "simple-scene",
        element: <SimpleScene />,
      },
      {
        path: "fiber",
        element: <FiberDemo />,
      },
      {
        path: "thanks",
        element: <Thanks />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
