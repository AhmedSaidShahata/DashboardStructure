<template>
  <Form v-if="renderForm" @submit="submit" class="mt-4">
    <v-row>
      <v-col cols="12" md="12" v-if="isEdit">
        <LocaleSelector @changed="handleShow($route)" />
      </v-col>
      <v-col cols="12" md="12">
        <!-- {{ form.file }} -->
        <!-- <InputFile validation="required" :form="form" name="file" /> -->
        <InputText validation="required" :form="form" name="name" :label="$t('name')" />
      </v-col>
    </v-row>
    <div class="d-flex justify-end mt-4">
      <Button class="font-weight-bold" type="submit" :loading="loading">
        {{ $t("save") }}
      </Button>
    </div>
  </Form>
</template>

<script setup>
import { onMounted } from "vue";
import { form, submited, loading,renderForm, handleShow, url } from "./script.js";
import { useRouter, useRoute } from "vue-router";
import { useIsEdit } from "@/composables/useIsEdit";

const router = useRouter();
let route = useRoute();
const { isEdit } = useIsEdit();

const submit = async () => {
  let response = await submited();
  if (response) router.push(`/${url}`);
};

onMounted(() => {
  handleShow(route);
});
</script>
