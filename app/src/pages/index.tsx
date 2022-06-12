import clsx from "clsx";
import { useAllShorts } from "~/hooks/all-shorts";
import { useFocusedShort } from "~/hooks/focused-short";
import { ShortItem } from "../components";

export default function Home() {
  const { shorts } = useAllShorts();
  const { focusedShort } = useFocusedShort();
  return (
    <ul className="flex flex-wrap px-12 pt-12">
      {shorts?.map((short) => (
        <li
          key={short.id}
          className={clsx("my-8 transition-all", {
            "opacity-0 translate-y-4": focusedShort &&
              focusedShort.id !== short.id,
          })}
        >
          <ShortItem {...short} />
        </li>
      ))}
    </ul>
  );
}
