import { ErrorBoundary, Suspense } from "solid-js";
import { Footer, Header } from "./components";
import { useRoutes } from "solid-app-router";
import bgImg from "./assets/mitchell-luo-FWoq_ldWlNQ-unsplash.jpg";
import "virtual:windi.css";

import { routes } from "./routes";

export function App() {
  const Route = useRoutes(routes);
  return (
    <>
      <div class="fixed min-h-screen min-w-screen -z-20">
        <img
          alt="background code image"
          src={bgImg}
          class="object-cover fixed w-full h-full opacity-50"
        />
      </div>
      <Header />
      <main class="flex-grow p-4 space-y-2 w-full">
        <ErrorBoundary fallback={() => <h1>An error occurred</h1>}>
          <Suspense fallback={<div>Page Loading</div>}>
            <Route />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
