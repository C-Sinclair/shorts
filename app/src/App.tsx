import { DefaultLayout } from "~/components/DefaultLayout";
import { trpc, trpcClient } from "~/utils/trpc";
import { Component } from "solid-js";

export const App: Component = () => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </QueryClientProvider>
      <Toaster position="bottom-center" />
    </trpc.Provider>
  );
};
