<template>
  <v-list>
    <template v-for="(item, index) in items">
      <v-divider
        v-if="item.divider"
        :key="index"
        class="divider"
      />

      <v-list-tile
        v-else
        :key="index"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title
            :color="item.color"
          >
            {{ item.status }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<style>
.divider {
  margin-top: 12px;
  margin-bottom: 12px;
}
</style>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  computed: {
    items() {
      const items = []
      this.tasks.forEach((task, i) => {
        if (i > 0) {
          items.push({ divider: true })
        }
        items.push({
          ...task,
          color: task.complete ? 'green' : 'orange',
          status: task.complete ? 'DONE' : 'TODO'
        })
      })
      return items
    }
  }
}
</script>
