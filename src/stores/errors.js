import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useErrorsStore = defineStore('errors', () => {
    const errors = ref([])

    const errorsResult = computed(() => errors)

    const setErrors = (item) => {
        errors.value = item
    }

    return { setErrors, errorsResult }
})



