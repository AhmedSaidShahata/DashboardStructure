<template>
  <section class="mt-7">
    <div class="d-flex justify-space-between align-center flex-wrap">
      <h2>{{ $t(url) }}</h2>
    </div>
    <Table  :headers="headers" :url="url">
      <template v-slot:item.controls="{ item }">
        <Destroy  v-if="$hasPermission('contact-messages_delete')" :url="url" :id="item.id" />
      </template>
    </Table>
  </section>
</template>
<script setup>
import { computed } from "vue";
const url = computed(() => "contact-messages");
const headers = computed(() => [{ key: "name" }, { key: "controls" }]);
</script>
