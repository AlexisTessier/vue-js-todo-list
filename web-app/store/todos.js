export function state() {
  return {
    loading: false,
    loadingError: null,
    tasks: []
  }
}

export const mutations = {
  startLoadingTasks(state) {
    state.tasks = []
    state.loadingError = null
    state.loading = true
  },
  startUpdatingTask(state, { taskId, expectedUpdate }) {
    state.tasks.filter(task => task.id === taskId).forEach(task => {
      task.updating = true
      task.updatingError = null
      if ('title' in expectedUpdate) {
        task.title = expectedUpdate.title
      }
      if ('completed' in expectedUpdate) {
        task.completed = expectedUpdate.completed
      }
    })
  },
  updateTask(state, { task }) {
    state.tasks.filter(t => t.id === task.id).forEach(t => {
      t.updating = false
      t.updatingError = null
      t.completed = task.completed
      t.title = task.title
    })
  },
  setUpdatingError(state, { taskId, error, initialTaskState }) {
    state.tasks.filter(task => task.id === taskId).forEach(task => {
      task.updating = false
      task.updatingError = error
      task.title = initialTaskState.title
      task.completed = initialTaskState.completed
    })
  },
  addTask(state, { task }) {
    state.tasks.push(task)
  },
  setTasks(state, { tasks }) {
    state.tasks = tasks.map(task => ({
      ...task,
      updating: false,
      updatingError: null
    }))
    state.loadingError = null
    state.loading = false
  },
  setLoadingError(state, { error }) {
    state.loading = false
    state.loadingError = error
  }
}

export const actions = {
  addTask({ commit }, { title }) {
    const task = {
      id: undefined,
      title,
      done: false,
      updating: true,
      updatingError: null
    }
    commit('addTask', { task })
  },
  async updateTask({ commit, state }, { apiOrigin, taskId, update }) {
    const targetedTask = state.tasks.find(task => task.id === taskId)
    const initialTaskState = {
      title: targetedTask.title,
      completed: targetedTask.completed
    }

    commit('startUpdatingTask', { taskId, expectedUpdate: update })

    try {
      const updated = await this.$axios.patch(
        `${apiOrigin}/todos/${taskId}`,
        update
      )
      commit('updateTask', {
        task: updated.data
      })
    } catch (err) {
      commit('setUpdatingError', {
        taskId,
        error: 'Something went wrong while updating task. Please try again :/',
        initialTaskState
      })
    }
  },
  async loadTasks({ commit }, { apiOrigin }) {
    commit('startLoadingTasks')

    try {
      const todos = await this.$axios.$get(`${apiOrigin}/todos`)
      commit('setTasks', { tasks: todos })
    } catch (err) {
      commit('setLoadingError', {
        error:
          'Something went wrong while loading todos tasks. Please refresh the page :/'
      })
    }
  }
}
