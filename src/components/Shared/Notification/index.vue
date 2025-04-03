<template>
  <v-snackbar
    location="top"
    v-model="notify.visible"
    :timeout="notify.timeout"
    :color="notify.color"
  >
    <span class="snack">
      {{ notify.text }}
    </span>
    <template v-slot:actions>
      <v-btn @click="notify.visible = false"> X </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useNotificationStore } from "@/stores/notification";
const { notify } = useNotificationStore();
</script>
