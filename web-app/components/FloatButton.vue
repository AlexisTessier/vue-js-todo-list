<template>
  <div class="float-button">
    <v-tooltip left>
      <v-btn slot="activator" icon :color="color">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
      <span>{{ tooltip }}</span> 
    </v-tooltip>
  </div>
</template>

<style>
.float-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    tooltip: {
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
