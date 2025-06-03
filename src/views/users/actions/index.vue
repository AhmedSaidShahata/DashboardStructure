<template>
  <section class="mt-7">
    <v-card elevation="0" min-width="100%" class="rounded-xl px-16 py-16 mt-2">
      <Form @submit="submited" class="mt-4">
        <v-row>
          <v-col cols="12" md="6">
            <div class="mt-7">
              <v-file-input variant="outlined" v-model="form.image" />
              <img
                class="rounded-circle"
                v-if="preview"
                width="50px"
                height="50px"
                :src="preview"
                alt=""
              />
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <InputText
              validation="required"
              :form="form"
              name="name"
              :label="$t('name')"
              v-model="form.name"
              variant="outlined"
              :readonly="isReadOnly"
            />
          </v-col>
          <v-col cols="12" md="6">
            <InputText
              validation="required|email"
              :form="form"
              name="email"
              :label="$t('email')"
              v-model="form.email"
              variant="outlined"
              :readonly="isReadOnly"
            />
          </v-col>
          <v-col cols="12" md="6">
            <InputText
              validation="required"
              :form="form"
              name="mobile"
              :label="$t('mobile')"
              v-model="form.mobile"
              variant="outlined"
              :readonly="isReadOnly"
            />
          </v-col>
          <v-col cols="12" md="6">
            <InputText
              :form="form"
              name="address"
              :label="$t('address')"
              v-model="form.address"
              variant="outlined"
              :readonly="isReadOnly"
            />
          </v-col>
          <v-col cols="12" md="6">
            <InputPassword
              v-if="!isReadOnly"
              :validation="!$route?.params?.id ? 'required' : ''"
              :form="form"
              name="password"
              v-model="form.password"
              :label="$t('password')"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <!-- Hide button if in 'show' mode -->
        <Button
          v-if="!isReadOnly"
          type="submit"
          height="48"
          color="primary"
          class="mt-4"
          rounded="lg"
          variant="flat"
          block
          :loading="loading"
        >
          <span class="font-weight-bold">
            {{ $t("example.save") }}
          </span>
        </Button>
      </Form>
    </v-card>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useApi from "@/composables/useApi";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const { get, post, patch, loading } = useApi();

const form = ref({
  name: "",
  image: [],
  mobile: "",
  address: "",
  email: "",
  password: "",
  preview: "",
});

const isReadOnly = ref(false);

const preview = ref("");

const url = "users";

const handleShow = async (id) => {
  const response = await get(`/${url}/${id}`);
  if (response) {
    form.value = response.data;
    preview.value = response.data.image;
    form.value.image = null;
  }
};

const formData = () => {
  const formData = new FormData();
  formData.append("name", form.value.name);
  formData.append("mobile", form.value.mobile);
  formData.append("address", form.value.address);
  formData.append("email", form.value.email);

  if (form.value.image) {
    formData.append("image", form.value.image[0]);
  }
  if (form.value.password) {
    formData.append("password", form.value.password);
  }

  return formData;
};

const submited = async () => {
  let response;
  if (route.params.id) {
    response = await post(`/${url}/${route.params.id}`, formData());
  } else {
    response = await post(`/${url}`, formData());
  }
  if (response) {
    router.push(`/${url}`);
  }
};

onMounted(() => {
  if (route.params.id) {
    handleShow(route.params.id);
  }
  if (route.path.includes("/show")) {
    isReadOnly.value = true;
  }
});
</script>
