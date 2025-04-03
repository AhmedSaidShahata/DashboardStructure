<template>
  <section class="login" style="height: 102vh">
    <v-row class="h-100 flex-lg-row flex-column-reverse">
      <v-col
        cols="12"
        lg="6"
        class="bg-primary d-lg-flex justify-center height-screen align-center px-0 hidden-md-and-down"
      >
        <div class="text-center">
          <Image width="150px" name="login-avatar.svg" />
          <p class="font-size-22 font-weight-bold">{{ $t("welcome_back") }}</p>
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="d-flex justify-center height-screen align-center px-lg-0 px-5 bg-grey-lighten-4 py-16"
      >
        <v-card
          elevation="0"
          min-width="400px"
          class="rounded-xl px-lg-8 px-6 py-16 mt-2"
        >
          <h1 class="text-primary font-weight-bold">{{ $t("welcome_back") }}</h1>
          <p class="text-gray">{{ $t("login_description") }}</p>
          <Form @submit="submited" class="mt-4">
            <InputText
              validation="required|email"
              :form="form"
              name="email"
              :label="$t('email')"
              :placeholder="$t('email_placeholder')"
            />

            <InputPassword
              validation="required"
              :form="form"
              name="password"
              :label="$t('password')"
              :placeholder="$t('password_placeholder')"
            />

            <Button
              type="submit"
              height="48"
              color="primary"
              class="mt-4"
              rounded="lg"
              block
              :loading="loading"
            >
              <span class="font-weight-bold">
                {{ $t("sign_in") }}
              </span>
            </Button>
          </Form>
          <div class="d-flex justify-center mt-4">
            <p class="text-gray px-1">{{ $t("do_not_have_account") }}</p>
            <p class="text-primary font-weight-bold">{{ $t("sign_up") }}</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
<script setup>
import { ref } from "vue";
import useApi from "@/composables/useApi";
const { post, loading } = useApi();
const form = ref({
  email: "",
  password: "",
});
const submited = async () => {
  let response = await post("/signin", form.value);
  if (response) {
    localStorage.setItem("_token", response?.data?.access_token);
    window.location.href = "/dashboard";
  }
};
</script>
