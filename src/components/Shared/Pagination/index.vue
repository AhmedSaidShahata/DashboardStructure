<template>
  <div class="text-center" v-if="config.last_page > 1">
    <v-pagination
      color="primary"
      @click="changePage"
      v-model="config.current_page"
      :length="Math.ceil(config.total / config.per_page)"
      rounded="circle"
     :total-visible="7"
    />
  </div>
</template>

<script setup>
const props = defineProps(["config"]);
const emit = defineEmits(["change"]);

const changePage = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  emit("change", props?.config?.current_page);
};
</script>
