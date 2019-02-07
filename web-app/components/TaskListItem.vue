<template>
  <div :class="status" class="task">
    <v-list-tile-title
      class="item-title"
    >
      {{ title }}
    </v-list-tile-title>
    <v-progress-circular
      v-if="updating"
      indeterminate
      class="loader"
    />
    <div v-if="updatingError" class="error--text">
      {{ updatingError }}
    </div>
    <v-checkbox
      v-model="completedModel"
      :disabled="updating"
      :color="color"
      :label="status"
    >
      <span slot="label" :class="color+'--text status'">
        {{ status }}
      </span>
    </v-checkbox>
  </div>
</template>

<style>
.task {
  display: flex;
  width: 100%;
  align-items: center;
}

.done {
  opacity: 0.5;
}

.done > .item-title {
  text-decoration: line-through;
}

.status {
  width: 4em;
}

.loader,
.error--text {
  margin-right: 12px;
}

.error--text {
  font-size: 0.8em;
}
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    },
    updating: {
      type: Boolean,
      required: true
    },
    updatingError: {
      type: String,
      required: false,
      default: null
    },
    onTaskUpdate: {
      type: Function,
      required: true
    }
  },
  computed: {
    color() {
      return this.completed ? 'green' : 'blue'
    },
    status() {
      return this.completed ? 'done' : 'todo'
    },
    completedModel: {
      get() {
        return this.completed
      },
      set(value) {
        this.onTaskUpdate({
          completed: value
        })
      }
    }
  }
}
</script>
