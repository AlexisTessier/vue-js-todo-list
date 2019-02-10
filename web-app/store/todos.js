export function state() {
  return {
    loading: false,
    loadingError: null,
    newTask: null,
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
  startAddingTask(state, { task }) {
    state.loadingError = null
    state.loading = false
    state.newTask = task
  },
  startDeletingTask(state, { taskId }) {
    state.loadingError = null
    state.loading = false
    state.tasks = state.tasks.filter(task => task.id !== taskId)
  },
  addingTaskConfirmation(state, { task }) {
    state.tasks.unshift({
      ...task,
      autofocus: true,
      updating: false,
      updatingError: null
    })
    state.newTask = null
  },
  updateTask(state, { taskId, task }) {
    state.tasks.filter(t => t.id === taskId).forEach(t => {
      t.updating = false
      t.updatingError = null
      t.autofocus = false
      if ('title' in task) {
        t.title = task.title
      }
      if ('completed' in task) {
        t.completed = task.completed
      }
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
    state.tasks = []
  },
  setAddingError(state, { task, error }) {
    state.loading = false
    state.loadingError = error
    state.tasks = state.tasks.filter(t => !Object.is(t, task))
  }
}

export const actions = {
  async addTask({ commit }, { apiOrigin }) {
    const task = {
      id: undefined,
      title: '',
      completed: false,
      updating: true,
      updatingError: null
    }
    commit('startAddingTask', { task })

    try {
      const added = await this.$axios.$post(`${apiOrigin}/todos`, {
        title: task.title,
        completed: task.completed
      })

      commit('addingTaskConfirmation', { task: added })
    } catch (err) {
      commit('setAddingError', {
        task,
        error:
          'Something went wrong while adding a new task. Please try again :/'
      })
    }
  },
  async updateTask({ commit, state }, { apiOrigin, taskId, update }) {
    const targetedTask = state.tasks.find(task => task.id === taskId)
    const initialTaskState = {
      title: targetedTask.title,
      completed: targetedTask.completed
    }

    commit('startUpdatingTask', { taskId, expectedUpdate: update })

    try {
      const updated = await this.$axios.$patch(
        `${apiOrigin}/todos/${taskId}`,
        update
      )
      commit('updateTask', {
        taskId,
        task: updated
      })
    } catch (err) {
      commit('setUpdatingError', {
        taskId,
        error: 'Something went wrong while updating task. Please try again :/',
        initialTaskState
      })
    }
  },
  async deleteTask({ commit, state }, { apiOrigin, taskId }) {
    commit('startDeletingTask', { taskId })

    try {
      await this.$axios.$delete(`${apiOrigin}/todos/${taskId}`)
    } catch (err) {
      commit('setLoadingError', {
        error:
          'Something went wrong while deleting the task. Please refresh the page :/'
      })
    }
  },
  async loadTasks({ commit }, { apiOrigin, userId }) {
    commit('startLoadingTasks')

    try {
      const todos = await this.$axios.$get(`${apiOrigin}/todos`)
      commit('setTasks', { tasks: todos.filter(t => t.userId === userId) })
    } catch (err) {
      commit('setLoadingError', {
        error:
          'Something went wrong while loading todos tasks. Please refresh the page :/'
      })
    }
  }
}
