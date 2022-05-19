import { trpc } from "~/utils/trpc";
import { ShortItem } from "../components";

export default function Home() {
  const { data } = trpc.useQuery(["short.all"]);
  return (
    <ul className="flex flex-wrap px-8">
      {data?.map((short) => (
        <li>
          <ShortItem {...short} />
        </li>
      ))}
    </ul>
  );
}
