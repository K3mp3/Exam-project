import { defineStore } from "pinia";
import { ref } from "vue";

export const useShowRegisterDialog = defineStore('registerDialog', () => {
    const isRegisterDialog = ref(false);

    function showRegisterDialogForm(show: boolean) {
        isRegisterDialog.value = show;
    }

    return { isRegisterDialog, showRegisterDialogForm };
})