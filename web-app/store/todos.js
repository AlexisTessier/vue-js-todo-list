export function state() {
  return {
    loading: false,
    tasks: []
  }
}

export const mutations = {
  startLoadingTasks(state) {
    state.tasks = []
    state.loading = true
  },
  addTask(state, task) {
    state.tasks.push(task)
  },
  setTasks(state, tasks) {
    state.tasks = tasks
    state.loading = false
  }
}

export const actions = {
  addTask({ commit }, description) {
    const task = {
      id: undefined,
      description,
      done: false
    }
    commit('addTask', task)
  },
  loadTasks({ commit }) {
    commit('startLoadingTasks')
  }
}
