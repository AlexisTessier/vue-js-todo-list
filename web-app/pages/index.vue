<template>
  <div>
    <tool-bar
      title="Todos"
    />
    <v-content>
      <v-container>
        <v-btn
          block
          light
        >
          Add new todo
        </v-btn>
        <v-progress-circular
          v-if="loading"
          indeterminate
        />
        <v-list v-else>
          <template v-for="(task, index) in tasks">
            <div :key="index">
              hello world {{ task.description }} {{ index }}
            </div>
          </template>
        </v-list>
      </v-container>

      <v-tooltip left>
        <v-btn slot="activator" icon>
          <v-icon>add</v-icon>
        </v-btn>
        <span>Add new todo</span>
      </v-tooltip>
    </v-content>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ToolBar from '~/components/ToolBar.vue'

export default {
  components: {
    ToolBar
  },
  computed: {
    ...mapState({
      loading: state => state.todos.loading,
      tasks: state => state.todos.tasks
    })
  },
  fetch({ store }) {
    store.dispatch('todos/loadTasks')
  }
}
</script>
