import { ref } from "vue";
import axios from "@/plugins/axios";

export default () => {
    const errorsResponse = ref({});
    const loading = ref(false);

    const handleRequest = async (request) => {
        loading.value = true;
        errorsResponse.value = {};
        try {
            const result = await request();
            return result;
        } catch (error) {
            errorsResponse.value = error.response?.data?.errors;
        } finally {
            loading.value = false;
        }
    };

    const get = (url, params = null) => {
        return handleRequest(() => axios.get(url, { params }));
    };

    const post = (url, data) => {
        return handleRequest(() => axios.post(url, data));
    };

    const put = (url, data) => {
        return handleRequest(() => axios.put(url, data));
    };
    const patch = (url, data) => {
        return handleRequest(() => axios.patch(url, data));
    };

    const remove = (url, params = null) => {
        return handleRequest(() => axios.delete(url));
    };

    return { loading, errorsResponse, get, post, put, patch, remove };
};
