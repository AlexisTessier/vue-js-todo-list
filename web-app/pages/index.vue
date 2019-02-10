<template>
  <div>
    <tool-bar :title="title" />
    <v-content>
      <v-container>
        <block-button :color="addButtonColor" :label="addTaskLabel" />
        <v-progress-circular
          v-if="loading"
          indeterminate
        />
        <v-alert :value="loadingError" type="error">
          {{ loadingError }}
        </v-alert>
        <tasks-list
          v-if="displayTasks"
          :tasks="tasks"
          :on-task-update="onTaskUpdate"
        />
      </v-container>
      <float-button :color="addButtonColor" icon="add" :tooltip="addTaskLabel" />
    </v-content>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from 'debounce'
import ToolBar from '~/components/ToolBar.vue'
import TasksList from '~/components/TasksList.vue'
import FloatButton from '~/components/FloatButton.vue'
import BlockButton from '~/components/BlockButton.vue'

const addButtonColor = 'blue'
const addTaskLabel = 'Add new task'

function apiOrigin(store) {
  return store.state.api.origin
}

export default {
  components: {
    ToolBar,
    TasksList,
    FloatButton,
    BlockButton
  },
  data() {
    return {
      addButtonColor,
      addTaskLabel,
      lastTaskUpdate: {
        taskId: null,
        updateKeys: ''
      },
      debouncedUpdateTask: null
    }
  },
  computed: {
    ...mapState({
      loading: state => state.todos.loading,
      loadingError: state => state.todos.loadingError,
      tasks: state => state.todos.tasks
    }),
    title() {
      return `Todos (${this.tasks.length})`
    },
    displayTasks() {
      return this.tasks.length > 0 && !this.loading && !this.loadingError
    }
  },
  methods: {
    immediateUpdateTask(store, taskId, update) {
      this.lastTaskUpdate = {
        taskId: null,
        updateKeys: ''
      }
      store.dispatch('todos/updateTask', {
        apiOrigin: apiOrigin(store),
        taskId,
        update
      })
    },
    onTaskUpdate(taskId, update) {
      if (this.debouncedUpdateTask === null) {
        this.debouncedUpdateTask = debounce(
          (immediateUpdateTask, store, taskId, update) => {
            immediateUpdateTask(store, taskId, update)
          },
          800
        )
      }

      const {
        taskId: lastTaskId,
        updateKeys: lastTaskUpdateKeys
      } = this.lastTaskUpdate

      const updateKeys = Object.keys(update)
        .sort()
        .join('/')

      this.lastTaskUpdate = {
        taskId,
        updateKeys
      }

      if (updateKeys === 'completed' && lastTaskId === null) {
        this.immediateUpdateTask(this.$store, taskId, update)
      } else {
        if (taskId !== lastTaskId || updateKeys !== lastTaskUpdateKeys) {
          this.debouncedUpdateTask.flush()
        }

        this.debouncedUpdateTask(
          this.immediateUpdateTask,
          this.$store,
          taskId,
          update
        )
      }
    }
  },
  async fetch({ store }) {
    await store.dispatch('todos/loadTasks', {
      apiOrigin: apiOrigin(store)
    })
  }
}
</script>
