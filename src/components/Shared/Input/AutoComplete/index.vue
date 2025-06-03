<template>
  <v-label
    v-if="label"
    class="my-1 d-inline-block font-size-14 font-weight-bold text-black"
  >
    {{ label }}
    <span class="text-error" v-if="validation?.includes('required')"> * </span>
  </v-label>
  <v-autocomplete
    variant="outlined"
    :no-data-text="$t('no_items')"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    @click="errorsResult = []"
    :prepend-icon="icon"
    menu-icon="mdi-chevron-down"
    v-model="value"
    @keyup="errorsResult[name] = ''"
    v-bind="$attrs"
    color="primary"
    :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
  >
    <template v-slot:prepend-inner>
      <slot name="Prepend-inner-icon"></slot>
    </template>
  </v-autocomplete>
</template>
<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { watch } from "vue";
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
const { value, errorMessage, resetField } = useField(props.name, props.validation);

const { errorsResult } = useErrorsStore();

watch(
  () => value.value,
  (newValue) => {
    if (newValue) {
      props.form[props.name] = newValue;
    }
  }
);

watch(
  () => props.form[props.name],
  (newValue) => {
    if (newValue) {
      resetField({
        value: props.form[props.name],
      });
    }
  },
  { immediate: true }
);
</script>
