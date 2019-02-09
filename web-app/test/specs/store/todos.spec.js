import { state, mutations, actions } from '../../../store/todos'

test('get a valid initial state', () => {
  const initialState = state()

  expect(initialState).toEqual({
    loading: false,
    loadingError: null,
    tasks: []
  })
})

test('startLoadingTasks mutation', () => {
  const state = {}
  mutations.startLoadingTasks(state)

  expect(state).toEqual({
    loading: true,
    loadingError: null,
    tasks: []
  })
})

test('setLoadingError mutation', () => {
  const aTask = {
    updating: true,
    updatingError: null,
    id: null,
    title: 't',
    completed: false
  }
  const state = {
    tasks: [{ ...aTask }]
  }
  mutations.setLoadingError(state, { error: 'error message' })

  expect(state).toEqual({
    loading: false,
    loadingError: 'error message',
    tasks: [{ ...aTask }]
  })
})

test('setTasks mutation', () => {
  const state = {}
  mutations.setTasks(state, {
    tasks: [
      {
        updating: true,
        updatingError: 'err',
        id: 42,
        title: '42 title',
        completed: true
      }
    ]
  })

  expect(state).toEqual({
    tasks: [
      {
        updating: false,
        updatingError: null,
        id: 42,
        title: '42 title',
        completed: true
      }
    ],
    loading: false,
    loadingError: null
  })
})

test('addTask mutation', () => {
  const tasks = []

  mutations.addTask({ tasks }, { task: 'a task' })

  expect(tasks).toEqual(['a task'])
})

test('startUpdatingTask mutation', () => {
  const tasks = [
    {
      id: 42,
      updating: false,
      updatingError: 'err',
      title: '42 title',
      completed: false
    },
    {
      id: 43,
      updating: false,
      updatingError: 'err 2',
      title: '43 title',
      completed: false
    },
    {
      id: 44,
      updating: false,
      updatingError: 'err 3',
      title: '44 title',
      completed: false
    }
  ]
  const state = { tasks }

  mutations.startUpdatingTask(state, {
    taskId: 43,
    expectedUpdate: {
      title: 'new title',
      completed: true
    }
  })

  expect(state).toEqual({
    tasks: [
      {
        id: 42,
        updating: false,
        updatingError: 'err',
        title: '42 title',
        completed: false
      },
      {
        id: 43,
        updating: true,
        updatingError: null,
        title: 'new title',
        completed: true
      },
      {
        id: 44,
        updating: false,
        updatingError: 'err 3',
        title: '44 title',
        completed: false
      }
    ]
  })

  mutations.startUpdatingTask(state, {
    taskId: 42,
    expectedUpdate: {
      title: 'new title 2'
    }
  })

  expect(state).toEqual({
    tasks: [
      {
        id: 42,
        updating: true,
        updatingError: null,
        title: 'new title 2',
        completed: false
      },
      {
        id: 43,
        updating: true,
        updatingError: null,
        title: 'new title',
        completed: true
      },
      {
        id: 44,
        updating: false,
        updatingError: 'err 3',
        title: '44 title',
        completed: false
      }
    ]
  })

  mutations.startUpdatingTask(state, {
    taskId: 44,
    expectedUpdate: {
      completed: true
    }
  })

  expect(state).toEqual({
    tasks: [
      {
        id: 42,
        updating: true,
        updatingError: null,
        title: 'new title 2',
        completed: false
      },
      {
        id: 43,
        updating: true,
        updatingError: null,
        title: 'new title',
        completed: true
      },
      {
        id: 44,
        updating: true,
        updatingError: null,
        title: '44 title',
        completed: true
      }
    ]
  })
})

test('updateTask mutation', () => {
  const tasks = [
    {
      id: 42,
      updating: true,
      updatingError: 'err',
      title: '42 title',
      completed: false
    },
    {
      id: 43,
      updating: true,
      updatingError: 'err 2',
      title: '43 title',
      completed: false
    },
    {
      id: 44,
      updating: true,
      updatingError: 'err 3',
      title: '44 title',
      completed: false
    }
  ]

  const state = { tasks }

  mutations.updateTask(state, {
    task: {
      id: 43,
      title: 'new title',
      completed: true
    }
  })

  expect(state).toEqual({
    tasks: [
      {
        id: 42,
        updating: true,
        updatingError: 'err',
        title: '42 title',
        completed: false
      },
      {
        id: 43,
        updating: false,
        updatingError: null,
        title: 'new title',
        completed: true
      },
      {
        id: 44,
        updating: true,
        updatingError: 'err 3',
        title: '44 title',
        completed: false
      }
    ]
  })
})

test('setUpdatingError mutation', () => {
  const tasks = [
    {
      id: 42,
      updating: true,
      updatingError: null,
      title: '42 title',
      completed: false
    },
    {
      id: 43,
      updating: true,
      updatingError: null,
      title: '43 title',
      completed: false
    },
    {
      id: 44,
      updating: true,
      updatingError: null,
      title: '44 title',
      completed: false
    }
  ]

  const state = { tasks }

  mutations.setUpdatingError(state, {
    taskId: 43,
    error: 'err msg',
    initialTaskState: {
      title: 'original title',
      completed: true
    }
  })

  expect(state).toEqual({
    tasks: [
      {
        id: 42,
        updating: true,
        updatingError: null,
        title: '42 title',
        completed: false
      },
      {
        id: 43,
        updating: false,
        updatingError: 'err msg',
        title: 'original title',
        completed: true
      },
      {
        id: 44,
        updating: true,
        updatingError: null,
        title: '44 title',
        completed: false
      }
    ]
  })
})

