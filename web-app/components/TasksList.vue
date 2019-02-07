<template>
  <v-list class="list">
    <template v-for="(item, index) in items">
      <v-divider
        v-if="item.divider"
        :key="index"
        class="divider"
      />

      <v-list-tile
        v-else
        :key="index"
        class="item"
      >
        <v-list-tile-content class="item-content">
          <task-list-item
            :title="item.title"
            :completed="item.completed"
            :updating="item.updating"
            :updating-error="item.updatingError"
            :on-task-update="item.onTaskUpdate"
          />
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<style>
.list {
  padding: 0;
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
      const items = []
      list.tasks.forEach((task, i) => {
        if (i > 0) {
          items.push({ divider: true })
        }
        items.push({
          ...task,
          onTaskUpdate(update) {
            list.onTaskUpdate(task.id, update)
          }
        })
      })
      return items
    }
  }
}
</script>
