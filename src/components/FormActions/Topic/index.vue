<template>
  <Form v-if="renderForm" @submit="submit" class="mt-4">
    <v-row>
      <v-col cols="12" md="12" v-if="isEdit">
        <LocaleSelector  name="locale" @changed="handleShow()" />
      </v-col>
      <v-col cols="12" md="12">
        <!-- <InputEditor :form="form" name="select" :label="$t('name')" />
        <InputAutoComplete
          :items="items"
          validation="required"
          :form="form"
          name="select"
          :label="$t('name')"
        /> -->
        <InputText validation="required" :form="form" name="name" :label="$t('name')" />
      </v-col>
    </v-row>
    <div class="d-flex justify-end mt-4">
      <Button class="font-weight-bold" type="submit" :loading="loading">
        {{ $t("example.save") }}
      </Button>
    </div>
  </Form>
</template>

<script setup>
import { scriptSetup } from "./index.js";
// import { useIsEdit } from "@/composables/useIsEdit";
// const { isEdit } = useIsEdit();
const {
  form,
  submit,
  loading,
  renderForm,
  handleShow,
  url,
  isEdit,
  items,
} = scriptSetup();



</script>
