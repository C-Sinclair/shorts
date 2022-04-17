import { Short, ShortItem } from "../components";
import { createResource, For } from "solid-js";

export default function Home() {
  const [shorts] = createResource(getShorts);
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

async function getShorts(): Promise<Short[]> {
  return [];
}
