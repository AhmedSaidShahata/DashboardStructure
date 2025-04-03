<template>
  <Field :value="form[name]" :name="name" :rules="validation" v-slot="{ field, errors }">
    <label v-if="label" class="my-1 d-inline-block font-size-14 font-weight-bold">
      {{ label }}
      <span class="text-error" v-if="validation?.includes('required')"> * </span>
    </label>
    <v-select
      variant="outlined"
      :no-data-text="$t('no_items')"
      :items="items"
      :item-title="itemTitle"
      :item-value="itemValue"
      @click="errorsResult = []"
      v-bind="{ ...field, ...$attrs }"
      :prepend-icon="icon"
      menu-icon="mdi-chevron-down"
      :error-messages="errors.length ? errors : errorsResult && errorsResult[field.name]"
    ></v-select>
  </Field>
</template>

<script setup>
import { useErrorsStore } from "@/stores/errors";
const { errorsResult } = useErrorsStore();
const props = defineProps([
  "form",
  "name",
  "label",
  "multiple",
  "validation",
  "icon",
  "itemTitle",
  "itemValue",
  "items",
]);
</script>
