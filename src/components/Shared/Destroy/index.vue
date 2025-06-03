<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <Button  class="mx-2" color="error" v-bind="activatorProps" variant="flat">
        <Image name="delete-gray.svg" />
        {{ $t("example.delete") }}
      </Button>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text class="text-center">
          <div>
            <Image width="50px" name="delete.svg" />
          </div>
          {{ $t("example.sure_delete") }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="d-flex justify-center w-100">
            <Button class="mx-1" color="grey" @click="isActive.value = false">
              {{ $t("example.cancel") }}
            </Button>
            <Button :loading="loading" color="error" @click="deleteItem">{{
              $t("example.ok")
            }}</Button>
          </div>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import useApi from "@/composables/useApi";
import { inject } from "vue";
const emitter = inject("emitter");
const { remove, loading } = useApi();
const props = defineProps({
  url: String,
  id: [String, Number],
});

const emit = defineEmits(["destroyItem"]);

const deleteItem = async () => {
  await remove(`/${props.url}/${props.id}`);
  emitter.emit("reload-data");
};
</script>
