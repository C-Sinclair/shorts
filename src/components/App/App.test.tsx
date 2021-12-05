import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { screen, render, cleanup } from 'solid-testing-library'
import { App } from './App'
import { isInDom } from '../../lib/test.utils'

test.after.each(cleanup)

test('App should render', async () => {
  render(() => <App />)
  const component = await screen.findByTestId('page-title')
  assert.ok(isInDom(component))
  assert.ok(component.textContent === 'Shorts')
})

test.run()
