import { ShortsMachine, Short } from "./Shorts.machine";
import { useMachine } from "../Machine/Machine";

type ShortsRes = {
  shorts: Short[]
}

export function useShorts(): ShortsRes {
  const [state] = useMachine(ShortsMachine, {
    services: { fetchShorts },
  })
  return {
    shorts: state.context?.shorts || []
  }
}

async function fetchShorts() {
  const shorts: Short[] = [{
    tags: ['foo'],
    title: 'Yep',
    description: 'tttt',
    url: 'fff.c'
  }]
  return Promise.resolve({
    shorts
  })
}