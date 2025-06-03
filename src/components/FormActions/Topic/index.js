import { ref, nextTick, onMounted, onUnmounted } from "vue";
import useApi from "../../../composables/useApi";
import { useRouter, useRoute } from "vue-router";
import { useLocaleStore } from "@/stores/locale";


export const scriptSetup = () => {

  const url = "topics";

  const form = ref({
    name: "",
    time: "",
    date: null,
    file: []
  });

  const items = ref([1, 2, 3])

  const renderForm = ref(true)
  const isEdit = ref(false)
  const id = ref('');
  const { post, loading, get } = useApi();
  const router = useRouter();
  let route = useRoute();
  isEdit.value = !!route?.params?.id;
  id.value = route?.params?.id;

  const formData = () => {
    const { localeValue } = useLocaleStore();
    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("date", form.value.date);
    formData.append("time", form.value.time);
    formData.append("file", form.value.file);
    if (isEdit.value) {
      formData.append("_method", "put");
      formData.append("locale", localeValue.value);
    }
    return formData;
  };


  const handleShow = async () => {
    const response = await get(`/${url}/${id.value}`);
    const topic = response?.data?.topic;
    form.value = topic || {};
  };


  const handleCreate = async () => {
    const response = await post(`/${url}`, formData());
    if (response) {
      router.push(`/${url}`);
    }
  };


  const handleUpdate = async () => {

  };

  const submit = async () => {
    if (id.value) {
      const response = await post(`/${url}/${id.value}`, formData());
      if (response) {
        router.push(`/${url}`);
      }
    } else {

      // const response = await post(`/${url}`, formData());
      // if (response) {
      //   router.push(`/${url}`);
      // }
    }

  };



  const resetForm = () => {
    form.value =
    {
      name: "",
      select: "",
      // time:null,
      // date: null,
      // file: []
    }
    renderForm.value = false
    nextTick(() => {
      renderForm.value = true
    })
  }

  onMounted(() => {
    if (isEdit.value) {
      handleShow();
    }
  });

  onUnmounted(() => {
    resetForm();
  })
  return { post, get, loading, router, id, handleCreate, submit, renderForm, form, isEdit, items, handleShow, formData, resetForm, url }

}

