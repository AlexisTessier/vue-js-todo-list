import { state } from '../../../store/api'

test('is a function', () => {
  expect(typeof state === 'function').toBe(true)
})

test('return a valid initial state', () => {
  const initialState = state()

  expect(Object.keys(initialState)).toEqual(['origin'])
  expect(typeof initialState.origin === 'string').toBe(true)
  expect(initialState.origin).toMatchSnapshot()
})
