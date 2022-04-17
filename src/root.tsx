// @refresh reload
import { Suspense } from "solid-js";
import { Links, Meta, Routes, Scripts } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Footer, Header } from "./components";
import codeImg from "./assets/mitchell-luo-FWoq_ldWlNQ-unsplash.jpg";

import "virtual:windi.css";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Smooch&family=Source+Code+Pro:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body class="flex flex-col min-h-screen bg-black">
        <div class="fixed min-h-screen min-w-screen -z-20">
          <img
            alt="background code image"
            src={codeImg}
            class="object-cover fixed w-full h-full opacity-50"
          />
        </div>
        <Header />
        <main class="flex-grow p-4 space-y-2 w-full">
          <ErrorBoundary>
            <Suspense fallback={<div>Page Loading</div>}>
              <Routes />
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
