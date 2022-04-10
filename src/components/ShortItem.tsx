import type { Short } from "@prisma/client"

type ShortItemProps = {
  short: Short
}

export function ShortItem({ short }: ShortItemProps) {
    return (
    <div>
      <h1>{short.title}</h1>
      <p>{short.description}</p>
    </div>
  )
}
