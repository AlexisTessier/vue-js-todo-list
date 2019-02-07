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
  startUpdatingTask(state, taskId) {
    state.tasks.filter(task => task.id === taskId).forEach(task => {
      task.updating = true
    })
  },
  addTask(state, task) {
    state.tasks.push(task)
  },
  setTasks(state, tasks) {
    state.tasks = tasks.map(task => ({
      ...task,
      updating: false
    }))
    state.loadingError = null
    state.loading = false
  },
  setLoadingError(state, error) {
    state.loading = false
    state.loadingError = error
  }
}

export const actions = {
  addTask({ commit }, { description }) {
    const task = {
      id: undefined,
      description,
      done: false
    }
    commit('addTask', task)
  },
  updateTask({ commit }, { apiOrigin, taskId, update }) {
    commit('startUpdatingTask', taskId)
  },
  async loadTasks({ commit }, { apiOrigin }) {
    commit('startLoadingTasks')

    try {
      const todos = await this.$axios.$get(`${apiOrigin}/todos`)
      commit('setTasks', todos)
    } catch (err) {
      commit(
        'setLoadingError',
        'Something went wrong while loading todos tasks. Please refresh the page :/'
      )
    }
  }
}
