import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useApi from "@/composables/useApi";
const { get } = useApi();
export const useAuthStore = defineStore('auth', () => {

  const user = ref(null)

  async function logout() {
    localStorage.removeItem("_token")
    user.value = null;
  }

  async function getUser() {
    try {
      const data = await get("/profile");
      user.value = data.data;
    } catch (error) {
      console.log(error)
    }
  }

  return { user,  getUser, logout }
})
