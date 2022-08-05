import clsx from "clsx";
import { For } from "solid-js";
import { allShorts, focusedShortSignal } from "../hooks/shorts";
import { ShortItem } from "../components";

export default function Home() {
  const [shorts] = allShorts;
  const [focusedShort] = focusedShortSignal;
  return (
    <ul class="flex flex-wrap px-12 pt-12">
      <For each={shorts()}>
        {(short) => (
          <li
            class={clsx("my-8 transition-all", {
              "opacity-0 translate-y-4": focusedShort() &&
                focusedShort()?.id !== short.id,
            })}
          >
            <ShortItem short={short} />
          </li>
        )}
      </For>
    </ul>
  );
}
