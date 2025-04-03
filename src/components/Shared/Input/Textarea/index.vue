<template>
  <v-label
    v-if="label"
    class="my-1 d-inline-block font-size-14 font-weight-bold text-black"
  >
    {{ label }}
  </v-label>
  <v-textarea
    v-model="value"
    @keyup="errorsResult[name] = ''"
    variant="outlined"
    v-bind="$attrs"
    :prepend-icon="icon"
    color="primary"
    :error-messages="errorMessage ? errorMessage : errorsResult && errorsResult[name]"
  >
    <template v-slot:prepend-inner>
      <slot name="Prepend-inner-icon"></slot>
    </template>
  </v-textarea>
</template>
<script setup>
import { useErrorsStore } from "@/stores/errors";
import { useField } from "vee-validate";
import { watch } from "vue";
const props = defineProps(["form", "type", "name", "label", "validation", "icon"]);
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
