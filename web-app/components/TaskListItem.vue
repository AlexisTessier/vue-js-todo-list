<template>
  <div :class="status" class="task">
    <span class="item-title">
      <v-form
        @submit.prevent="disableFocus()"
      >
        <v-text-field
          ref="titleInputRef"
          v-model="editedTitle"
          :counter="editedTitleCounter"
          :label="editedTitleLabel"
          :disabled="!editable"
          @blur.prevent="disableEditMode()"
          @focus.prevent="enableEditMode()"
        />
      </v-form>
    </span>
    <v-progress-circular
      v-if="updating"
      indeterminate
      class="loader"
    />
    <div v-if="updatingError" class="error--text">
      {{ updatingError }}
    </div>
    <div v-if="editable" class="actions">
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
      <v-tooltip
        left
        class="delete-btn"
      >
        <v-btn
          slot="activator"
          icon
          @click="$emit('delete-btn-click')"
        >
          <v-icon>delete</v-icon>
        </v-btn>
        <span>Delete the task</span>
      </v-tooltip>
    </div>
  </div>
</template>

<style>
.task {
  width: 100%;
}

.task,
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task > *,
.actions > * {
  display: inline-block !important;
  flex: none !important;
}

.item-title {
  width: 50%;
}

.item-title:hover {
  cursor: pointer;
}

.done {
  opacity: 0.5;
}

.done > .item-title {
  text-decoration: line-through;
}

.status {
  width: 2.5em;
}

.delete-btn {
  position: relative;
  top: -8px;
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
    editable: {
      type: Boolean,
      required: true
    },
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
    autofocus: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      editingTitle: false
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
        this.$emit('task-update', {
          completed: value
        })
      }
    },
    editedTitle: {
      get() {
        return this.title
      },
      set(value) {
        this.$emit('task-update', {
          title: value
        })
      }
    },
    editedTitleCounter() {
      return this.editingTitle ? 144 : undefined
    },
    editedTitleLabel() {
      return this.editingTitle ? 'Task title' : undefined
    }
  },
  watch: {
    autofocus(focus) {
      if (focus) {
        const input = this.$refs.titleInputRef.$el.querySelector('input')
        if (input && typeof input.focus === 'function') {
          input.focus()
        }
      }
    }
  },
  methods: {
    enableEditMode() {
      this.editingTitle = true
    },
    disableEditMode() {
      this.editingTitle = false
    },
    disableFocus() {
      const active = window.document.activeElement
      if (active && typeof active.blur === 'function') {
        active.blur()
      }
    }
  }
}
</script>
