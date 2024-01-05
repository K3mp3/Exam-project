<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import SignInFormTablet from './SignInFormTablet.vue'
    import SignInFormMobile from './SignInFormMobile.vue';

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
    <SignInFormMobile v-if="isMobileForm"></SignInFormMobile>
    <SignInFormTablet v-if="isTabletForm"></SignInFormTablet>
</template>