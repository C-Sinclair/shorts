import { DefaultLayout } from "./components/DefaultLayout";
import { Route, Routes } from "@solidjs/router";
import { lazy } from "solid-js";
import { getShortData } from "./pages/v/[path].data";
import { Toaster } from "solid-toast";

const Home = lazy(() => import("./pages/index"));
const Short = lazy(() => import("./pages/v/[path]"));
const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const NotFound = lazy(() => import("./pages/404"));
const AdminDash = lazy(() => import("./pages/admin/index"));
const UploadShort = lazy(() => import("./pages/admin/upload"));
const EditShort = lazy(() => import("./pages/admin/short/[id]"));

export function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/v/:path" component={Short} data={getShortData} />
        <Route path="/admin" component={AdminDash} />
        <Route path="/admin/upload" component={UploadShort} />
        <Route path="/admin/short/:id" component={EditShort} />
        <Route path="*" component={NotFound} />
      </Routes>
      <Toaster />
    </DefaultLayout>
  );
}
