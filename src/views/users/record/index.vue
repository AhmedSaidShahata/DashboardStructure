<template>
  <section class="mt-7">
    <div class="d-flex justify-space-between align-center flex-wrap">
      <div>
        <h2>
          {{ $t("users") }}
          <span>
            <Image class="flip" name="arrow-heading.svg" />
          </span>
          {{ $t("all") }} {{ $t("users") }}
        </h2>
      </div>
      <div class="mb-4 mb-0 mt-lg-12">
        <Button color="primary" :to="`/${url}/create`">
          <Image name="plus.svg" class="mx-1" /> {{ $t("new") }}
        </Button>
      </div>
    </div>
    <Table :data="items" :headers="headers" :url="url">
      <template v-slot:item.image="{ item }">
      <img class="rounded-circle" v-if="item.image" width="40px" height="40px" :src="item.image" />
      </template>
      <template v-slot:item.controls="{ item }">
        <TableMenu :url="url" :id="item.id" />
      </template>
    </Table>
  </section>
</template>

<script setup>
import { computed } from "vue";
const url = computed(() => "users");
const headers = computed(() => [
  { key: "image" },
  { key: "name" },
  { key: "mobile" },
  { key: "email" },
  { key: "controls" },
]);
</script>
