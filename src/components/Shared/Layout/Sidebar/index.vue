<template>
  <v-navigation-drawer class="bg-black" v-model="drawerResult" :location="location">
    <v-list>
      <v-list-item >
        <v-row>
          <v-col class="d-flex align-center">
            <Image name="logo-erp.svg" />
          </v-col>
        </v-row>
      </v-list-item>
      <v-list-group :value="parent.title" v-for="parent in asyncRoutes" :key="parent.to">
        <template
          v-if="!parent.meta.hidden && $hasPermission(parent.meta.permissions)"
          v-slot:activator="{ props }"
        >
          <v-list-item
            v-bind="props"
            @click="!parent.children ? $router.push(parent.meta.to) : ''"
          >
            <span class="mx-3 mt-n2">
              {{ $t(parent.title) }}
            </span>
          </v-list-item>
        </template>
        <v-list-group class="px-2" v-for="child in parent.children" :key="child.to">
          <template
            v-if="!child.meta.hidden && $hasPermission(child.meta.permissions)"
            v-slot:activator="{ props }"
          >
            <v-list-item
              :class="`${$route.path?.includes(child.meta.to) ? 'bg-primary' : ' '} ${
                !child.meta.showChildren ? 'remove-arrow' : ''
              }  `"
              v-bind="props"
              @click="!child.meta.showChildren ? $router.push(child.meta.to) : ''"
            >
            <v-row>
              <v-col class="d-flex align-center">
              <Image :name="child.meta.icon" />
              <span class="mx-3">
                {{ $t(child.title) }}
              </span>
              </v-col>
              </v-row>
            </v-list-item>
          </template>
          <v-list class="px-2" v-if="child.meta.showChildren">
            <div v-for="nestedChild in child.children" :key="nestedChild.to">
              <v-list-item v-if="nestedChild.meta?.show" :to="nestedChild.meta?.to">
                <Image :name="nestedChild.meta?.icon" />
                <span class="mx-1">
                  {{ nestedChild.title }}
                </span>
              </v-list-item>
            </div>
          </v-list>
        </v-list-group>
      </v-list-group>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <Button variant="text" @click="logout" icon="logout.svg">
          {{ $t("example.logout") }}
        </Button>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import vuetify from "../../../../plugins/vuetify";
import { useDrawerStore } from "../../../../stores/drawer";
import asyncRoutes from "../../../../router/asyncRoutes";

const drawer = ref(true);
const { drawerResult, toggleDrawer } = useDrawerStore();

const lang = ref("");
const currentLang = () => {
  lang.value = localStorage.getItem("lang");
};

const location = ref("left");
const drawerLocation = () => {
  localStorage.getItem("lang") == "ar"
    ? (location.value = "right")
    : (location.value = "left");
};

const handleDirection = () => {
  vuetify.rtl = lang.value === "ar";
};

const logout = () => {
  localStorage.removeItem("_token");
  window.location.href = "/login";
};

onMounted(async () => {
  currentLang();
  drawerLocation();
  handleDirection();
});
</script>
