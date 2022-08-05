import { Link } from "@solidjs/router";
import { For, Suspense } from "solid-js";
import { AdminOnly } from "../../components/AdminOnly";
import { allShorts } from "../../hooks/shorts";

export default function Admin() {
  return (
    <AdminOnly>
      <section class="h-screen mt-20 p-10 text-white">
        <header class="flex justify-between items-center">
          <h1 class="font-bold text-3xl">Admin only area!</h1>
          <Link href="/admin/upload">
            <a class="hover:text-purple-500 hover:underline">
              Upload a new short
            </a>
          </Link>
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <ShortsList />
        </Suspense>
      </section>
    </AdminOnly>
  );
}

function ShortsList() {
  const [shorts] = allShorts;
  if (!shorts) {
    return <div>No shorts found</div>;
  }
  return (
    <article id="shorts-list" class="mt-4">
      <h4 class="font-code text-xl">Currently {shorts.length} shorts live</h4>
      <ul class="flex flex-col justify-start">
        <For each={shorts()}>
          {(short) => (
            <Link href={`/admin/short/${short.id}`}>
              <li class="pt-6 px-8 py-8 pb-6 bg-zinc-900 cursor-pointer mt-4 mb-4 hover:bg-zinc-700">
                <header class="flex justify-between items-center">
                  <p title="id">{short.id}</p>
                  <p title="playbackId">{short.playbackId}</p>
                </header>
                <h1 class="text-xl">{short.title}</h1>
                <p>{short.description}</p>
              </li>
            </Link>
          )}
        </For>
      </ul>
    </article>
  );
}
