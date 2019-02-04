<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Todos</v-toolbar-title>      
    </v-toolbar>
    <v-content>
      <v-container>
        <v-progress-circular
          indeterminate
        />
        <v-btn block light>Add new todo</v-btn>
        <v-expansion-panel>
          <v-expansion-panel-content>
            <div slot="header">
              hello
            </div>
            hello world
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">
              hello
            </div>
            hello world
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">
              hello
            </div>
            hello world
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-container>

      <v-tooltip left>
        <v-btn slot="activator" icon>
          <v-icon>add</v-icon>
        </v-btn>
        <span>Add new todo</span>
      </v-tooltip>
    </v-content>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  }
}
</script>
