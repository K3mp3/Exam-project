import { defineStore } from "pinia";
import { ref } from "vue";

export const useShowPopUp = defineStore('popup', () => {
    const showPopUp = ref(false);
    const popUpMessage = ref("");

    function showPopUpTab(show: boolean, message: string) {
        showPopUp.value = show;
        popUpMessage.value = message;
        console.log(showPopUp.value, popUpMessage.value)
    }

    return { showPopUp, popUpMessage, showPopUpTab };
})