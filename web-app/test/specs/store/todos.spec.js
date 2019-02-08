import assert from 'assert'
import test from 'ava'

import { state, mutations } from '../../../store/todos'

function TodosTask({
  updating,
  updatingError,
  id,
  title,
  completed
}) {
  assert(typeof updating === 'boolean')
  assert(updatingError === null || typeof updatingError === 'string')
  assert(id === null || typeof id === 'number')
  assert(typeof title === 'string')
  assert(typeof completed === 'boolean')

  return {
    updating,
    updatingError,
    id,
    title,
    completed
  }
}

function TodosState({
  loading,
  loadingError,
  tasks
}){
  assert(typeof loading === 'boolean')
  assert(loadingError === null || typeof loadingError === 'string')
  assert(tasks instanceof Array)
  tasks.forEach(TodosTask)

  return {
    loading,
    loadingError,
    tasks
  }
}

test('get a valid initial state', t => {
  const initialState = state()

  t.deepEqual(initialState, TodosState({
    loading: false,
    loadingError: null,
    tasks: []
  }))
})

test('startLoadingTasks mutation', t => {
  const state = {}
  mutations.startLoadingTasks(state)

  t.deepEqual(state, TodosState({
    loading: true,
    loadingError: null,
    tasks: []
  }))
})

test('setLoadingError mutation', t => {
  const aTask = {
    updating: true,
    updatingError: null,
    id: null,
    title: 't',
    completed: false
  }
  const state = {
    tasks: [TodosTask(aTask)]
  }
  mutations.setLoadingError(state, { error: 'error message' })

  t.deepEqual(state, TodosState({
    loading: false,
    loadingError: 'error message',
    tasks: [TodosTask(aTask)]
  }))
})