<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      variant="text"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <div class="d-flex align-center">
      <Button class="hidden-md-and-down mx-4" color="primary" @click="changeLang">
        <span v-if="lang === 'ar'">الأجنبية</span>
        <span v-else>Arabic</span>
      </Button>
    </div>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from "vue";
import vuetify from "../../../../plugins/vuetify";
import { useDrawerStore } from "../../../../stores/drawer";
import { useAuthStore } from "../../../../stores/auth";
if (localStorage.getItem("_token")) {
  await useAuthStore().getUser();
}

const authStore = useAuthStore();
const { drawerResult, toggleDrawer } = useDrawerStore();
const lang = ref("");
const currentLang = () => {
  lang.value = localStorage.getItem("lang");
};
const form = ref({
  search: "",
});

const changeLang = () => {
  lang.value = lang.value === "ar" ? "en" : "ar";
  localStorage.setItem("lang", lang.value);
  window.location.reload();
};

const handleDirection = () => {
  vuetify.rtl = lang.value === "ar";
};

onMounted(async () => {
  currentLang();
  handleDirection();
});
</script>
