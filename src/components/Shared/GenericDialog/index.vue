<template>
  <v-dialog
    class="generic-dialog"
    :persistent="persistent"
    :max-width="maxWidth"
    :value="props.dialog"
    @input="$emit('update:dialog')"
    @click:outside="$emit('close-dialog')"
  >
    <v-card class="py-8">
      <v-card-title v-if="title">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <p v-if="message">
          {{ message }}
        </p>
        <div>
          <slot />
          <Button class="position-absolute top-0 generic-dialog__close mx-2 mt-3" @click="$emit('close-dialog')">
            x
          </Button>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps([
  "dialog",
  "title",
  "message",
  "icon",
  "persistent",
  "maxWidth",
]);
</script>
