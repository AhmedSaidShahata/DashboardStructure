<template>
  <v-select
    outlined
    v-model="locale"
    :items="items"
    item-title="name"
    item-value="value"
    @update:model-value="changeLocale"
  ></v-select>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useLocaleStore } from "@/stores/locale";
import { useLocaleCurrentAppStore } from "@/stores/localeCurrentApp";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { setLocaleApp } = useLocaleStore();
const { setLocaleCurrentApp } = useLocaleCurrentAppStore();

const locale = ref("en");
const emit = defineEmits(["changed"]);

const items = computed(() => [
  { name: t("languages.en"), value: "en" },
  { name: t("languages.ar"), value: "ar" },
]);

const changeLocale = (locale) => {
  setLocaleCurrentApp(locale);
  setLocaleApp(locale);
  emit("changed");
  nextTick(() => {
    setLocaleCurrentApp(localStorage.getItem("lang"));
  });
};

onBeforeUnmount(() => {
  let currentLocale = localStorage.getItem("lang");
  setLocaleApp(currentLocale);
});

onMounted(() => {
  locale.value = localStorage.getItem("lang") || "en";
  setLocaleApp(locale.value);
});
</script>
