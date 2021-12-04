import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { screen, render, cleanup } from 'solid-testing-library';
import { Gallery } from './Gallery';
import { isInDom } from '../../lib/test.utils';

test.after.each(cleanup);

test('Gallery should render', async () => {
  render(() => <Gallery />)
  const component = await screen.findByTestId('gallery-root')
  assert.ok(isInDom(component))
})

test.run()
