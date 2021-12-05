import { ShortsMachine, Short } from './Shorts.machine'
import { useMachine } from '../Machine/Machine'
import { createContext, useContext, PropsWithChildren } from 'solid-js'

type ShortsRes = {
  shorts: Short[]
}

const ShortsContext = createContext<ShortsRes>({
  shorts: [],
})

export function ShortsProvider(props: PropsWithChildren) {
  const [state] = useMachine(ShortsMachine, {
    services: { fetchShorts },
  })
  const value = {
    shorts: state.context?.shorts || [],
  }
  return (
    <ShortsContext.Provider value={value}>
      {props.children}
    </ShortsContext.Provider>
  )
}

export function useShorts(): ShortsRes {
  return useContext(ShortsContext)
}

async function fetchShorts() {
  const shorts: Short[] = [
    {
      tags: ['foo'],
      title: 'Yep',
      description: 'tttt',
      url: 'fff.c',
    },
  ]
  return Promise.resolve({
    shorts,
  })
}