describe('loadTasks action', () => {
  test('successful load', () => {
    const store = { commit() {} }
    const context = {
      $axios: {
        $get() {
          return Promise.resolve(['todo 1', 'todo 2'])
        }
      }
    }
    jest.spyOn(store, 'commit')
    jest.spyOn(context.$axios, '$get')

    const loadTasksPromise = actions.loadTasks.bind(context)(store, {
      apiOrigin: 'origin'
    })
    expect(store.commit).toHaveBeenCalledTimes(1)
    expect(store.commit).toHaveBeenCalledWith('startLoadingTasks')
    expect(context.$axios.$get).toHaveBeenCalledTimes(1)
    expect(context.$axios.$get).toHaveBeenCalledWith('origin/todos')

    return loadTasksPromise.then(() => {
      expect(store.commit).toHaveBeenCalledTimes(2)
      expect(store.commit).toHaveBeenCalledWith('setTasks', {
        tasks: ['todo 1', 'todo 2']
      })
      expect(context.$axios.$get).toHaveBeenCalledTimes(1)
    })
  })

  test('error while loading', () => {
    const store = { commit() {} }
    const context = {
      $axios: {
        $get() {
          return Promise.reject(new Error('some http error'))
        }
      }
    }
    jest.spyOn(store, 'commit')
    jest.spyOn(context.$axios, '$get')

    const loadTasksPromise = actions.loadTasks.bind(context)(store, {
      apiOrigin: 'origin2'
    })
    expect(store.commit).toHaveBeenCalledTimes(1)
    expect(store.commit).toHaveBeenCalledWith('startLoadingTasks')
    expect(context.$axios.$get).toHaveBeenCalledTimes(1)
    expect(context.$axios.$get).toHaveBeenCalledWith('origin2/todos')

    return loadTasksPromise.then(() => {
      expect(store.commit).toHaveBeenCalledTimes(2)
      expect(store.commit).toHaveBeenCalledWith('setLoadingError', {
        error:
          'Something went wrong while loading todos tasks. Please refresh the page :/'
      })
      expect(context.$axios.$get).toHaveBeenCalledTimes(1)
    })
  })
})

describe('updateTask action', () => {
  test('successful update', () => {
    const store = {
      commit() {},
      state: {
        tasks: [
          {
            id: 42,
            title: 'title',
            completed: false
          },
          {
            id: 43,
            title: 'title 2',
            completed: true
          }
        ]
      }
    }
    const context = {
      $axios: {
        $patch() {
          return Promise.resolve({ taskKey: 'task value' })
        }
      }
    }
    jest.spyOn(store, 'commit')
    jest.spyOn(context.$axios, '$patch')

    const updateTaskPromise = actions.updateTask.bind(context)(store, {
      apiOrigin: 'origin',
      taskId: 43,
      update: {
        updateKey: 'update value'
      }
    })
    expect(store.commit).toHaveBeenCalledTimes(1)
    expect(store.commit).toHaveBeenCalledWith('startUpdatingTask', {
      taskId: 43,
      expectedUpdate: {
        updateKey: 'update value'
      }
    })
    expect(context.$axios.$patch).toHaveBeenCalledTimes(1)
    expect(context.$axios.$patch).toHaveBeenCalledWith('origin/todos/43', {
      updateKey: 'update value'
    })

    return updateTaskPromise.then(() => {
      expect(store.commit).toHaveBeenCalledTimes(2)
      expect(store.commit).toHaveBeenCalledWith('updateTask', {
        task: { taskKey: 'task value' }
      })
      expect(context.$axios.$patch).toHaveBeenCalledTimes(1)
    })
  })

  test('error while updating', () => {
    const store = {
      commit() {},
      state: {
        tasks: [
          {
            id: 42,
            title: 'title',
            completed: false
          },
          {
            id: 43,
            title: 'title 2',
            completed: true
          }
        ]
      }
    }
    const context = {
      $axios: {
        $patch() {
          return Promise.reject(new Error('some http error'))
        }
      }
    }
    jest.spyOn(store, 'commit')
    jest.spyOn(context.$axios, '$patch')

    const updateTaskPromise = actions.updateTask.bind(context)(store, {
      apiOrigin: 'origin2',
      taskId: 42,
      update: {
        updateKey2: 'update value 2'
      }
    })
    expect(store.commit).toHaveBeenCalledTimes(1)
    expect(store.commit).toHaveBeenCalledWith('startUpdatingTask', {
      taskId: 42,
      expectedUpdate: {
        updateKey2: 'update value 2'
      }
    })
    expect(context.$axios.$patch).toHaveBeenCalledTimes(1)
    expect(context.$axios.$patch).toHaveBeenCalledWith('origin2/todos/42', {
      updateKey2: 'update value 2'
    })

    return updateTaskPromise.then(() => {
      expect(store.commit).toHaveBeenCalledTimes(2)
      expect(store.commit).toHaveBeenCalledWith('setUpdatingError', {
        taskId: 42,
        error: 'Something went wrong while updating task. Please try again :/',
        initialTaskState: {
          title: 'title',
          completed: false
        }
      })
      expect(context.$axios.$patch).toHaveBeenCalledTimes(1)
    })
  })
})
