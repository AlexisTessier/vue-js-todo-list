<template>
  <v-list class="list">
    <template v-for="item in items">
      <div :key="item.id">
        <v-divider class="divider" />
        <v-list-tile class="item">
          <v-list-tile-content class="item-content">
            <task-list-item
              :title="item.task.title"
              :editable="item.editable"
              :completed="item.task.completed"
              :updating="item.task.updating"
              :autofocus="item.task.autofocus"
              :updating-error="item.task.updatingError"
              @task-update="taskUpdate(item.task.id, $event)"
              @delete-btn-click="taskDelete(item.task.id)"
            />
          </v-list-tile-content>
        </v-list-tile>
      </div>
    </template>
  </v-list>
</template>

<style>
.list {
  padding: 0 !important;
}

.divider {
  margin-top: 0;
  margin-bottom: 0;
}

.item {
  padding: 12px 0;
}

.item-content {
  overflow: visible;
}
</style>

<script>
import TaskListItem from '~/components/TaskListItem.vue'

export default {
  components: {
    TaskListItem
  },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  computed: {
    items() {
      const list = this
      return list.tasks.map((task, i) => ({
        divider: i > 0,
        task,
        editable: typeof task.id === 'number'
      }))
    }
  },
  methods: {
    taskUpdate(taskId, update) {
      this.$emit('task-update', { taskId, update })
    },
    taskDelete(taskId) {
      this.$emit('task-delete', { taskId })
    }
  }
}
</script>
