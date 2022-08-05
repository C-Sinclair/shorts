import { children, ParentProps } from "solid-js";
import { Header } from "./Header";

export const DefaultLayout = (props: ParentProps) => {
  const c = children(() => props.children);
  return (
    <>
      <div class="fixed min-h-screen min-w-screen -z-10">
        <img
          alt="background code image"
          src="/mitchell-luo-FWoq_ldWlNQ-unsplash.jpg"
          class="object-cover fixed w-full h-full opacity-50"
        />
      </div>

      <Header />
      <main class="flex-grow space-y-2 w-full z-5">{c()}</main>
    </>
  );
};
