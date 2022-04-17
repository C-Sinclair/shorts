import { lazy } from "solid-js";
import type { RouteDefinition } from "solid-app-router";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/home")),
  },
  {
    path: "/login",
    component: lazy(() => import("./pages/login")),
  },
  {
    path: "/signup",
    component: lazy(() => import("./pages/signup")),
  },
  {
    path: "/upload",
    component: lazy(() => import("./pages/upload")),
  },
  {
    path: "**",
    component: lazy(() => import("./pages/404")),
  },
];
