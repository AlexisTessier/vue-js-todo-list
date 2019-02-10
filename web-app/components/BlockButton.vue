<template>
  <v-btn
    block
    :color="color"
    :disabled="disabled"
    @click="$emit('btn-click')"
  >
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
