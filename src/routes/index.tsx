import { db } from '~/db'
import server  from 'solid-start/server'
import { createResource, Index, ResourceReturn } from 'solid-js'
import { Short } from '@prisma/client'
import { useRouteData } from 'solid-app-router'
import { ErrorBoundary } from 'solid-start/error-boundary'
import { ShortItem } from '~/components/ShortItem'
import { Footer } from '~/components/Footer'

type ShortsResourceData = ResourceReturn<{
  shorts: Short[]
}>

export function routeData(): ShortsResourceData {
  return createResource(
    server(async function () {
      const shorts = await db.short.findMany()
      return {
        shorts 
      }
    }),
  )
}

export default function Home() {
  const [data] = useRouteData<ShortsResourceData>()

  return (
    <main class="w-full p-4 space-y-2">
      <h1 class="font-bold text-xl">Message board</h1>
      <ErrorBoundary>
        <Index each={data()?.shorts ?? []}>
          {(short) => (
              <ShortItem short={short()} />
          )}
        </Index>
      </ErrorBoundary>
      <Footer />
    </main>
  )
}
