import { ref, nextTick } from "vue";
import useApi from "../../../composables/useApi";
import { useRouter } from "vue-router";
import { useLocaleStore } from "@/stores/locale";

const url = "topics";
const form = ref({
  name: "",
});
const renderForm = ref(true)
const isEdit = ref(false)
const id = ref('');
const { post, loading, get } = useApi();
const router = useRouter();

const formData = () => {
  const { localeValue } = useLocaleStore();
  const formData = new FormData();
  formData.append("name", form.value.name);
  if (isEdit.value) {
    formData.append("_method", "put");
    formData.append("locale", localeValue.value);
  }
  return formData;
};

const submited = async () => {
  let response;
  if (isEdit.value) {
    response = await post(`/${url}/${id.value}`, formData());
  } else {
    response = await post(`/${url}`, formData());
  }
  return response
};

const handleShow = async (route) => {
  isEdit.value = !!route?.params?.id;
  id.value = route?.params?.id;
  if( isEdit.value ){
    const response = await get(`/${url}/${id.value}`);
    const topic = response?.data?.topic;
    form.value = topic || {};
  }

};

const resetForm = () => {
  form.value =
  {
    name: "",
  }
  renderForm.value = false
  nextTick(() => {
    renderForm.value = true
  })
}

export { post, get, loading, router, submited, renderForm, form, isEdit, handleShow, formData, resetForm, url };
