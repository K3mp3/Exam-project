import { defineStore } from "pinia";
import { ref } from "vue";

export const useShowRepairShopDialog = defineStore('repairShopRegisterDialog', () => {
    console.log()
    const isRepairShopDialog = ref(false);

    function showRepairShopRegisterDialogForm(show: boolean) {
        isRepairShopDialog.value = show;
    }

    return { isRepairShopDialog, showRepairShopRegisterDialogForm };
})