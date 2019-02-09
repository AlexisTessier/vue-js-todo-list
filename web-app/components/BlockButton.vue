<template>
  <v-btn
    block
    :color="color"
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
    }
  }
}
</script>
