import { ShortsMachine, Short } from "./Shorts.machine";
import { useMachine } from "../Machine/Machine";

type ShortsRes = {
  shorts: Short[]
}

export function useShorts(): ShortsRes {
  const [state] = useMachine(ShortsMachine)
  return {
    shorts: state.context.shorts
  }
}