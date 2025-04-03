<template>
  <section class="mt-7">
    <div class="d-flex justify-space-between align-center flex-wrap">
      <h2>{{ $t(url) }}</h2>
      <div>
        <Button
          v-if="$hasPermission('topics_create')"
          color="primary"
          :to="`/${url}/create`"
        >
          <Image name="plus.svg" class="mx-1" /> {{ $t("new") }}
        </Button>
      </div>
    </div>
    <Table :data="items" :headers="headers" :url="url">
      <template v-slot:item.is_visible="{ item }">
        <InputToggle
          v-model="item.is_visible"
          :url="url"
          :id="item.id"
          name="is_visible"
        />
      </template>
      <template v-slot:item.controls="{ item }">
        <Destroy v-if="$hasPermission('topics_delete')" :url="url" :id="item.id" />
        <Button
          v-if="$hasPermission('topics_edit')"
          icon="edit.svg"
          :to="`/${url}/${item.id}/edit`"
        >
          {{ $t("edit") }}
        </Button>
      </template>
    </Table>
  </section>
</template>

<script setup>
import { computed } from "vue";
const url = computed(() => "topics");
const headers = computed(() => [
  { key: "name" },
  { key: "is_visible" },
  { key: "controls" },
]);
</script>
