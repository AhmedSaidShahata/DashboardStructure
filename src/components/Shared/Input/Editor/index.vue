<template>
  <div>
    <v-label v-if="label" class="my-1 d-inline-block font-size-14 font-weight-bold">
      {{ label }}
    </v-label>
    <vue-editor dir="rtl" ref="editor" :editorToolbar="customToolbar" id="editor">
    </vue-editor>
  </div>
</template>
<script>
import { VueEditor } from "vue3-editor";

export default {
  name: "Editor",
  components: {
    VueEditor,
  },
  props: {
    hint: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    limit: {
      type: Number,
      default: 0,
    },
    form: {
      type: Object,
      default: () => {},
    },
    fieldName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline", "strike", "link"],
        [{ align: "" }, { align: "justify" }, { align: "right" }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        ["image"], 
        [{ direction: "rtl" }],
      ],
    };
  },
};
</script>
