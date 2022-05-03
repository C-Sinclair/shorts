import { Short, ShortItem } from "../components";

export default function Home() {
  const shorts = useShorts()
  return (
    <ul className="flex flex-wrap px-8">
      {shorts.map((short) => (
          <li>
            <ShortItem short={short} />
          </li>
        ))}
    </ul>
  );
}

function useShorts(): Short[] {
  return [];
}
