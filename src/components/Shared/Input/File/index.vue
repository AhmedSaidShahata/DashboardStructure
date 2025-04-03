<template>
  <v-label v-if="label" class="my-1 d-inline-block font-size-14 font-weight-bold">
    {{ label }}
  </v-label>
  <v-file-input
    :multiple="multiple"
    v-bind="$attrs"
    :error-messages="errorMessage"
    variant="outlined"
    v-model="value"
  />

  <v-row>
    <v-col cols="1" v-for="(image, index) in preview" :key="index">
      <img class="w-100 rounded-lg mb-3" height="60px" :src="image" />
    </v-col>
  </v-row>
</template>

<script setup>
import { useField } from "vee-validate";
import { ref, watch } from "vue";

const props = defineProps(["form", "name", "validation", "icon", "multiple"]);
const { value, errorMessage } = useField("file", props.validation);

const preview = ref([]);

watch(
  () => value.value,
  (newValue) => {
    if (newValue) {
      if (props.multiple) {
        for (let i = 0; i < newValue.length; i++) {
          let file = newValue[i];
          preview.value.push(URL.createObjectURL(file));
          props.form[props.name].push(file);
        }
      } else {
        let file = newValue;
        preview.value = [URL.createObjectURL(file)];
        props.form[props.name] = file;
      }
    }
  }
);
</script>
