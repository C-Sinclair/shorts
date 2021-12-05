import { onCleanup, batch } from 'solid-js'
import { createStore, reconcile, Store } from 'solid-js/store'
import {
  EventObject,
  HistoryValue,
  interpret,
  MachineOptions,
  StateMachine,
  StateSchema,
  StateValue,
} from 'xstate'

type UseMachineRes<
  Ctx extends Record<string, unknown> = {},
  Events extends EventObject = EventObject,
> = [
  Store<{
    value: StateValue
    context: Ctx
    historyValue?: HistoryValue
    matches: (_value: string) => void
  }>,
  (event: Events) => void,
]

/**
 * Takes a StateMachine and returns a Solid stateful store
 * Full credit to https://codesandbox.io/s/xstate-solid-example-dgpd7
 * Just some typing for TS on top of it
 */
export function useMachine<
  Ctx extends Record<string, unknown> = {},
  Events extends EventObject = EventObject,
>(
  machine: StateMachine<Ctx, StateSchema, Events>,
  options: Partial<MachineOptions<Ctx, Events>> = {},
  interpretOpts = {},
): UseMachineRes<Ctx, Events> {
  const service = interpret(machine.withConfig(options), interpretOpts)

  const store = {
    ...service.initialState,
    matches(value: string) {
      return service.state.matches(value)
    },
  }
  const [state, setState] = createStore(store)

  service.onTransition((s) => {
    console.log(s)
    // only focus on stuff that actually changes
    batch(() => {
      setState('value', s.value)
      // diff data to only update values that changes
      setState('context', reconcile(s.context))
    })
  })

  service.start()
  onCleanup(() => service.stop())

  return [state, service.send]
}
