<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import RegisterRepairShopMobile from './RegisterRepairShopMobile.vue';
    import RegisterRepairShopTablet from './RegisterRepairShopTablet.vue';

    const isMobileForm = ref(false);
    const isTabletForm = ref(false)

    let width = document.documentElement.clientWidth;

    function updateScreenSize() {
        window.addEventListener("resize", updateScreenSize);
        width = document.documentElement.clientWidth;

        if (width < 700) {
            isMobileForm.value = true;
            isTabletForm.value = false
        } else {
            isMobileForm.value = false;
            isTabletForm.value = true
        }
    }    

    onMounted(() => {
        updateScreenSize();
    })
</script>

<template>
    <RegisterRepairShopMobile v-if="isMobileForm"></RegisterRepairShopMobile>
    <RegisterRepairShopTablet v-if="isTabletForm"></RegisterRepairShopTablet>
</template>