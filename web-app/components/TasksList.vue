<template>
  <v-list v-else>
    <template v-for="(task, index) in tasks">
      <div :key="index">
        hello world {{ task.title }} {{ index }}
      </div>
    </template>
  </v-list>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  }
}
</script>
