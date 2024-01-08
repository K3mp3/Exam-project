import { defineStore } from "pinia";
import { ref } from "vue";

export const useShowRepairShopDialog = defineStore('repairShopRegisterDialog', () => {
    const isRepairShopDialog = ref(false);

    function showRepairShopRegisterDialogForm(show: boolean) {
        isRepairShopDialog.value = show;
    }

    return { isRepairShopDialog, showRepairShopRegisterDialogForm };
})