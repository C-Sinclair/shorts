import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { interpret } from 'xstate'
import { ShortsMachine, Short } from './Shorts.machine'

const mockShorts: Short[] = [{
  url: 'test.com',
  title: 'title',
  description: 'desc',
  tags: ['foo']
}]

test('ShortsMachine should fetch on load', async () => {
  await new Promise(resolve => {
    let hasCalledFetch = false 
    const fetchShorts = async () => {
      hasCalledFetch = true
      return { shorts: mockShorts }
    }
    const machine = interpret(ShortsMachine.withConfig({
      services: { fetchShorts }
    })).onTransition(state => {
      if (state.matches('idle')) {
        assert.ok(hasCalledFetch === true)
        assert.ok(state.context.shorts.length === mockShorts.length)
        resolve(true)
      }
    })
    machine.start()
  })
})

test.run()