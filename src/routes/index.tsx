import { ShortItem } from "~/components";
import { db } from "~/db";
import { useRouteData } from "solid-app-router";
import { isServer } from "solid-js/web";
import { createResource, For } from "solid-js";
import type { Short } from "@prisma/client";

export const routeData = () => {
  const [shorts] = createResource(getShorts);
  return shorts;
};

export default function Home() {
  const shorts = useRouteData<() => Short[]>();
  return (
    <ul class="flex flex-wrap px-8">
      <For each={shorts()} fallback={() => <li>No shorts found</li>}>
        {(short) => (
          <li>
            <ShortItem short={short} />
          </li>
        )}
      </For>
    </ul>
  );
}

async function getShorts() {
  if (isServer) {
    const shorts = await db.short.findMany();
    return shorts;
  }
  return [];
}
