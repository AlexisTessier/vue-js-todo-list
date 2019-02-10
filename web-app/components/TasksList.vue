<template>
  <v-list class="list">
    <template v-for="(item, index) in items">
      <div :key="index">
        <v-divider class="divider" />
        <v-list-tile class="item">
          <v-list-tile-content class="item-content">
            <task-list-item
              :title="item.content.title"
              :completed="item.content.completed"
              :updating="item.content.updating"
              :updating-error="item.content.updatingError"
              :on-task-update="item.onTaskUpdate"
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
    },
    onTaskUpdate: {
      type: Function,
      required: true
    }
  },
  computed: {
    items() {
      const list = this
      return list.tasks.map((task, i) => ({
        divider: i > 0,
        onTaskUpdate(update) {
          list.onTaskUpdate(task.id, update)
        },
        content: task
      }))
    }
  }
}
</script>
