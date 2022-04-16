import type { Short } from "@prisma/client";

type ShortItemProps = {
  short: Short;
};

export function ShortItem({ short }: ShortItemProps) {
  return (
    <article class="p-4 w-80 h-80 bg-purple-900 rounded-2xl transition-transform cursor-pointer hover:scale-110">
      <h1>{short.title}</h1>
      <p>{short.description}</p>
    </article>
  );
}
