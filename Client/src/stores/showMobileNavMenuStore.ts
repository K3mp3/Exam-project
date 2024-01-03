import { defineStore } from "pinia";
import { ref } from "vue";


export const useShowMobileNavMenu = defineStore('nav', () => {
    const showMenu = ref(false);

    function showNavMenu(menu: boolean) {
        console.log(menu);
        showMenu.value = menu;
    }

    return { showMenu, showNavMenu };
})