import Head from "next/head";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { Header } from "./Header";

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Shorts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="fixed min-h-screen min-w-screen">
        <img
          alt="background code image"
          src="/mitchell-luo-FWoq_ldWlNQ-unsplash.jpg"
          className="object-cover fixed w-full h-full opacity-50"
        />
      </div>

      <Header />
      <main className="flex-grow p-4 space-y-2 w-full z-5">{children}</main>

      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};
