import { createMachine, assign } from "xstate";

/**
 * Used for filtering and categorizing
 */
type Tag = string

export type Short = {
  /** Url of the video file */
  url: string
  /** The title of the video */
  title: string
  /** A short description of the video */
  description: string
  /**  */
  tags: Tag[]
}

type ShortsMachineState = {
  shorts: Short[]
}

type ShortsMachineActions = 
| { type: 'FETCH' }

/**
 * @service fetchShorts -- promise to fetch the shorts from the backend
 */
export const ShortsMachine = createMachine<ShortsMachineState, ShortsMachineActions>({
  id: 'shorts-machine',
  description: `Shorts fetcher from backend`,
  context: {
    shorts: [],
  },
  initial: 'fetching',
  states: {
    idle: {},
    fetching: {
      invoke: {
        src: 'fetchShorts',
        onDone: {
          target: 'idle',
          actions: assign({
            shorts: (_, res) => res.data.shorts || []
          })
        },
        onError: {
          target: 'error'
        }
      }
    },
    error: {},
  },
})