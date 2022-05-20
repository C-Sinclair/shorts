import { useAllShorts } from "~/hooks/all-shorts";
import { ShortItem } from "../components";

export default function Home() {
  const { shorts } = useAllShorts();
  return (
    <ul className="flex flex-wrap px-8">
      {shorts?.map((short) => (
        <li key={short.id} className="my-8">
          <ShortItem {...short} />
        </li>
      ))}
    </ul>
  );
}
