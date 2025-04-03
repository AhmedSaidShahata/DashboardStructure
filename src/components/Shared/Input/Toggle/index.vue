<template>
  <v-switch color="primary" :loading="loading" @update:modelValue="updateVisibility" />
</template>

<script setup>
import useApi from "@/composables/useApi";
const { put, loading, errorsResponse } = useApi();

const props = defineProps(["url", "name", "id"]);

const updateVisibility = async (value) => {
  let response = await put(`/${props.url}/${props.id}`, {
    [props.name]: value,
    locale: localStorage.getItem("lang"),
  });
};
</script>
