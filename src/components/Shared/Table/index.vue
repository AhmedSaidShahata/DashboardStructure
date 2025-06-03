<template>
  <v-data-table
    :headers="
      headers.map((header) => ({
        ...header,
        title: $t(`${header.key}`),
        sortable: false,
      }))
    "
    :items="items.length ? items : data"
    :loading="loading"
    :loading-text="$t('example.loading')"
    :no-data-text="$t('example.no-data')"
    :items-per-page="-1"
    :show-footer="false"
    :hide-default-footer="true"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td v-for="header in headers" :key="header.key">
          <slot :name="`item.${header.key}`" :item="item">
            {{ item[header.value ? header.value : header.key] }}
          </slot>
        </td>
      </tr>
    </template>

    <template v-slot:bottom>
      <div class="text-center pt-2">
        <div class="text-center">
          <Pagination @change="loadItems" :config="config" />
        </div>
      </div>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import Pagination from "@/components/Shared/Pagination/index.vue";
import useApi from "@/composables/useApi";
const { get } = useApi();
const emitter = inject("emitter");
const props = defineProps({
  headers: Array,
  url: String,
  query: Object,
  data: Array,
});

const items = ref([]);
const loading = ref(true);
const config = reactive({});

const currentPage = ref(1);

const paginateConfig = (data) => {
  currentPage.value = config.current_page;
  if (currentPage.value > 1 && items?.value?.length == 1) {
    currentPage.value -= 1;
  }
  Object.assign(config, data);
};

const loadItems = async (page = 1) => {
 
  loading.value = true;
  try {
    const { data } = await get(`/${props.url}?page=${page}`, props.query);
    items.value = data.data;
    paginateConfig(data.meta);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadItems()
  emitter.off('reload-data');
  emitter.on("reload-data", () => {
    loadItems(currentPage.value);
  });
});
</script>
