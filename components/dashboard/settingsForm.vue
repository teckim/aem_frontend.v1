<template>
  <v-form ref="form" @submit.prevent>
    <div>
      <v-row dense>
        <v-col cols="12" sm="8" md="6">
          <v-text-field
            v-model.trim="task"
            name="task"
            label="task"
            color="main"
            validate-on-blur
            hide-details
            required
            @keyup.enter.native.stop="pushTask(task)"
          >
            <template #append>
              <v-icon v-show="!!task" color="success" @click="pushTask(task)">
                mdi-plus-circle
              </v-icon>
            </template>
          </v-text-field>
          <!-- <v-btn icon color="error" @click="tasks.push(task)">
            <v-icon>mdi-check-circle</v-icon>
          </v-btn> -->
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="8" md="6">
          <v-chip
            v-for="(task, i) in office.tasks"
            :key="i"
            close
            class="mr-2 mb-2"
            @click:close="office.tasks.splice(i, 1)"
          >
            <strong>{{ task }}</strong> &nbsp;
          </v-chip>
          <!-- <v-card :key="i" outlined max-width="auto">
              <span>{{ task }}</span>
              <v-btn x-small icon color="error" @click="tasks.splice(i, 1)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-switch v-model="office.vacant" label="vacant" />
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    office: {
      tasks: [],
      vacant: null
    },
    task: null
  }),
  watch: {
    data (v) {
      if (v) {
        this.office.tasks = v.tasks || []
        this.office.vacant = v.vacant
      }
    }
  },
  methods: {
    pushTask (task) {
      if (this.task) {
        this.office.tasks.push(task)
        this.task = null
      }
    }
  }
}
</script>

<style scoped>
.form {
  max-width: 650px;
}
</style>
