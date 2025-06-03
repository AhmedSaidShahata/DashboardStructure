<template>
  <section class="mt-7">
    <v-row class="align-center">
      <v-col cols="12" md="6">
        <DateField validation="required" :form="query" name="date" v-model="query.date"  />
        <InputText :form="query" name="name" :label="$t('name')" v-model="query.name" />
      </v-col>
      <v-col cols="12" md="6">
        <Button color="primary" @click="search"> search </Button>
        <Button class="mx-2" color="error" @click="reset"> reset </Button>
      </v-col>
    </v-row>
    <div class="d-flex justify-space-between align-center flex-wrap">
      <h2>{{ $t(url) }}</h2>
    </div>
    <Table :query="query" :data="items" :headers="headers" :url="url">
      <template v-slot:item.controls="{ item }">
        <Destroy :url="url" :id="item.id" />
      </template>
    </Table>
  </section>
</template>

<script setup>
import { computed, ref, nextTick,inject } from "vue";
const url = computed(() => "contact-messages");
const headers = computed(() => [{ key: "name" }, { key: "controls" }]);
const emitter = inject("emitter");
const query = ref({
  name: "",
  date: null,
});

const search = () => {
  emitter.emit("reload-data");
};

const reset = () => {
  query.value = { name: "", date: null };
  nextTick(() => {
    emitter.emit("reload-data");
  });
};
</script>
