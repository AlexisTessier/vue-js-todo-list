import test from 'ava'

import { state } from '../../../store/api'

test('is a function', t => {
  t.true(typeof state === 'function')
})

test('return a valid initial state', t => {
  const initialState = state()

  t.deepEqual(Object.keys(initialState), ['origin'])
  t.true(typeof initialState.origin === 'string')
  t.snapshot(initialState.origin)
})
